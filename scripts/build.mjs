import {transformSync} from 'esbuild';import crypto from 'node:crypto';import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const assets={};const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else assets['/'+path.relative('web',p)]={type:types[path.extname(p)]||'application/octet-stream',data:fs.readFileSync(p).toString('base64')};}}walk('web');
const sourceHTML=fs.readFileSync('web/index.html','utf8');
const scripts=[...sourceHTML.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
const combined=scripts.map(f=>fs.readFileSync('web/'+f,'utf8')).join('\n;\n')+'\nwindow.__atlasReady=true;';
const bundle=transformSync(combined,{minifyWhitespace:true,minifySyntax:true,target:'es2020',legalComments:'inline'}).code;
const hash=crypto.createHash('sha256').update('identity-v2:'+bundle).digest('hex').slice(0,16);
assets['/atlas-'+hash+'.js']={type:types['.js'],data:Buffer.from(bundle).toString('base64'),immutable:true};
let html=sourceHTML.replace(/<script src="([^"]+)"><\/script>/g,'');
html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,file)=>'<style>'+fs.readFileSync('web/'+file,'utf8').replace(/url\(images\//g,'url(vendor/images/')+'</style>');
const boot=fs.readFileSync('web/boot.js','utf8').replaceAll('__BUNDLE_URL__','/atlas-'+hash+'.js');
html=html.replace('</body>','<script>'+boot+'</script></body>');
html=html.replace('<main>','<div id="boot-status" role="status" style="padding:12px 24px;background:#fff4d9;color:#442b22">正在加载地图和酒单… <a href="" data-boot-retry hidden>重新加载</a></div><main>');
assets['/index.html'].data=Buffer.from(html).toString('base64');
// The page uses the combined bundle only; do not embed duplicate source scripts.
for(const file of scripts)delete assets['/'+file];
delete assets['/boot.js'];
for(const [name,asset] of Object.entries(assets)){
 const raw=Buffer.from(asset.data,'base64');asset.etag='"'+crypto.createHash('sha256').update(raw).digest('hex').slice(0,24)+'"';

}
fs.mkdirSync('research',{recursive:true});fs.writeFileSync('research/performance-build.json',JSON.stringify({scriptRequestsBefore:scripts.length,scriptRequestsAfter:1,bundleBytes:Buffer.byteLength(bundle),bundleTransferBytes:Buffer.from(assets['/atlas-'+hash+'.js'].data,'base64').length,htmlTransferBytes:Buffer.from(assets['/index.html'].data,'base64').length},null,2));
const ctx=vm.createContext({});for(const name of ['data.js','deep-data.js','pauillac-data.js','margaux-data.js','label-data.js','national-data.js','angelus-data.js','estate-data.js','national-labels.js','apostles-data.js','manga-data.js','france-expansion.js','saintemilion-completion.js'])vm.runInContext(fs.readFileSync('web/'+name,'utf8'),ctx);
const ids=vm.runInContext('[...NODES.filter(n=>n.kind==="wine").map(n=>n.id),...APOSTLES.map(n=>n.id),...MANGA_WINES.map(n=>n.id)]',ctx);
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});
fs.writeFileSync('dist/server/index.js',`const ASSETS=${JSON.stringify(assets)};\nconst WINE_IDS=${JSON.stringify(ids)};\nconst WINE_ALIASES=${fs.readFileSync('research/wine-id-aliases.json','utf8')};\n`+fs.readFileSync('worker/index.js','utf8'));
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');fs.cpSync('drizzle','dist/.openai/drizzle',{recursive:true});console.log('Built worker with '+Object.keys(assets).length+' assets and '+ids.length+' wines');
