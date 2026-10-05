import {importMariage} from './import-mariage.mjs';
import {enrichManga} from './enrich-manga.mjs';
import fs from 'node:fs';import vm from 'node:vm';import crypto from 'node:crypto';
const context=vm.createContext({});for(const f of ['data','deep-data','pauillac-data','margaux-data','label-data','apostles-data'])vm.runInContext(fs.readFileSync('web/'+f+'.js','utf8'),context);
const original=vm.runInContext('NODES.filter(n=>n.kind==="wine").map(n=>({...n,producer:NODES.find(p=>p.id===n.producerId)?.en}))',context);
const apostles=vm.runInContext('APOSTLES',context);
const rows=JSON.parse(fs.readFileSync('research/candidate-index.json','utf8'));
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/&/g,'et').replace(/[’']/g,'').replace(/\(drc\)/g,'').replace(/premier cru/g,'1er cru').replace(/\bgrand cru\b/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
const producerAliases={
 'rauzan despagne':'despagne','opus one winery':'opus one','casa vinicola dangelo':'dangelo','chateau latour haut brion':'chateau la tour haut brion','drc':'romanee conti','domaine de la romanee conti':'romanee conti','domaine romanee conti':'romanee conti','chateau pichon longueville baron':'chateau pichon baron','domaine pegau':'pegau','domaine du pegau':'pegau','michel colin deleger':'michel colin deleger','domaine comte georges de vogue':'comte georges de vogue','domaine robert groffier':'robert groffier','domaine faiveley':'faiveley','domaine santa duc':'santa duc','casa vinicola d angelo':'dangelo','d angelo':'dangelo','domaine armand rousseau':'armand rousseau','chateau beaucastel':'chateau de beaucastel','domaine robert arnoux':'robert arnoux','domaine meo camuzet':'meo camuzet','domaine francois raveneau':'francois raveneau','domaine william fevre':'william fevre','chateau petrus':'petrus','chateau lagrange sa suntory':'chateau lagrange','unknown':'unknown'};
const prod=p=>producerAliases[norm(p)]||norm(p).replace(/^domaine /,'');
const wineAliases={
 'chateau pichon longueville baron':'chateau pichon baron','chateau petrus':'petrus','pommard rugiens bas':'pommard les rugiens bas','bonnes mares':'bonnes mares','chateau latour haut brion':'chateau la tour haut brion','haut carles':'chateau haut carles','chambolle musigny 1er cru les amoureuses':'chambolle musigny les amoureuses','chateauneuf du pape cuvee da capo':'chateauneuf du pape cuvee da capo','sine qua non the inaugural eleven confessions syrah':'the inaugural eleven confessions syrah','jacques selosse cuvee exquise':'cuvee exquise sec','cuvee exquise':'cuvee exquise sec','ferrer bobet seleccio especial':'seleccio especial'};
function wineName(w,p){let n=norm(w.split(' · ')[0]);const q=norm(p);if(n.startsWith(q+' '))n=n.slice(q.length+1);if(n.endsWith(' '+q)&&n!==q)n=n.slice(0,-q.length-1);return wineAliases[n]||n}
const key=(name,producer)=>norm(name)==='almaviva'?'almaviva|almaviva':prod(producer)+'|'+wineName(name,producer);
const aliases=new Map();for(const w of [...original,...apostles])aliases.set(key(w.en,w.producer),w);
const places=[
 [/chambolle|bonnes mares|musigny/,47.187,4.953,'法国 · 勃艮第 · Chambolle-Musigny','burgundy'],
 [/grands echezeaux|echezeaux|vosne|romanee|richebourg|la tache/,47.163,4.953,'法国 · 勃艮第 · Vosne-Romanée / Flagey-Échezeaux','vosne'],
 [/gevrey|chambertin|clos saint jacques/,47.222,4.973,'法国 · 勃艮第 · Gevrey-Chambertin','gevrey'],
 [/chablis/,47.815,3.8,'法国 · 勃艮第 · Chablis','burgundy'],
 [/puligny|chevalier montrachet|batard montrachet|bienvenues/,46.946,4.752,'法国 · 勃艮第 · Puligny-Montrachet','burgundy'],
 [/chassagne|montrachet/,46.937,4.728,'法国 · 勃艮第 · Chassagne / Puligny','burgundy'],
 [/meursault/,46.979,4.77,'法国 · 勃艮第 · Meursault','burgundy'],
 [/clos de vougeot|clos vougeot/,47.176,4.957,'法国 · 勃艮第 · Vougeot','burgundy'],
 [/clos de la roche|clos saint denis|morey saint denis|clos des lambrays|clos de tart/,47.197,4.962,'法国 · 勃艮第 · Morey-Saint-Denis','burgundy'],
 [/pommard/,47.009,4.796,'法国 · 勃艮第 · Pommard','pommard'],
 [/nuits saint georges/,47.134,4.949,'法国 · 勃艮第 · Nuits-Saint-Georges','burgundy'],
 [/corton|aloxe|pernand/,47.077,4.861,'法国 · 勃艮第 · Corton','burgundy'],
 [/volnay/,47.002,4.781,'法国 · 勃艮第 · Volnay','burgundy'],
 [/saint aubin/,46.952,4.71,'法国 · 勃艮第 · Saint-Aubin','burgundy'],
 [/santenay/,46.91,4.697,'法国 · 勃艮第 · Santenay','burgundy'],
 [/marsannay/,47.269,4.989,'法国 · 勃艮第 · Marsannay','burgundy'],
 [/bourgogne|vire clesse/,47,4.8,'法国 · 勃艮第','burgundy'],
 [/chateauneuf du pape/,44.057,4.831,'法国 · 罗讷河谷 · Châteauneuf-du-Pape','rhone'],
 [/gigondas/,44.164,5.004,'法国 · 罗讷河谷 · Gigondas','rhone'],
 [/cote rotie|condrieu|hermitage|crozes|cornas|cotes du rhone/,45.1,4.8,'法国 · 罗讷河谷','rhone'],
 [/barolo|cannubi|monfortino/,44.61,7.943,'意大利 · 皮埃蒙特 · Barolo',null],
 [/barbaresco/,44.724,8.081,'意大利 · 皮埃蒙特 · Barbaresco',null],
 [/brunello|montalcino/,43.057,11.49,'意大利 · 托斯卡纳 · Montalcino',null],
 [/chianti/,43.58,11.32,'意大利 · 托斯卡纳 · Chianti',null],
 [/montepulciano d abruzzo/,42.2,13.8,'意大利 · 阿布鲁佐',null],
 [/soave|amarone|valpolicella/,45.47,11.15,'意大利 · 威尼托',null],
 [/alto adige/,46.47,11.25,'意大利 · Alto Adige',null],
 [/riesling|scharzhofberger|urziger/,null,null,'产地待核验',null],
 [/napa valley/,38.5,-122.3,'美国 · 加利福尼亚 · Napa Valley',null],
 [/sauternes/,44.534,-.34,'法国 · 波尔多 · Sauternes','bordeaux'],
 [/margaux/,45.04,-.675,'法国 · 波尔多 · Margaux','margaux-aoc'],
 [/pauillac/,45.2,-.75,'法国 · 波尔多 · Pauillac','pauillac'],
];
const estatePlaces=[
 [/chateau (mouton|lafite|latour$|pichon|lynch|grand puy|pontet|cler[c]? milon|duhart)/,45.2,-.75,'法国 · 波尔多 · Pauillac','pauillac'],
 [/chateau (palmer|boyd cantenac|giscours|brane cantenac|kirwan|margaux)/,45.04,-.675,'法国 · 波尔多 · Margaux','margaux-aoc'],
 [/chateau (leoville|talbot|lagrange|branaire|beychevelle)/,45.158,-.742,'法国 · 波尔多 · Saint-Julien','bordeaux'],
 [/chateau (cos d estournel|montrose|calon segur)/,45.263,-.772,'法国 · 波尔多 · Saint-Estèphe','bordeaux'],
 [/chateau (lafleur|le pin|nenin|la fleur de gay|la croix de gay)|^petrus$/,44.932,-.2,'法国 · 波尔多 · Pomerol','pomerol'],
 [/chateau (cheval blanc|ausone|angelus|pavie|lucia|quinault)/,44.895,-.157,'法国 · 波尔多 · Saint-Émilion','bordeaux'],
 [/chateau (haut brion|la mission haut brion|pape clement|la tour haut brion)|chapelle de la mission/,44.807,-.61,'法国 · 波尔多 · Pessac-Léognan','bordeaux'],
 [/chateau d yquem|chateau dyquem/,44.543,-.328,'法国 · 波尔多 · Sauternes','bordeaux'],
 [/^chateau /,null,null,'产地待核验',null],
];
const collected=new Map();
for(const r of rows){const k=key(r.name,r.producer);let n=collected.get(k);if(!n){const existing=aliases.get(k);n=existing?{...existing}:{id:'manga-'+crypto.createHash('sha256').update(k).digest('hex').slice(0,12),name:r.name,en:r.name,producer:r.producer,type:'葡萄酒',place:'产地待核验',lat:null,lng:null};n.manga=[];n.mangaKey=k;n.reviewStatus='secondary-index';n.geoPrecision=existing?'既有地图关联点':'待定位';if(!existing){const normalized=wineName(r.name,r.producer);const geo=[...places,...estatePlaces].find(g=>g[0].test(normalized));if(geo){[n.lat,n.lng,n.place,n.placeId]=geo.slice(1);n.geoPrecision=n.lat==null?'待定位':'酒标产区示意点 · 待逐庄核验';}}collected.set(k,n)}const occurrence={series:'original',volume:r.volume,vintage:r.vintage,source:r.source,status:'secondary-index'};if(!n.manga.some(a=>a.volume===r.volume&&a.vintage===r.vintage))n.manga.push(occurrence);}
for(const a of apostles){const k=key(a.en,a.producer);let n=collected.get(k);if(!n){n={...a,manga:[],mangaKey:k,geoPrecision:'产区示意点'};collected.set(k,n)}Object.assign(n,a);n.reviewStatus='cross-checked';if(!n.manga.some(x=>x.vintage===a.vintage))n.manga.push({series:'original',volume:[6,8,11,15,18,20,23,27,30,34,39,44][a.apostle-1],vintage:a.vintage,source:'https://comic-gourmet.com/the-drop-of-god-apostles/',status:'cross-checked'});}
const wines=[...collected.values()];
// Exclude explicit spirits from a grape-wine catalog; retain them in research candidates.
const excluded=wines.filter(n=>/fine de bourgogne|marc de|cognac|armagnac/i.test(n.en));
const final=wines.filter(n=>!excluded.includes(n));
const geographicFacts=JSON.parse(fs.readFileSync('research/source-geography.json','utf8'));
const broadRegions={bordeaux:[44.95,-.55,'法国 · 波尔多','bordeaux'],burgundy:[47,4.8,'法国 · 勃艮第','burgundy'],champagne:[49.04,3.96,'法国 · 香槟',null],"napa valley":[38.5,-122.3,'美国 · 纳帕谷',null],california:[36.7,-119.5,'美国 · 加利福尼亚',null],tuscany:[43.4,11.3,'意大利 · 托斯卡纳',null],piedmont:[44.7,8,'意大利 · 皮埃蒙特',null],veneto:[45.5,11.7,'意大利 · 威尼托',null],mosel:[49.95,6.9,'德国 · 摩泽尔',null],alsace:[48.1,7.35,'法国 · 阿尔萨斯','alsace'],rioja:[42.46,-2.45,'西班牙 · 里奥哈',null],priorat:[41.15,.89,'西班牙 · 普里奥拉托',null],rhone:[44.65,4.8,'法国 · 罗讷河谷','rhone'],loire:[47.3,.7,'法国 · 卢瓦尔河谷','loire'],basilicata:[40.9,15.7,'意大利 · 巴斯利卡塔',null],marche:[43.2,13.3,'意大利 · 马尔凯',null],"alto adige":[46.47,11.25,'意大利 · 上阿迪杰',null],friuli:[46.05,13.2,'意大利 · 弗留利',null],languedoc:[43.3,3.1,'法国 · 朗格多克','languedoc'],martinborough:[-41.22,175.45,'新西兰 · 马丁堡',null],mendoza:[-33,-68.8,'阿根廷 · 门多萨',null],maipo:[-33.6,-70.7,'智利 · 迈坡谷',null],yamanashi:[35.66,138.57,'日本 · 山梨',null],tokaj:[48.1,21.4,'匈牙利 · 托卡伊',null],douro:[41.2,-7.5,'葡萄牙 · 杜罗河',null]};
for(const n of final){
 if(n.lat!=null&&!n.place){n.place='既有地图产地';}
 const f=geographicFacts.find(f=>key(f.title.replace(/\s+(?:\d{4}|NV)$/,''),f.producer)===n.mangaKey);
 if(f){n.country=f.country;if(n.lat==null&&f.region){const g=broadRegions[norm(f.region)];if(g){[n.lat,n.lng,n.place,n.placeId]=g;n.geoPrecision='大产区示意点 · 依据二手资料，待逐庄核验';n.geoSource=f.source;}}}
 for(const a of n.manga)if(n.id==='lafite-grand'&&a.volume===44){a.conflict='另一酒单列为1985；年份待核验原页';a.otherSource='https://kaminoshizuku.com/kami044/';}
}

const review=enrichManga(final,rows,key,original);
const originalUniqueWines=final.length;
const sequel=importMariage(final,original,key);
// Reconcile the concurrently expanded national catalog after original corrections.
vm.runInContext(fs.readFileSync('web/national-data.js','utf8'),context);
const national=vm.runInContext('NODES.filter(n=>n.kind==="wine").map(n=>({...n,producer:NODES.find(p=>p.id===n.producerId)?.en}))',context);
const redirects=JSON.parse(fs.readFileSync('research/wine-id-aliases.json'));
for(const n of final){const target=national.find(w=>w.id===redirects[n.id]);if(target){const facts={manga:n.manga,mangaKey:n.mangaKey,japaneseNames:n.japaneseNames,corrections:n.corrections,reviewStatus:n.reviewStatus};Object.assign(n,target,facts,{geoPrecision:'既有地图关联点',place:target.place||n.place});}}
const stats={review,sequel,originalUniqueWines,sourceOccurrences:rows.length+sequel.sourceOccurrences,volumes:70,uniqueWines:final.length,existingMatches:final.filter(w=>national.some(n=>n.id===w.id)).length,mapped:final.filter(w=>w.lat!=null).length,pendingLocations:final.filter(w=>w.lat==null).length,excludedSpirits:excluded.map(n=>n.en),scope:'原作44卷＋最终章26卷 · 公开酒单索引，非全量逐页核验',updated:'2026-09-29'};
fs.writeFileSync('web/manga-data.js','// Factual index only. Source taste descriptions and ratings are not imported.\nconst MANGA_WINES='+JSON.stringify(final,null,2)+';\nconst MANGA_STATS='+JSON.stringify(stats)+';\nconst MANGA_BY_ID=Object.fromEntries(MANGA_WINES.map(n=>[n.id,n]));\n');
fs.writeFileSync('research/import-status.json',JSON.stringify(stats,null,2));console.log(stats);
