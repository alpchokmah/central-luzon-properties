import {readFile} from 'node:fs/promises';
import {createSign} from 'node:crypto';
import {resolve} from 'node:path';
import {headers as leadHeaders} from './leads.mjs';
import {partnerHeaders} from './partners.mjs';

const SCOPE='https://www.googleapis.com/auth/spreadsheets';
const TOKEN_URL='https://oauth2.googleapis.com/token';

let cachedCreds,cachedToken,cachedExpiry=0;
const ensuredTabs=new Set();

function b64url(value){
 return Buffer.from(typeof value==='string'?value:JSON.stringify(value)).toString('base64url');
}

export function sheetsConfigured(){
 return Boolean(process.env.GOOGLE_SHEETS_ID&&(process.env.GOOGLE_SERVICE_ACCOUNT_JSON||process.env.GOOGLE_SERVICE_ACCOUNT_FILE));
}

async function loadCredentials(){
 if(cachedCreds)return cachedCreds;
 let creds;
 if(process.env.GOOGLE_SERVICE_ACCOUNT_JSON){
  creds=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
 }else{
  const file=resolve(process.env.GOOGLE_SERVICE_ACCOUNT_FILE);
  creds=JSON.parse(await readFile(file,'utf8'));
 }
 if(creds.type!=='service_account'||!creds.client_email||!creds.private_key)throw Error('Invalid Google service account credentials.');
 cachedCreds=creds;
 return creds;
}

async function accessToken(){
 const now=Math.floor(Date.now()/1000);
 if(cachedToken&&cachedExpiry>now+60)return cachedToken;
 const creds=await loadCredentials();
 const unsigned=`${b64url({alg:'RS256',typ:'JWT'})}.${b64url({iss:creds.client_email,scope:SCOPE,aud:TOKEN_URL,iat:now,exp:now+3600})}`;
 const signer=createSign('RSA-SHA256');
 signer.update(unsigned);
 const jwt=`${unsigned}.${signer.sign(creds.private_key,'base64url')}`;
 const res=await fetch(TOKEN_URL,{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:jwt})
 });
 const data=await res.json().catch(()=>({}));
 if(!res.ok)throw Error(data.error_description||data.error||'Unable to authorize Google Sheets.');
 cachedToken=data.access_token;
 cachedExpiry=now+Number(data.expires_in||3600);
 return cachedToken;
}

async function sheetsFetch(path,init={}){
 const token=await accessToken();
 const res=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}${path}`,{
  ...init,
  headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...init.headers}
 });
 const data=await res.json().catch(()=>({}));
 if(!res.ok)throw Error(data.error?.message||`Google Sheets error (${res.status}).`);
 return data;
}

function encodeTab(tab){
 return /'/.test(tab)?`'${tab.replaceAll("'","''")}'`:tab;
}

function tabRange(tab,suffix=''){
 return encodeURIComponent(`${encodeTab(tab)}${suffix}`);
}

async function ensureTab(tab){
 if(ensuredTabs.has(tab))return;
 const meta=await sheetsFetch('?fields=sheets.properties.title');
 const exists=meta.sheets?.some(s=>s.properties?.title===tab);
 if(!exists){
  await sheetsFetch(':batchUpdate',{
   method:'POST',
   body:JSON.stringify({requests:[{addSheet:{properties:{title:tab}}}]})
  });
 }
 ensuredTabs.add(tab);
}

async function ensureHeaderRow(tab,headers){
 await ensureTab(tab);
 const endCol=String.fromCharCode(64+Math.min(headers.length,26));
 const data=await sheetsFetch(`/values/${tabRange(tab,`!A1:${endCol}1`)}`);
 if(data.values?.length)return;
 await sheetsFetch(`/values/${tabRange(tab,'!A1')}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{
  method:'POST',
  body:JSON.stringify({values:[headers]})
 });
}

async function appendRow(tab,headers,row){
 if(!sheetsConfigured())return;
 await ensureHeaderRow(tab,headers);
 const endCol=String.fromCharCode(64+Math.min(headers.length,26));
 await sheetsFetch(`/values/${tabRange(tab,`!A:${endCol}`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,{
  method:'POST',
  body:JSON.stringify({values:[row]})
 });
}

export async function appendLeadToSheet(id,lead,received=new Date().toISOString()){
 const tab=process.env.GOOGLE_SHEETS_TAB||'Leads';
 const row=[id,received,lead.name,lead.email,lead.phone,lead.estate,lead.property,lead.budget,lead.message,'Granted: inquiry follow-up','New'];
 await appendRow(tab,leadHeaders,row);
}

export async function appendPartnerToSheet(id,partner,received=new Date().toISOString()){
 const tab=process.env.GOOGLE_SHEETS_PARTNERS_TAB||'Partners';
 const row=[id,received,partner.name,partner.email,partner.phone,partner.role,partner.company,partner.location,partner.property,partner.message,'Granted: partnership follow-up','New'];
 await appendRow(tab,partnerHeaders,row);
}
