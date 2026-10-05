const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','Vary':'oai-authenticated-user-id','X-Content-Type-Options':'nosniff'}});
function database(env){if(!env.DB)throw new Error('Missing database');return env.DB;}
function canonicalId(id){let steps=0;while(typeof id==='string'&&Object.hasOwn(WINE_ALIASES,id)&&steps++<20)id=WINE_ALIASES[id];return id;}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname==='/api/favorites'){
  const user=request.headers.get('oai-authenticated-user-id');
  if(!user)return json({error:'请登录后使用收藏。'},401);
  try {
   const db=database(env);
   if(request.method==='GET'){const rows=(await db.prepare('SELECT wine_id AS wineId, vintage, created_at AS createdAt FROM favorites WHERE user_id = ? ORDER BY created_at DESC').bind(user).all()).results;const seen=new Set();return json({items:rows.map(r=>({...r,wineId:canonicalId(r.wineId)})).filter(r=>{const key=r.wineId+'|'+r.vintage;if(seen.has(key))return false;seen.add(key);return true})});}
   if(!['PUT','DELETE'].includes(request.method))return json({error:'Method not allowed'},405);
   if(request.headers.get('Origin')!==url.origin)return json({error:'请求来源无效。'},403);
   if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'请求格式无效。'},415);
   let body;try {body=await request.json()}catch{return json({error:'请求格式无效。'},400)}
   const wineId=canonicalId(body.wineId),vintage=body.vintage;
   if(!WINE_IDS.includes(wineId)||typeof vintage!=='string'||!(vintage==='NV'||/^\d{4}$/.test(vintage)&&+vintage>=1700&&+vintage<=new Date().getUTCFullYear()))return json({error:'请选择已收录的酒款和有效年份。'},400);
   if(request.method==='PUT')await db.prepare('INSERT INTO favorites (user_id,wine_id,vintage,created_at) VALUES (?,?,?,?) ON CONFLICT(user_id,wine_id,vintage) DO NOTHING').bind(user,wineId,vintage,new Date().toISOString()).run();
   else {const ids=[wineId,...Object.keys(WINE_ALIASES).filter(id=>canonicalId(id)===wineId)];await db.prepare('DELETE FROM favorites WHERE user_id = ? AND vintage = ? AND wine_id IN ('+ids.map(()=>'?').join(',')+')').bind(user,vintage,...ids).run();}
   return json({ok:true});
  }catch(error){console.error('Favorites unavailable',error);return json({error:'收藏暂时无法保存或读取，请稍后重试。'},503)}
 }
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
 const asset=ASSETS[url.pathname==='/'?'/index.html':url.pathname];
 if(!asset)return new Response('Not found',{status:404});
 const headers={'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Cache-Control':asset.immutable?'private, max-age=31536000, immutable':url.pathname==='/'||url.pathname==='/index.html'?'private, no-cache':'private, max-age=3600','ETag':asset.etag};
 if(request.headers.get('If-None-Match')===asset.etag)return new Response(null,{status:304,headers});
 const bytes=Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0));
 return new Response(request.method==='HEAD'?null:bytes,{headers});
}};
