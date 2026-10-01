import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {validatePartner,savePartner,partnerHeaders} from '../lib/partners.mjs';

const valid={
 name:'Jordan Reyes',
 email:'jordan@example.com',
 phone:'+63 917 000 0000',
 role:'Property owner',
 company:'',
 location:'Tarlac City',
 property:'Residential lots',
 message:'Titled lot near SCTEX ready to market.',
 consent:true
};

test('validates partner submissions',()=>{
 assert.equal(validatePartner(valid).location,'Tarlac City');
 assert.throws(()=>validatePartner({...valid,message:'short'}),/10/);
 assert.throws(()=>validatePartner({...valid,role:'Investor'}),/role/);
});

test('saves partner rows with header',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'clp-partners-'));
 try{
  const id=await savePartner(validatePartner(valid),dir);
  const csv=await readFile(join(dir,'partners.csv'),'utf8');
  assert.ok(csv.includes(partnerHeaders[0]));
  assert.ok(csv.includes(id));
  assert.ok(csv.includes('Property owner'));
 }finally{
  await rm(dir,{recursive:true,force:true});
 }
});
