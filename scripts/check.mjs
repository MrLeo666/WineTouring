import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {DatabaseSync} from 'node:sqlite';import worker from '../dist/server/index.js';
const sql=new DatabaseSync(':memory:');sql.exec(fs.readFileSync('drizzle/0000_daily_alex_power.sql','utf8'));
const env={DB:{prepare(query){return {bind(...args){const s=sql.prepare(query);return {async all(){return {results:s.all(...args)}},async run(){return s.run(...args)}}}}}}};
const api=(method,user,body,origin='https://wine.example')=>worker.fetch(new Request('https://wine.example/api/favorites',{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),Origin:origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})}),env);
const body={wineId:'palmer-grand',vintage:'1999'};
assert.equal((await api('GET',null)).status,401);
assert.equal((await api('PUT','A',body,'https://wrong.example')).status,403);
assert.equal((await api('PUT','A',{...body,wineId:'unknown'})).status,400);
assert.equal((await api('PUT','A',body)).status,200);await api('PUT','A',body);await api('PUT','A',{...body,vintage:'2000'});await api('PUT','A',{wineId:'selosse-exquise',vintage:'NV'});
assert.equal((await (await api('GET','A')).json()).items.length,3);
assert.equal((await (await api('GET','B')).json()).items.length,0);
await api('DELETE','B',body);assert.equal((await (await api('GET','A')).json()).items.length,3);
await api('DELETE','A',body);assert.equal((await (await api('GET','A')).json()).items.length,2);
const ctx=vm.createContext({});for(const file of ['data.js','deep-data.js','pauillac-data.js','margaux-data.js','label-data.js','national-data.js','angelus-data.js','estate-data.js','national-labels.js','apostles-data.js','manga-data.js','france-expansion.js','saintemilion-completion.js'])vm.runInContext(fs.readFileSync('web/'+file,'utf8'),ctx);
assert.equal(vm.runInContext('APOSTLES.length',ctx),12);assert.equal(vm.runInContext('new Set(APOSTLES.map(a=>a.id)).size',ctx),12);
assert.equal(vm.runInContext('APOSTLES.filter(a=>a.placeId&&!NODES.some(n=>n.id===a.placeId)).length',ctx),0);
const builtHTML=await(await worker.fetch(new Request('https://wine.example/'),env)).text();const bundlePath=builtHTML.match(/script.src='([^']+)'/)[1];
for(const file of ['index.html',bundlePath.slice(1),'labels/margaux-2023-label.webp','labels/se-sansonnet.png']){const r=await worker.fetch(new Request('https://wine.example/'+file),env);assert.equal(r.status,200);assert.ok((await r.arrayBuffer()).byteLength>0)}
console.log('PASS: private favorites, idempotency, independent vintages, NV, per-user isolation, delete isolation, catalog and assets');

const aliases=JSON.parse(fs.readFileSync('research/wine-id-aliases.json'));const [oldId,newId]=Object.entries(aliases)[0];
for(const user of ['A','B'])for(const id of [oldId,newId])sql.prepare('INSERT INTO favorites VALUES (?,?,?,?)').run(user,id,'2001','2026-09-29');
assert.equal((await (await api('GET','A')).json()).items.filter(x=>x.wineId===newId&&x.vintage==='2001').length,1);
await api('DELETE','A',{wineId:newId,vintage:'2001'});
assert.equal(sql.prepare('SELECT count(*) AS n FROM favorites WHERE user_id=? AND wine_id IN (?,?)').get('A',oldId,newId).n,0);
assert.equal((await (await api('GET','B')).json()).items.filter(x=>x.wineId===newId&&x.vintage==='2001').length,1);
console.log('PASS: merged wine IDs retain and deduplicate existing favorites; deletion and user isolation');
assert.equal((await api('PUT','National',{wineId:'petrus-grand',vintage:'2013'})).status,200);
for(const wineId of ['angelus-grand','angelus-carillon','angelus-no3','angelus-tempo']){
 assert.equal((await api('PUT','Angelus',{wineId,vintage:'2020'})).status,200);
 assert.equal((await api('PUT','Angelus',{wineId,vintage:'2021'})).status,200);
}
assert.equal((await(await api('GET','Angelus')).json()).items.length,8);
assert.equal(vm.runInContext('NODES.length===new Set(NODES.map(n=>n.id)).size',ctx),true);
console.log('PASS: four Angélus wines accepted by favorites API with independent vintages; unique catalog IDs');
