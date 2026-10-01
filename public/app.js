const $=s=>document.querySelector(s);
const filters=$('#filters');
if(filters){const update=()=>{const f=new FormData(filters);let count=0;document.querySelectorAll('.estate-card').forEach(card=>{const show=(f.get('area')==='All areas'||f.get('area')===card.dataset.area)&&(f.get('developer')==='All developers'||f.get('developer')===card.dataset.developer)&&(f.get('property')==='All property types'||card.dataset.types.split('|').includes(f.get('property')));card.hidden=!show;if(show)count++;});$('.result-count').textContent=`${count} estate${count===1?'':'s'} to explore`;$('.empty').hidden=count!==0;const pref=$('#lead-form [name="property"]');if(f.get('property')!=='All property types')pref.value=f.get('property');};filters.addEventListener('change',update);filters.addEventListener('reset',()=>setTimeout(update,0));filters.addEventListener('submit',e=>e.preventDefault());}
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');let paused=motion.matches;try{paused=paused||sessionStorage.getItem('motionPaused')==='true';}catch{}
const video=$('.hero-film'),toggle=$('.motion-toggle');
function setMotion(){document.body.classList.toggle('paused',paused);if(toggle){toggle.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';toggle.setAttribute('aria-pressed',String(paused));}if(video){if(paused)video.pause();else video.play().catch(()=>{paused=true;setMotion();});}}
if(video){video.addEventListener('playing',()=>video.classList.add('ready'));video.addEventListener('error',()=>video.classList.remove('ready'));}setMotion();toggle?.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('motionPaused',String(paused));}catch{}setMotion();});motion.addEventListener('change',e=>{paused=e.matches;setMotion();});document.addEventListener('visibilitychange',()=>{if(video){if(document.hidden)video.pause();else if(!paused)video.play().catch(()=>{});}});
document.querySelectorAll('[data-preference]').forEach(link=>link.addEventListener('click',()=>{$('#lead-form [name="property"]').value=link.dataset.preference;}));
document.querySelectorAll('[data-carousel]').forEach(root=>{
 const slides=[...root.querySelectorAll('.carousel-slide')];
 const dots=[...root.querySelectorAll('.carousel-dot')];
 const status=root.querySelector('[data-carousel-current]');
 const prev=root.querySelector('.carousel-prev');
 const next=root.querySelector('.carousel-next');
 if(slides.length<2)return;
 let index=0,timer=null,touchX=0;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((slide,n)=>{const on=n===index;slide.classList.toggle('is-active',on);slide.hidden=!on;});dots.forEach((dot,n)=>{const on=n===index;dot.classList.toggle('is-active',on);dot.setAttribute('aria-current',on?'true':'false');});if(status)status.textContent=String(index+1);};
 const go=dir=>show(index+dir);
 const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
 const start=()=>{if(reduce||timer)return;timer=setInterval(()=>go(1),6000);};
 prev?.addEventListener('click',()=>{go(-1);stop();start();});
 next?.addEventListener('click',()=>{go(1);stop();start();});
 dots.forEach(dot=>dot.addEventListener('click',()=>{show(Number(dot.dataset.index));stop();start();}));
 root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(-1);stop();start();}if(e.key==='ArrowRight'){e.preventDefault();go(1);stop();start();}});
 root.tabIndex=0;
 const viewport=root.querySelector('.carousel-viewport');
 viewport?.addEventListener('pointerdown',e=>{touchX=e.clientX;});
 viewport?.addEventListener('pointerup',e=>{const d=e.clientX-touchX;if(Math.abs(d)<40)return;go(d<0?1:-1);stop();start();});
 root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);
 root.addEventListener('focusin',stop);root.addEventListener('focusout',start);
 show(0);start();
});
const form=$('#lead-form');form?.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type="submit"]'),status=$('#form-status');button.disabled=true;button.textContent='Sending…';status.textContent='';const data=Object.fromEntries(new FormData(form));data.consent=form.elements.consent.checked;try{const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw Error(result.error||'Unable to save your inquiry. Please try again.');status.textContent='Your inquiry has been saved. Thank you for sharing your plans with us.';form.reset();}catch(error){status.textContent=error.message||'Connection problem. Please try again.';}finally{button.disabled=false;button.innerHTML='Send my inquiry <svg class="icon-forward" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg>';}});
const partnerForm=$('#partner-form');partnerForm?.addEventListener('submit',async event=>{event.preventDefault();if(!partnerForm.reportValidity())return;const button=partnerForm.querySelector('[type="submit"]'),status=$('#partner-form-status');button.disabled=true;button.textContent='Sending…';status.textContent='';const data=Object.fromEntries(new FormData(partnerForm));data.consent=partnerForm.elements.consent.checked;try{const response=await fetch('/api/partners',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw Error(result.error||'Unable to save your request. Please try again.');status.textContent='🎉 Thanks—we received your partnership interest and will follow up about next steps.';partnerForm.reset();}catch(error){status.textContent=error.message||'Connection problem. Please try again.';}finally{button.disabled=false;button.innerHTML='Submit partnership interest <svg class="icon-forward" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg>';}});
