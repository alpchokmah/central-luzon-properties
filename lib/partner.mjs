import {icon,forward} from './icons.mjs';

const arrow=forward;

function card({icon:name,num,label,title,body}){
 return `<article class="why-card">
  <div class="why-card-mark">${icon(name)}<span class="why-card-num">${num}</span></div>
  <p class="why-card-label">${label}</p>
  <h3>${title}</h3>
  <p>${body}</p>
 </article>`;
}

/** Partner with us page body (inside shell main). */
export function partnerBody(formHtml){
 const who=[
  {icon:'land',num:'01',label:'Owners',title:'List land or a home you hold.',body:'Share titled lots, house-and-lot opportunities, or parcels you are ready to market in Tarlac, Pampanga, and nearby Central Luzon.'},
  {icon:'enterprise',num:'02',label:'Brokers & agents',title:'Bring your inventory forward.',body:'Connect as a partner agent or broker. We surface select opportunities to people already exploring the region—without replacing your client relationship.'},
  {icon:'commercial',num:'03',label:'Developers & estates',title:'Extend your estate reach.',body:'Developers and estate teams can propose communities, phases, or commercial offerings for discovery on the site.'}
 ];
 const steps=[
  {icon:'demand',num:'01',label:'Share',title:'Tell us what you have.',body:'Use the form with your role, location, property type, and a short description. Photos and titles can follow once we connect.'},
  {icon:'operations',num:'02',label:'Review',title:'We review for fit.',body:'We check that the opportunity belongs in Central Luzon discovery—clear location, honest description, and alignment with how the site presents estates.'},
  {icon:'lasting',num:'03',label:'Feature',title:'Appear when it is ready.',body:'Approved partners are contacted about next steps: profile details, imagery, and how inquiries will be routed to you.'}
 ];

 return `<section class="hero partner-hero">
  <img class="hero-photo cinematic" src="/media/drone-new-clark-city.jpg" alt="Aerial view across Central Luzon" fetchpriority="high" width="1920" height="1080">
  <div class="hero-shade"></div>
  <div class="hero-copy">
   <p class="eyebrow">PARTNER WITH US</p>
   <h1>Bring your property<br><em>into the conversation.</em></h1>
   <p>Owners, brokers, and developers who want to connect Central Luzon opportunities with people already looking north.</p>
   <a href="#partner-inquire" class="button light">Start a partnership ${arrow}</a>
  </div>
  <div class="hero-note"><span>OWNERS · AGENTS · DEVELOPERS</span><span>Feature select listings on this site</span></div>
  <div class="hero-bottom"><span>DISCOVERY & REFERRAL</span><span>PARTNER WITH US ↓</span></div>
 </section>

 <section class="why-intro section" aria-label="Who this page is for">
  <div class="why-hero-marks">
   <div>${icon('land')}<span>Owners</span><small>Lots & homes to list</small></div>
   <div>${icon('enterprise')}<span>Agents</span><small>Inventory & referrals</small></div>
   <div>${icon('commercial')}<span>Developers</span><small>Estates & releases</small></div>
  </div>
 </section>

 <section class="region section why-invest" id="who" aria-labelledby="partner-who-title">
  <div class="section-heading">
   <div><p class="eyebrow">WHO WE WORK WITH</p><h2 id="partner-who-title">A channel for people<br><em>with something to offer.</em></h2></div>
   <p>Central Luzon Properties is an independent discovery site. Partnerships are selective—we feature opportunities that help visitors explore the region with clarity.</p>
  </div>
  <div class="why-grid">${who.map(card).join('')}</div>
 </section>

 <section class="region section why-live" id="how" aria-labelledby="partner-how-title">
  <div class="section-heading">
   <div><p class="eyebrow">HOW IT WORKS</p><h2 id="partner-how-title">Three steps from note<br><em>to a featured presence.</em></h2></div>
   <p>Submitting the form does not publish a listing automatically. We follow up before anything goes live.</p>
  </div>
  <div class="why-grid">${steps.map(card).join('')}</div>
  <div class="region-next partner-cta">
   <div><p class="eyebrow">READY WHEN YOU ARE</p><h3>Have a Central Luzon<br>opportunity to share?</h3><p>Tell us who you are and what you would like to feature. We will reply about fit and next steps.</p></div>
   <a class="button dark" href="#partner-inquire">Open the partner form ${arrow}</a>
  </div>
 </section>

 ${formHtml}`;
}
