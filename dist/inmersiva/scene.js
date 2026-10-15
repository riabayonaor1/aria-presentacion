import * as THREE from './assets/vendor/three.module.js';
import {OrbitControls} from './assets/vendor/OrbitControls.js';
import {GLTFLoader} from './assets/vendor/GLTFLoader.js';

const TOPICS={
 general:{label:'EnsamblajeCNCARIA completo',detail:'Geometría de Autodesk Fusion · componentes sólidos con materiales de presentación',ids:null,dir:[-1.1,1.05,1.5]},
 motors:{label:'Motor 28BYJ-48 de 5 V',detail:'Uno de los tres motores paso a paso del conjunto · selecciona 1, 2 o 3',ids:['motor_2'],dir:[-.65,.8,1.3]},
 motor1:{label:'Motor 28BYJ-48 · 1',detail:'Motor paso a paso de referencia del conjunto CAD',ids:['motor_1'],dir:[-.8,1,1.5]},
 motor2:{label:'Motor 28BYJ-48 · 2',detail:'Motor paso a paso de referencia del conjunto CAD',ids:['motor_2'],dir:[-.65,.8,1.3]},
 motor3:{label:'Motor 28BYJ-48 · 3',detail:'Motor paso a paso de referencia del conjunto CAD',ids:['motor_3'],dir:[-1,1.3,1.2]},
 controller:{label:'Arduino UNO R3',detail:'Controlador del movimiento CNC usado en el prototipo ARIA',ids:['uno'],dir:[0,1.3,1.7]},
 drivers:{label:'Tres controladores ULN2003',detail:'Cada placa gobierna las bobinas de un motor paso a paso',ids:['uln_1','uln_2','uln_3'],dir:[-.25,1.4,1.8]},
 rails:{label:'Guías, carros y cremalleras imprimibles',detail:'Piezas mecánicas del modelo Simple CNC · selección para explicar la impresión 3D',ids:['rail_fixed','rail_slider','crossarm','crossrail','gear_1','gear_2'],dir:[-.45,1.5,1.3]},
 pen:{label:'Portalápiz y motor giratorio',detail:'Z cambia el contacto del bolígrafo; las unidades del controlador no son altura física',ids:['holder','motor_2','pen'],dir:[-.9,.65,1.2]},
 calibration:{label:'La referencia se establece con el montaje real',detail:'Las dimensiones y la escala se validan físicamente; el CAD muestra la mecánica',ids:['rail_fixed','rail_slider','crossarm','crossrail'],dir:[-.15,2,1.1]}
};
const CHAPTER_TOPICS=['general','general','general','general','general','controller','motors','controller','calibration','general','calibration','rails','pen','general','general','general'];

export async function createWorld({host,onReady=()=>{},onSelect=()=>{},onError=()=>{},onFocus=()=>{}}){
 const staticWorld={setCaptureZoom(){},setJourney(){},setChapter(){},focusTopic(){},setExploring(){},setExploded(){},reset(){},dispose(){},getState(){return{ready:false,mode:'static',meshes:0,groups:0};},getGroupPositions(){return[];}};
 if(!host){onError(new Error('No se encontró el área del modelo 3D.'));return staticWorld;}
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.01,100);
 let renderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch(e){onError(e);return staticWorld;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setClearColor(0xf4f7f6,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.86;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
 const canvas=renderer.domElement;canvas.setAttribute('aria-label','Modelo CNC de ARIA basado en Autodesk Fusion y adaptado con Arduino UNO R3');canvas.setAttribute('role','img');
 const motionQuery=typeof window.matchMedia==='function'?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
 let reducedMotion=!!motionQuery?.matches;
 const controls=new OrbitControls(camera,canvas);controls.enabled=false;controls.enableDamping=!reducedMotion;controls.dampingFactor=.07;controls.minDistance=.45;controls.maxDistance=12;controls.maxPolarAngle=Math.PI*.49;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;canvas.style.touchAction='pan-y';
 scene.add(new THREE.HemisphereLight(0xffffff,0x758486,.8));
 for(const [color,intensity,p] of [[0xffffff,1.7,[-3,7,5]],[0xd2e5ec,.6,[6,3,1]],[0xffe2d2,.8,[2,4,-5]]]){let l=new THREE.DirectionalLight(color,intensity);l.position.set(...p);if(p[0]<0){l.castShadow=true;l.shadow.mapSize.set(2048,2048);Object.assign(l.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:20});l.shadow.normalBias=.018;}scene.add(l);}
 const group=new THREE.Group();scene.add(group);const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.1,color:0x25464a}));floor.rotation.x=-Math.PI/2;floor.position.y=-.018;floor.receiveShadow=true;scene.add(floor);
 const grid=new THREE.GridHelper(5,20,0xa3c4c4,0xcbdcda);grid.material.transparent=true;grid.material.opacity=.15;grid.position.y=-.012;scene.add(grid);
 const materials=[],meshes=[],basePositions=new Map(),explodeVectors=new Map(),groupVectors=new Map(),groupBoxes=new Map();
 let exploring=false,exploded=false,explosion=0,ready=false,selectedGroup=null,topic='general',chapter=0,journey=0,scale=1;
 let disposed=false,contextLost=false,raf=null,last=0,frames=0,positionDirty=false,loadInfo=null;
 const requestFrame=window.requestAnimationFrame?.bind(window)||window.webkitRequestAnimationFrame?.bind(window)||(callback=>window.setTimeout(()=>callback(performance.now()),16));
 const cancelFrame=window.cancelAnimationFrame?.bind(window)||window.webkitCancelAnimationFrame?.bind(window)||window.clearTimeout.bind(window);
 function schedule(){if(raf===null&&!disposed&&!contextLost&&!document.hidden)raf=requestFrame(animate);}
 function stop(){if(raf!==null)cancelFrame(raf);raf=null;last=0;}
 const wantedTarget=new THREE.Vector3(0,.45,0),wantedCamera=new THREE.Vector3(-3.6,3.6,4.8),wholeBox=new THREE.Box3();
 const focusedBox=new THREE.Box3();
 function resize(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(ready&&!exploring)frameTopic();schedule();}
 const ro=typeof window.ResizeObserver==='function'?new ResizeObserver(resize):null;
 if(ro)ro.observe(host);window.addEventListener('resize',resize,{passive:true});
 camera.position.copy(wantedCamera);controls.target.copy(wantedTarget);resize();
 function frameTopic(){
  const t=TOPICS[topic]||TOPICS.general;focusedBox.makeEmpty();
  if(t.ids)for(const id of t.ids){if(groupBoxes.has(id))focusedBox.union(groupBoxes.get(id));}else focusedBox.copy(wholeBox);
  if(focusedBox.isEmpty())focusedBox.copy(wholeBox);
  const size=focusedBox.getSize(new THREE.Vector3()),center=focusedBox.getCenter(new THREE.Vector3());
  // Enclose a bounding sphere so every allowed angle and the narrow viewport fit.
  const radius=Math.max(size.length()/2,.13),vertical=Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov/2))),horizontal=Math.atan(Math.tan(vertical)*camera.aspect);
  const limiting=Math.min(vertical,horizontal);let distance=radius/Math.sin(limiting)*(topic==='general'?1.05:1.2);
  distance=Math.max(distance,topic==='general'?5.2:.9);
  const direction=new THREE.Vector3(...t.dir).normalize();wantedTarget.copy(center);wantedCamera.copy(center).addScaledVector(direction,distance);
  if(exploded){wantedCamera.copy(center).addScaledVector(direction,distance*1.2);wantedTarget.y+=.2;}
  if(reducedMotion&&!exploring){camera.position.copy(wantedCamera);controls.target.copy(wantedTarget);}
  schedule();
 }
 function styleMaterials(){
  const ids=TOPICS[topic]?.ids,active=ids?new Set(ids):null;
  for(const [m,original]of materials){let selected=selectedGroup===m.userData.groupId,focused=!active||active.has(m.userData.groupId);m.material.color.copy(original.color);m.material.emissive.copy(original.emissive);m.material.emissiveIntensity=original.emissiveIntensity;m.material.opacity=1;m.material.transparent=false;m.material.depthWrite=true;
   if(selected||(active&&focused)){m.material.emissive.set(0x087f8c);m.material.emissiveIntensity=selected?.1:.018;}
   if(active&&focused&&(topic==='rails'||topic==='calibration'))m.material.color.lerp(new THREE.Color('#ED765E'),selected?.25:.12);m.castShadow=true;m.material.needsUpdate=true;if(m.userData.focusOutline)m.userData.focusOutline.visible=!!active&&focused;
  }
  grid.material.opacity=.12;
  schedule();
 }
 function focusTopic(next,{automatic=false}={}){
  if(!TOPICS[next])next='general';topic=next;selectedGroup=null;
  // A deliberate focus resumes camera guidance; the person can Explore again afterwards.
  if(exploring)setExploring(false);
  if(ready){frameTopic();styleMaterials();}const t=TOPICS[topic];onFocus({topic,label:t.label,detail:t.detail,automatic});
 }
 function setExploring(value){exploring=!!value;controls.enabled=exploring;host.classList.toggle('exploring',exploring);canvas.style.touchAction=exploring?'none':'pan-y';schedule();}
 function applyExplosion(){for(const m of meshes)m.position.copy(basePositions.get(m)).addScaledVector(explodeVectors.get(m),explosion);positionDirty=false;}
 function motionChanged(event){reducedMotion=!!event.matches;controls.enableDamping=!reducedMotion;if(reducedMotion){if(!exploring){camera.position.copy(wantedCamera);controls.target.copy(wantedTarget);}explosion=exploded?1:0;positionDirty=true;}schedule();}
 if(motionQuery?.addEventListener)motionQuery.addEventListener('change',motionChanged);else motionQuery?.addListener?.(motionChanged);
 function visibilityChanged(){if(document.hidden)stop();else{resize();schedule();}}
 document.addEventListener('visibilitychange',visibilityChanged);
 function lost(event){event.preventDefault();contextLost=true;stop();onError(new Error('Se perdió temporalmente el contexto WebGL.'));}
 function restored(){contextLost=false;last=0;if(ready){focusTopic(topic,{automatic:true});onReady({...loadInfo,restored:true});resize();schedule();}}
 canvas.addEventListener('webglcontextlost',lost,false);canvas.addEventListener('webglcontextrestored',restored,false);
 controls.addEventListener('change',schedule);controls.addEventListener('start',schedule);controls.addEventListener('end',schedule);
 try{
  const [gltf,metadata]=await Promise.all([new GLTFLoader().loadAsync('assets/model/aria-cnc.glb'),fetch('assets/model/pieces.json').then(r=>{if(!r.ok)throw new Error('No se pudo cargar el índice del modelo 3D.');return r.json();})]);const meta=new Map(metadata.map(p=>[p.id,p])),model=gltf.scene;group.add(model);let sourceBox=new THREE.Box3().setFromObject(model),size=sourceBox.getSize(new THREE.Vector3()),center=sourceBox.getCenter(new THREE.Vector3());scale=2.6/Math.max(size.x,size.z);model.scale.setScalar(scale);model.position.set(-center.x*scale,-sourceBox.min.y*scale,-center.z*scale);model.updateMatrixWorld(true);wholeBox.setFromObject(model);
  model.traverse(m=>{if(!m.isMesh)return;const info=meta.get(m.userData.pieceId)||meta.get(m.name);if(info){m.userData={...m.userData,...info};m.userData.groupId=info.assemblyGroup;}else m.userData.groupId=m.name;m.castShadow=true;m.receiveShadow=true;m.material=m.material.clone();const id=m.userData.groupId;
   // Presentation materials improve shape legibility; the archived source GLB is intact.
   if(id==='Tabla de dibujo'){m.material.color.set('#84979D');m.material.metalness=.12;m.material.roughness=.82;}
   else if(['rail_fixed','rail_slider','crossarm','crossrail','prop'].includes(id)){m.material.color.set('#087F8C');m.material.metalness=.03;m.material.roughness=.58;}
   else if(id==='holder'){m.material.color.set('#ED765E');m.material.metalness=.03;m.material.roughness=.52;}
   else if(id.startsWith('gear_')){m.material.color.set('#D6DAD5');m.material.metalness=.08;m.material.roughness=.45;}
   else if(m.userData.group==='Metal Case'){m.material.color.set('#82949C');m.material.metalness=.5;m.material.roughness=.42;}
   m.material.opacity=1;m.material.transparent=false;m.material.depthWrite=true;meshes.push(m);materials.push([m,m.material.clone()]);basePositions.set(m,m.position.clone());if(['rail_fixed','rail_slider','crossarm','crossrail','gear_1','gear_2','holder'].includes(id)||m.userData.group==='Metal Case'){const line=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry,24),new THREE.LineBasicMaterial({color:0x087f8c,transparent:true,opacity:.6}));line.visible=false;line.raycast=()=>{};m.add(line);m.userData.focusOutline=line;}if(!groupBoxes.has(id))groupBoxes.set(id,new THREE.Box3());groupBoxes.get(id).expandByObject(m);});
  for(const [id,b]of groupBoxes){let c=b.getCenter(new THREE.Vector3()),v=new THREE.Vector3(c.x*.28,.28,c.z*.28);if(id==='Tabla de dibujo')v.set(0,0,0);else if(id==='uno')v.set(-.1,.5,.45);else if(id.startsWith('uln_'))v.set(c.x*.3,.28,.55);else if(id==='pen')v.set(.35,.7,0);else if(id==='holder')v.set(.42,.27,0);else if(id==='crossrail')v.set(.15,.52,-.2);else if(id==='crossarm')v.set(.1,.25,-.1);else if(id==='rail_fixed')v.set(-.2,.03,0);else if(id==='rail_slider')v.set(-.38,.28,0);else if(id.startsWith('motor_'))v.set(c.x*.35,.38,c.z*.35);groupVectors.set(id,v.divideScalar(scale));}
  for(const m of meshes)explodeVectors.set(m,groupVectors.get(m.userData.groupId));ready=true;positionDirty=true;loadInfo={meshes:meshes.length,groups:groupBoxes.size,source:gltf.parser.json.asset.generator};focusTopic(CHAPTER_TOPICS[chapter],{automatic:true});if(!contextLost)onReady(loadInfo);
 }catch(e){dispose();onError(e);return staticWorld;}
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 const activePointers=new Set();
 function pointerDown(e){activePointers.add(e.pointerId);down=activePointers.size===1?[e.clientX,e.clientY]:null;}
 function pointerMove(e){if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)down=null;}
 function pointerUp(e){activePointers.delete(e.pointerId);}
 function pointerCancel(e){activePointers.delete(e.pointerId);down=null;}
 function select(e){if(!exploring||!ready||contextLost||!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;down=null;const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(meshes).find(h=>h.object.material.opacity>.2);const selected=hit?.object;selectedGroup=selected?.userData.groupId||null;styleMaterials();if(selected)onSelect({name:selected.userData.displayName||selected.name||'Componente CNC',detail:selected.userData.description||selected.userData.source||'Cuerpo del ensamblaje Fusion'});}
 canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerCancel);canvas.addEventListener('click',select);
 // Render only during a transition or interaction; background tabs do no 3D work.
 function animate(now){
  raf=null;if(disposed||contextLost||document.hidden)return;
  const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;let moving=false;
  if(ready){
   if(!exploring){const delta=camera.position.distanceToSquared(wantedCamera)+controls.target.distanceToSquared(wantedTarget);if(delta>1e-8&&!reducedMotion){const alpha=1-Math.exp(-dt*3.8);camera.position.lerp(wantedCamera,alpha);controls.target.lerp(wantedTarget,alpha);moving=true;}else{camera.position.copy(wantedCamera);controls.target.copy(wantedTarget);}}
   const wantedExplosion=exploded?1:0;if(Math.abs(wantedExplosion-explosion)>1e-5&&!reducedMotion){explosion+=(wantedExplosion-explosion)*(1-Math.exp(-dt*4));positionDirty=true;moving=true;}else if(explosion!==wantedExplosion){explosion=wantedExplosion;positionDirty=true;}
   if(positionDirty)applyExplosion();
  }
  const controlsMoved=controls.update();try{renderer.render(scene,camera);frames++;}catch(error){contextLost=true;stop();onError(error);return;}
  if(moving||(exploring&&controlsMoved))schedule();else last=0;
 }
 function dispose(){disposed=true;stop();ro?.disconnect();window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibilityChanged);if(motionQuery?.removeEventListener)motionQuery.removeEventListener('change',motionChanged);else motionQuery?.removeListener?.(motionChanged);canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointermove',pointerMove);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('pointercancel',pointerCancel);canvas.removeEventListener('click',select);controls.removeEventListener('change',schedule);controls.removeEventListener('start',schedule);controls.removeEventListener('end',schedule);controls.dispose();const geometries=new Set(),mats=new Set(),textures=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of(Array.isArray(o.material)?o.material:[o.material])){mats.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});for(const[,m]of materials)mats.add(m);geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();canvas.remove();host.classList.remove('exploring');}
 schedule();
 return{setCaptureZoom(v){camera.zoom=v;camera.updateProjectionMatrix();schedule();},setJourney(v){journey=v;},setChapter(i){const next=Math.max(0,Math.min(15,i));if(next===chapter)return;chapter=next;focusTopic(CHAPTER_TOPICS[chapter],{automatic:true});},focusTopic,setExploring,setExploded(v){exploded=!!v;if(ready)frameTopic();schedule();},reset(){exploded=false;setExploring(false);focusTopic('general');},dispose,getState(){return{ready:ready&&!contextLost,meshes:meshes.length,groups:groupBoxes.size,minOpacity:meshes.length?Math.min(...meshes.map(m=>m.material.opacity)):null,chapter,topic,journey,exploring,exploded,reducedMotion,contextLost,frames,animating:raf!==null,camera:camera.position.toArray(),target:controls.target.toArray(),focusedGroups:TOPICS[topic]?.ids||null};},getGroupPositions(){return[...groupBoxes].map(([id,b])=>({id,center:b.getCenter(new THREE.Vector3()).toArray()}));}};
}
