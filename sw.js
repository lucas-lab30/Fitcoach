const V="fitfuel-v5";
const ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./logo-emblem.png","./logo-full.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{
    const copy=res.clone();caches.open(V).then(c=>c.put(r,copy));return res;
  }).catch(()=>r.mode==="navigate"?caches.match("./index.html"):undefined)));
});
