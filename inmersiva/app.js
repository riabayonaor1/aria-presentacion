import {chapters} from './chapters.js';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
let active=0,exploring=false,exploded=false,layoutBooting=true;
if("scrollRestoration" in history)history.scrollRestoration="manual";
const noWorld={setJourney(){},setChapter(){},focusTopic(){},setExploring(){},setExploded(){},reset(){},getState(){return {ready:false,mode:'static'};},getGroupPositions(){return {};}};
let world=noWorld;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const support=c=>{
 if(c.kind==='hardware')return '<div class="support"><button class="text-link" data-evidence="photo">Ver fotografía del montaje real ↗</button><p class="budget-note">El montaje utiliza Arduino Uno R3 y tres controladores ULN2003.</p></div>';
 if(c.id==='fusion')return '<div class="support"><button class="text-link" data-evidence="fusion">Ver modelo CNC con Arduino Uno R3 ↗</button><p class="budget-note">Mecánica completa de Fusion con Arduino Uno R3. Materiales sólidos para reconocer cada pieza.</p></div>'; 
 if(c.kind==='flow')return '<div class="support flow"><strong>Voz</strong><i>→</i><strong>Intención</strong><i>→</i><strong>Trazos</strong><i>→</i><strong>G-code</strong><i>→</i><strong>Movimiento</strong></div>';
 if(c.kind==='budget')return '<div class="support" id="budget-summary"><dl class="budget"><dt>3 motores y sus ULN2003</dt><dd>Ver cotización</dd><dt>Raspberry, Arduino y electrónica</dt><dd>Ver detalle</dd><dt>Impresión, cableado y montaje</dt><dd>Según hipótesis</dd><dt>Recargas API</dt><dd>US$10 + US$10</dd></dl><a class="text-link" href="../Presupuesto_ARIA.csv">Abrir presupuesto y fuentes ↗</a></div>';
 if(c.kind==='prompt')return '<div class="support code-card"><span class="cyan">SOLICITUD</span> escribe Hola<br><span class="coral">OPERACIÓN</span> write(text="Hola")<br><span class="cyan">CONTROL</span> referencia + área + Idle<br><span class="coral">RESULTADO</span> solo tras comprobar fin</div>';
 if(c.kind==='connections')return '<div class="support flow"><strong>Pi 4B</strong><i>USB</i><strong>UNO</strong><i>señales</i><strong>ULN2003</strong><i>bobinas</i><strong>Motores</strong></div>';
 if(c.kind==='software')return '<ol class="support steps"><li><b>01</b> Interpretar la entrada y crear trazos.</li><li><b>02</b> Ajustar al papel y generar SVG / .nc.</li><li><b>03</b> Validar coordenadas y referencia.</li><li><b>04</b> Enviar y esperar el fin real.</li></ol>';
 if(c.kind==='correction')return '<div class="support callout">La causa física de la variación no quedó establecida. Un ensayo posterior satisfactorio no equivale a precisión garantizada.</div>';
 if(c.kind==='demo')return '<div class="support callout">42 líneas de HOLA · fin Idle · sin alarmas · ensayo sin lápiz.</div>';
 return '';
};
function media(c){
 if(c.kind==='fusion')return '<figure class="media-card fusion-media"><img src="assets/ensamblaje-uno-r3.png" alt="Modelo CNC basado en Fusion con Arduino Uno R3 con tabla, motores y electrónica de referencia"><figcaption>Modelo CNC basado en Fusion · Arduino Uno R3</figcaption></figure>';
 if(c.kind==='photo')return '<figure class="media-card"><img src="assets/prototipo.jpg" alt="Montaje real de ARIA con motores, ULN2003, Arduino y cableado"><figcaption>Fotografía real del prototipo · aportada por el equipo</figcaption></figure>';
 if(c.kind==='area')return '<div class="area-card"><div class="area-outline"><div class="area-inner">55,699 × 66,488<small>mm · zona interior</small><small>Margen de 3 mm</small></div></div></div>';
 if(c.kind==='demo')return '<figure class="media-card"><img class="demo-preview" src="assets/hola-preview.svg" alt="Trazos vectoriales HOLA preparados por el conversor real"><figcaption>Vista de trazos · representa el diseño, no una escritura física</figcaption></figure>';
 if(c.kind==='video')return '<figure class="media-card"><video id="final-video" controls playsinline preload="metadata" poster="assets/prototipo.jpg"><source src="../Video_ARIA_web.mp4?v=narracion3" type="video/mp4"></video></figure>';
 return '';
}
$('#recorrido').innerHTML=chapters.map((c,i)=>`<section id="${c.id}" class="chapter ${c.kind} ${(c.kind==='photo'||c.kind==='area'||c.kind==='demo'||c.kind==='video'||c.kind==='fusion')?'dim-model':''}" aria-label="Diapositiva ${i+1}: ${esc(c.title.replace(/\n/g,' '))}"><div class="chapter-copy">${c.kind==='brand'?'<img class="brand-mark" src="assets/aria-logo.png" alt="Marca ARIA, rostro y CNC">':''}<span class="eyebrow">${esc(c.kicker)}</span><${i?'h2':'h1'}>${esc(c.title)}</${i?'h2':'h1'}><p class="lead">${esc(c.lead)}</p><p class="detail">${esc(c.detail)}</p>${support(c)}<div class="chapter-tags">${c.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>${media(c)}</section>`).join('');
$('#chapter-dots').innerHTML=chapters.map((c,i)=>`<button aria-label="Ir a diapositiva ${i+1}: ${esc(c.title.replace(/\n/g,' '))}" data-go="${i}"></button>`).join('');
$('#index-list').innerHTML=chapters.map((c,i)=>`<button data-go="${i}"><span>${String(i+1).padStart(2,'0')}</span>${esc(c.title.replace(/\n/g,' '))}</button>`).join('');
function refresh(){const c=chapters[active];$('#rail-current').textContent=String(active+1).padStart(2,'0');$('#slide-count').textContent=String(active+1).padStart(2,'0')+' / 16';$('#role-label').textContent=c.role+' · '+(active===15?'3 min de video':c.seconds+' s');$$('#chapter-dots button').forEach((b,i)=>b.classList.toggle('active',i===active));$('#previous').disabled=active===0;$('#next').disabled=active===15;$('#notes-role').textContent=c.role+' · '+c.seconds+' segundos';$('#notes-title').textContent=c.title.replace(/\n/g,' ');$('#notes-text').textContent=c.notes;$('.page-progress div').style.width=((active+1)/16*100)+'%';document.body.dataset.chapter=c.id;world?.setChapter(active);}
// Native dialogs have a lightweight fallback for browsers without showModal.
const dialogFocus=new WeakMap();
function openDialog(dialog){
 if(dialog.hasAttribute('open'))return;
 dialogFocus.set(dialog,document.activeElement);
 if(typeof dialog.showModal==='function'){dialog.showModal();}
 else{dialog.setAttribute('open','');dialog.classList.add('dialog-fallback');document.body.classList.add('dialog-open');}
 const first=dialog.querySelector('button,a[href]');if(first)first.focus();
}
function closeDialog(dialog){
 if(!dialog||!dialog.hasAttribute('open'))return;
 if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');
 dialog.classList.remove('dialog-fallback');document.body.classList.remove('dialog-open');
 dialogFocus.get(dialog)?.focus();
}
let navigationFrame=0,navigationTarget=null;
function stopNavigation(){cancelAnimationFrame(navigationFrame);navigationTarget=null;}
function scrollToChapter(i,animate=true){
 stopNavigation();
 const target=document.getElementById(chapters[i].id);
 const y=target.getBoundingClientRect().top+window.pageYOffset;
 if(!animate||reducedMotion.matches){window.scrollTo(0,y);return;}
 navigationTarget=i;
 const startY=window.pageYOffset,start=performance.now(),duration=650;
 function tick(now){
  const t=Math.min(1,(now-start)/duration),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  window.scrollTo(0,startY+(y-startY)*ease);
  if(t<1)navigationFrame=requestAnimationFrame(tick);
  else{navigationTarget=null;onScroll();}
 }
 navigationFrame=requestAnimationFrame(tick);
}
function go(i,animate=true){
 i=Math.max(0,Math.min(chapters.length-1,i));closeDialog($('#index-dialog'));
 $$('.chapter')[active]?.querySelectorAll('video').forEach(v=>v.pause());
 active=i;refresh();scrollToChapter(i,animate);history.replaceState(null,'','#'+chapters[i].id);
}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.go))));$('#previous').onclick=()=>go(active-1);$('#next').onclick=()=>go(active+1);
$('#notes-button').onclick=()=>openDialog($('#notes-dialog'));$('#index-button').onclick=()=>openDialog($('#index-dialog'));
$$('[data-close]').forEach(b=>b.onclick=()=>closeDialog(b.closest('dialog')));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)closeDialog(d);}));
for(const event of ['wheel','touchstart'])window.addEventListener(event,()=>{if(navigationTarget!==null){stopNavigation();onScroll();}},{passive:true});
let fullscreenAnchor=null,fullscreenTimer;
function restoreFullscreenChapter(){
 if(fullscreenAnchor===null)return;
 active=fullscreenAnchor;refresh();scrollToChapter(active,false);
 history.replaceState(null,'','#'+chapters[active].id);
 fullscreenTimer=setTimeout(()=>{fullscreenAnchor=null;onScroll();},120);
}
function syncFullscreenButton(){
 const enabled=!!(document.fullscreenElement||document.webkitFullscreenElement);
 $('#fullscreen').setAttribute('aria-pressed',String(enabled));
 $('#fullscreen').setAttribute('aria-label',enabled?'Salir de pantalla completa':'Pantalla completa');
}
const enterFullscreen=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;
const leaveFullscreen=document.exitFullscreen||document.webkitExitFullscreen;
const fullscreen=async()=>{
 if(!enterFullscreen||!leaveFullscreen)return;
 stopNavigation();fullscreenAnchor=active;
 try{
  if(document.fullscreenElement||document.webkitFullscreenElement)await leaveFullscreen.call(document);
  else await enterFullscreen.call(document.documentElement);
 }catch{
  $('#fullscreen').title='La pantalla completa no está disponible en esta ventana. Puedes continuar con la presentación.';
 }finally{syncFullscreenButton();clearTimeout(fullscreenTimer);fullscreenTimer=setTimeout(restoreFullscreenChapter,250);}
};
$('#fullscreen').onclick=fullscreen;
if(!enterFullscreen||!leaveFullscreen){$('#fullscreen').hidden=true;}
for(const event of ['fullscreenchange','webkitfullscreenchange'])document.addEventListener(event,()=>{
 if(fullscreenAnchor===null)fullscreenAnchor=active;
 syncFullscreenButton();clearTimeout(fullscreenTimer);fullscreenTimer=setTimeout(restoreFullscreenChapter,250);
});
function explore(){exploring=!exploring;world?.setExploring(exploring);$('#explore-button').setAttribute('aria-pressed',String(exploring));}function explode(){exploded=!exploded;world?.setExploded(exploded);$('#explode-button').setAttribute('aria-pressed',String(exploded));}$('#explore-button').onclick=explore;$('#explode-button').onclick=explode;$('#reset-model').onclick=()=>{exploring=false;exploded=false;world?.reset();$('#explore-button').setAttribute('aria-pressed','false');$('#explode-button').setAttribute('aria-pressed','false');$('#selection').hidden=true;};$('#selection-close').onclick=()=>$('#selection').hidden=true;
window.addEventListener('keydown',e=>{
 if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)||e.target.isContentEditable)return;
 const open=$('dialog[open]');
 if(e.key==='Escape'){closeDialog(open);if(exploring)explore();return;}
 if(e.key==='Tab'&&open&&open.classList.contains('dialog-fallback')){
  const focusable=Array.from(open.querySelectorAll('button,a[href],[tabindex="0"]'));
  const first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}return;
 }
 if(e.target.closest('video')||(e.key===' '&&e.target.closest('button,a')))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();go(active+1);}
 else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(active-1);}
 else if(e.key==='Home'){e.preventDefault();go(0);}
 else if(e.key==='End'){e.preventDefault();go(15);}
 else if(e.key.toLowerCase()==='g'){const d=$('#notes-dialog');if(d.hasAttribute('open'))closeDialog(d);else openDialog(d);}
 else if(e.key.toLowerCase()==='i')openDialog($('#index-dialog'));
 else if(!open&&e.key.toLowerCase()==='f')fullscreen();
 else if(!open&&e.key.toLowerCase()==='e'&&!$('#explore-button').disabled)explore();
 else if(!open&&e.key.toLowerCase()==='d'&&!$('#explode-button').disabled)explode();
});
let scrollQueued=false;
function onScroll(){
 if(layoutBooting||fullscreenAnchor!==null||scrollQueued||navigationTarget!==null)return;
 scrollQueued=true;requestAnimationFrame(()=>{
  scrollQueued=false;if(layoutBooting||fullscreenAnchor!==null||navigationTarget!==null)return;
  const sections=$$('.chapter');let nearest=0,dist=Infinity;
  sections.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().top);if(d<dist){dist=d;nearest=i;}});
  if(nearest!==active){$$('video').forEach(v=>v.pause());active=nearest;refresh();}
  const top=sections[0].offsetTop,step=sections[1].offsetTop-top;world.setJourney((window.pageYOffset-top)/step);
 });
}
window.addEventListener('scroll',onScroll,{passive:true});
let resizeTimer;
window.addEventListener('resize',()=>{
 const keep=fullscreenAnchor===null?active:fullscreenAnchor;
 clearTimeout(resizeTimer);clearTimeout(fullscreenTimer);fullscreenAnchor=keep;
 resizeTimer=setTimeout(restoreFullscreenChapter,250);
});
function staticView(){
 $('#fallback').hidden=false;document.body.classList.add('static-model');
 $('#world-status').textContent='CNC CON ARDUINO UNO R3 · VISTA ESTÁTICA';
 $('#focus-label').textContent='CNC con Arduino Uno R3';
 $('#focus-detail').textContent='Vista estática disponible. Continúa el recorrido, consulta el guion y reproduce el video.';
 $$('[data-focus],.model-tools button').forEach(b=>b.disabled=true);
}
async function initWorld(){
 try{
  const {createWorld}=await import('./scene.js');
  world=await createWorld({host:$('#world'),
   onReady:()=>{$('#fallback').hidden=true;document.body.classList.remove('static-model');$$('[data-focus],.model-tools button').forEach(b=>b.disabled=false);$('#world-status').textContent='CNC CON ARDUINO UNO R3 · BASE AUTODESK FUSION';},
   onFocus:r=>{exploring=false;$('#explore-button').setAttribute('aria-pressed','false');$('#focus-label').textContent=r.label;$('#focus-detail').textContent=r.detail;$('#motor-options').hidden=!r.topic.startsWith('motor');document.body.dataset.modelTopic=r.topic;$$('[data-focus]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.focus===r.topic||(b.dataset.focus==='motors'&&r.topic.startsWith('motor')))));},
   onSelect:r=>{$('#selection').hidden=false;$('#selection-name').textContent=r.name;$('#selection-detail').textContent=r.detail;},
   onError:staticView});
  world.setChapter(active);
 }catch{world=noWorld;staticView();}
}
$$('[data-focus]').forEach(b=>b.addEventListener('click',()=>{exploring=false;world.setExploring(false);world.focusTopic(b.dataset.focus);$('#explore-button').setAttribute('aria-pressed','false');}));
$$('[data-evidence]').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.evidence==='fusion';$('#evidence-image').src=f?'assets/ensamblaje-uno-r3.png':'assets/prototipo.jpg';$('#evidence-image').alt=f?'Modelo CNC basado en Fusion con Arduino Uno R3':'Fotografía real del montaje ARIA';$('#evidence-caption').textContent=f?'Vista de la CNC basada en Fusion · Arduino Uno R3':'Montaje físico ARIA · Arduino Uno R3 y ULN2003 · fotografía aportada por el equipo';openDialog($('#evidence-dialog'));}));
window.ARIA={go,focus:t=>world.focusTopic(t),getGroupPositions:()=>world.getGroupPositions(),getState:()=>({active,chapter:chapters[active].id,...world.getState?.()}),chapters};
const initial=chapters.findIndex(c=>'#'+c.id===location.hash);
if(initial>=0)go(initial,false);else refresh();
onScroll();initWorld();
window.addEventListener('hashchange',()=>{const i=chapters.findIndex(c=>'#'+c.id===location.hash);if(i>=0)go(i);});
// Optional authored budget replaces the summary without coupling the deck to a toolchain.
async function loadSupport(){
try{const r=await fetch('budget-summary.json');if(r.ok){const b=await r.json();$('#budget-summary').innerHTML='<dl class="budget">'+b.rows.map(x=>`<dt class="${x.total?'total':''}">${esc(x.label)}</dt><dd class="${x.total?'total':''}">${esc(x.value)}</dd>`).join('')+'</dl><p class="budget-note">'+esc(b.note||'')+'</p><a class="text-link" href="../Presupuesto_ARIA.csv">Presupuesto completo y fuentes ↗</a>';}}catch{}

try{const r=await fetch("notes.json");if(r.ok){const notes=await r.json();for(const [n,v] of Object.entries(notes)){const c=chapters[Number(n)-1];if(c){c.notes=v.text;c.role=v.role;c.window=v.window;const ts=v.window.match(/(\d+):(\d+)/g);if(ts?.length===2){const sec=t=>Number(t.split(":")[0])*60+Number(t.split(":")[1]);c.seconds=sec(ts[1])-sec(ts[0]);}}}refresh();}}catch{}

}
const supportsReady=loadSupport();
const pageReady=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
Promise.all([pageReady,document.fonts?document.fonts.ready:Promise.resolve(),supportsReady]).then(()=>{
 requestAnimationFrame(()=>{scrollToChapter(active,false);layoutBooting=false;onScroll();});
});
