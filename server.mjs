import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {existsSync,createReadStream} from 'node:fs';
import {join,extname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {timingSafeEqual} from 'node:crypto';
import {estates} from './lib/estates.mjs';
import {home,detail,privacy,why,partner} from './lib/pages.mjs';
import {validateLead,saveLead} from './lib/leads.mjs';
import {validatePartner,savePartner} from './lib/partners.mjs';
import {sheetsConfigured,appendLeadToSheet,appendPartnerToSheet} from './lib/sheets.mjs';
const root=fileURLToPath(new URL('.',import.meta.url)),pub=join(root,'public');
const port=Number(process.env.PORT||3000),origin=(process.env.SITE_URL||`http://localhost:${port}`).replace(/\/$/,'');
const dataDir=resolve(process.env.DATA_DIR||(process.env.VERCEL?join('/tmp','central-luzon-data'):join(root,'data')));
const types={'.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.webp':'image/webp','.avif':'image/avif','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
const rates=new Map();
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,origin),path=decodeURIComponent(url.pathname);
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
 const send=(code,body,type='text/html; charset=utf-8')=>{res.writeHead(code,{'Content-Type':type});res.end(body);};const json=(code,obj)=>send(code,JSON.stringify(obj),'application/json');
 if(path==='/api/leads'&&req.method==='POST'){
  res.setHeader('Cache-Control','no-store');
  if(req.headers.origin&&req.headers.origin!==origin)return json(403,{error:'Please submit from the website.'});
  const ip=req.socket.remoteAddress,now=Date.now();for(const [key,val] of rates)if(val.until<now)rates.delete(key);const rate=rates.get(ip)||{count:0,until:now+600000};if(rate.count>=10)return json(429,{error:'Too many inquiries. Please try again in a few minutes.'});rate.count++;rates.set(ip,rate);
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>16384)return json(413,{error:'Your message is too long.'});}
  let data;try{data=req.headers['content-type']?.includes('application/json')?JSON.parse(body):Object.fromEntries(new URLSearchParams(body));if(data.consent==='on')data.consent=true;}catch{return json(400,{error:'Invalid form data.'});}
  if(data.website)return json(400,{error:'Unable to accept this inquiry.'});let lead;try{lead=validateLead(data);}catch(e){return json(400,{error:e.message});}
  const id=await saveLead(lead,dataDir);
  if(sheetsConfigured()){
   try{await appendLeadToSheet(id,lead);}
   catch(error){console.error('Google Sheets append failed:',error.message);return json(502,{error:'Your inquiry was received locally, but we could not reach the lead sheet. Please try again shortly.'});}
  }
  return json(201,{ok:true,id});
 }
 if(path==='/api/partners'&&req.method==='POST'){
  res.setHeader('Cache-Control','no-store');
  if(req.headers.origin&&req.headers.origin!==origin)return json(403,{error:'Please submit from the website.'});
  const ip=req.socket.remoteAddress,now=Date.now();for(const [key,val] of rates)if(val.until<now)rates.delete(key);const rate=rates.get(ip)||{count:0,until:now+600000};if(rate.count>=10)return json(429,{error:'Too many submissions. Please try again in a few minutes.'});rate.count++;rates.set(ip,rate);
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>16384)return json(413,{error:'Your message is too long.'});}
  let data;try{data=req.headers['content-type']?.includes('application/json')?JSON.parse(body):Object.fromEntries(new URLSearchParams(body));if(data.consent==='on')data.consent=true;}catch{return json(400,{error:'Invalid form data.'});}
  if(data.website)return json(400,{error:'Unable to accept this request.'});let partnerLead;try{partnerLead=validatePartner(data);}catch(e){return json(400,{error:e.message});}
  const id=await savePartner(partnerLead,dataDir);
  if(sheetsConfigured()){
   try{await appendPartnerToSheet(id,partnerLead);}
   catch(error){console.error('Google Sheets partner append failed:',error.message);return json(502,{error:'Your request was received locally, but we could not reach the partner sheet. Please try again shortly.'});}
  }
  return json(201,{ok:true,id});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return send(405,'Method not allowed','text/plain');
 if(path==='/admin/leads.csv'){
  const token=process.env.LEADS_EXPORT_TOKEN,actual=req.headers.authorization||'',expected=`Bearer ${token}`;
  if(!token||Buffer.byteLength(actual)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return send(401,'Unauthorized','text/plain');
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Disposition','attachment; filename="central-luzon-leads.csv"');try{return send(200,await readFile(join(dataDir,'leads.csv')),'text/csv; charset=utf-8');}catch(e){if(e.code==='ENOENT')return send(404,'No inquiries yet.','text/plain');throw e;}
 }
 if(path==='/')return send(200,home(origin));
 if(path==='/why-central-luzon')return send(200,why(origin));
 if(path==='/partner-with-us')return send(200,partner(origin));
 if(path==='/privacy')return send(200,privacy(origin));
 const estate=estates.find(e=>path===`/estates/${e.id}`);if(estate){const film=estate.video||estate.id+'.mp4';return send(200,detail(estate,origin,existsSync(join(pub,'media',film))));}
 if(path==='/robots.txt')return send(200,`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nSitemap: ${origin}/sitemap.xml\n`,'text/plain');
 if(path==='/sitemap.xml')return send(200,`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/why-central-luzon','/partner-with-us','/privacy',...estates.map(e=>'/estates/'+e.id)].map(p=>`<url><loc>${origin}${p}</loc></url>`).join('')}</urlset>`,'application/xml');
 const file=resolve(pub,'.'+path);if(!file.startsWith(pub+'/'))return send(404,'Not found','text/plain');
 if(!types[extname(file)])return send(404,'Not found','text/plain');let info;try{info=await stat(file);}catch{return send(404,'Not found','text/plain');}if(!info.isFile())return send(404,'Not found','text/plain');
 res.setHeader('Content-Type',types[extname(file)]);res.setHeader('Cache-Control','public, max-age=3600');res.setHeader('Accept-Ranges','bytes');
 if(req.headers.range){const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!match){res.writeHead(416);return res.end();}const start=Number(match[1]),end=match[2]?Number(match[2]):info.size-1;if(start>end||end>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});if(req.method==='HEAD')return res.end();return createReadStream(file,{start,end}).pipe(res);}
 res.setHeader('Content-Length',info.size);if(req.method==='HEAD')return res.end();createReadStream(file).pipe(res);
 }catch(error){console.error('Request failed:',error.message);if(!res.headersSent)res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Unable to save or load right now. Please try again.'}));}});
const listenPort=Number(process.env.PORT||3000);
if(process.env.HOST)server.listen(listenPort,process.env.HOST,()=>console.log(`Central Luzon Properties: ${origin}`));
else server.listen(listenPort,()=>console.log(`Central Luzon Properties: ${origin}`));

