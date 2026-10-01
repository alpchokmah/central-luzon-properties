import {mkdir,appendFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
export const headers=['Inquiry ID','Received UTC','Name','Email','Phone','Estate','Property preference','Budget','Message','Consent','Status'];
const choices={estate:['Not sure yet','Cresendo','Alviera','TARI Estate'],property:['Residential lots','House & lot','Commercial lots','Industrial lots','Not sure yet'],budget:['Not specified','Below ₱3M','₱3M–₱5M','₱5M–₱10M','Above ₱10M']};
export function validateLead(input){
 if(!input||typeof input!=='object') throw Error('Please complete the form.');
 const out={};for(const key of ['name','email','phone','estate','property','budget','message']){if(typeof input[key]!=='string')throw Error('Please complete all required fields.');out[key]=input[key].trim();}
 if(out.name.length<2||out.name.length>100)throw Error('Enter your name (2–100 characters).');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)||out.email.length>254)throw Error('Enter a valid email address.');
 if(out.phone && (!/^[+\d\s()\-]{7,25}$/.test(out.phone)))throw Error('Enter a valid phone number or leave it blank.');
 for(const key of Object.keys(choices))if(!choices[key].includes(out[key]))throw Error('Choose a valid '+key+'.');
 if(out.message.length>2000)throw Error('Keep your message under 2,000 characters.');
 if(input.consent!==true)throw Error('Consent is required so we can follow up.');
 return out;
}
export const csvCell=value=>'"'+String(value).replace(/^[\s]*[=+@\-]/,"'$&").replaceAll('"','""')+'"';
let queue=Promise.resolve();
export async function saveLead(lead,dir){const id=randomUUID(); const row=[id,new Date().toISOString(),lead.name,lead.email,lead.phone,lead.estate,lead.property,lead.budget,lead.message,'Granted: inquiry follow-up','New'];
 const operation=queue.then(async()=>{await mkdir(dir,{recursive:true,mode:0o700});const file=join(dir,'leads.csv');let exists=true;try{await readFile(file);}catch(e){if(e.code==='ENOENT')exists=false;else throw e;}await appendFile(file,(!exists?'\uFEFF'+headers.map(csvCell).join(',')+'\r\n':'')+row.map(csvCell).join(',')+'\r\n',{mode:0o600});});queue=operation.catch(()=>{});await operation;return id;}
