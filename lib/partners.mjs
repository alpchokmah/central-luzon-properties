import {mkdir,appendFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';

export const partnerHeaders=['Partner ID','Received UTC','Name','Email','Phone','Role','Company','Location','Property types','Message','Consent','Status'];

const choices={
 role:['Property owner','Broker or agent','Developer','Other'],
 property:['Residential lots','House & lot','Commercial lots','Industrial lots','Mixed / several','Not sure yet']
};

export function validatePartner(input){
 if(!input||typeof input!=='object')throw Error('Please complete the form.');
 const out={};
 for(const key of ['name','email','phone','role','company','location','property','message']){
  if(typeof input[key]!=='string')throw Error('Please complete all required fields.');
  out[key]=input[key].trim();
 }
 if(out.name.length<2||out.name.length>100)throw Error('Enter your name (2–100 characters).');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)||out.email.length>254)throw Error('Enter a valid email address.');
 if(out.phone&&(!/^[+\d\s()\-]{7,25}$/.test(out.phone)))throw Error('Enter a valid phone number or leave it blank.');
 if(!choices.role.includes(out.role))throw Error('Choose a valid role.');
 if(out.company.length>120)throw Error('Keep the company name under 120 characters.');
 if(out.location.length<2||out.location.length>120)throw Error('Enter a location or area (2–120 characters).');
 if(!choices.property.includes(out.property))throw Error('Choose a valid property type.');
 if(out.message.length<10||out.message.length>2000)throw Error('Tell us a bit more about the property (10–2,000 characters).');
 if(input.consent!==true)throw Error('Consent is required so we can follow up.');
 return out;
}

export const csvCell=value=>'"'+String(value).replace(/^[\s]*[=+@\-]/,"'$&").replaceAll('"','""')+'"';

let queue=Promise.resolve();

export async function savePartner(partner,dir){
 const id=randomUUID();
 const row=[id,new Date().toISOString(),partner.name,partner.email,partner.phone,partner.role,partner.company,partner.location,partner.property,partner.message,'Granted: partnership follow-up','New'];
 const operation=queue.then(async()=>{
  await mkdir(dir,{recursive:true,mode:0o700});
  const file=join(dir,'partners.csv');
  let exists=true;
  try{await readFile(file);}catch(e){if(e.code==='ENOENT')exists=false;else throw e;}
  await appendFile(file,(!exists?'\uFEFF'+partnerHeaders.map(csvCell).join(',')+'\r\n':'')+row.map(csvCell).join(',')+'\r\n',{mode:0o600});
 });
 queue=operation.catch(()=>{});
 await operation;
 return id;
}
