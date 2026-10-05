// Reproducible import of verified directories; preserves existing canonical wine IDs.
const fs=require('fs'),vm=require('vm');const root='research/france-expansion/';const read=n=>JSON.parse(fs.readFileSync(root+n+'.json'));const c=vm.createContext({});for(const f of ['data','deep-data','pauillac-data','margaux-data','label-data','national-data','angelus-data','estate-data','national-labels','apostles-data','manga-data'])vm.runInContext(fs.readFileSync('web/'+f+'.js','utf8'),c);const old=vm.runInContext('NODES',c),manga=vm.runInContext('MANGA_WINES',c);const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/chateau|domaine|maison|champagne/g,'').replace(/[^a-z0-9]/g,'');const slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const nodes=[],profiles={},sources={},updates={},groups={gccRed:[],gccSweet:[],saintEmilion:[],graves:[],champagne:[],other:[]};const all=()=>[...old,...nodes];const byId=id=>all().find(n=>n.id===id);const source=(title,url)=>{let key='fr-source-'+Object.keys(sources).length;sources[key]=[title,url];return key};
function place(id,parent,name,en,lat,lng,summary){nodes.push({id,parent,name,en,lat,lng,zoom:12,kind:'aoc',directory:true,nationalDirectory:true,deep:true,overview:false,summary,grapes:'品种按酒款分别记录',soil:'法定产区内地块条件各异',climate:'具体年份与地块信息请参阅酒款来源。',lesson:'酒庄地址、葡萄园地块和酒标法定产地是不同概念。',source:[]});}
place('haut-medoc-aoc','medoc','上梅多克','Haut-Médoc',45.0,-0.68,'上梅多克法定产地；五家 1855 列级庄位于此 AOC。');
place('sauternes','bordeaux','苏玳','Sauternes',44.534,-0.341,'以贵腐甜白著称；1855 甜白分级与红酒分级分开记录。');
place('barsac','bordeaux','巴萨克','Barsac',44.604,-0.315,'巴萨克甜白产区；酒庄的甜白与干白酒款应分别确认法定名称。');
place('champagne-aoc','champagne','香槟 AOC','Champagne AOC',49.04,3.96,'香槟酒庄与生产者；酒庄所在地不等于其全部葡萄园位置。');
place('alsace-aoc','alsace','阿尔萨斯白葡萄酒与酒庄','Alsace',48.05,7.3,'以生产者为入口认识阿尔萨斯白葡萄酒、具名园地与不同甜度。');
place('meursault','beaune','默尔索','Meursault',46.978,4.769,'勃艮第伯恩丘的村庄产区；不同生产者与具名园地分别收录。');
place('puligny','beaune','普利尼-蒙哈榭','Puligny-Montrachet',46.945,4.754,'村庄 AOC 与周边一级园、特级园的名称需分别阅读。');
place('chablis','burgundy','夏布利','Chablis',47.815,3.799,'夏布利产区；酒款等级与园地按具体名称确认。');
place('vouvray','touraine','武弗雷','Vouvray',47.414,0.8,'以白诗南为核心；同一园地可能生产不同甜度的酒款。');
place('muscadet','loire','慕斯卡黛 · 南特产区','Muscadet / Nantais',47.16,-1.4,'南特葡萄园的生产者入口；Muscadet、Sèvre et Maine 等法定名称以具体酒标为准。');nodes[nodes.length-1].kind='subregion';
const overrides={'marquisdalesmebecker':'marquis-dalesme','pichonbaron':'pichon-baron','cosdestournel':'cos-destournel','hautbrion':'haut-brion','pape clement':'pape-clement'};
function estate({name,parent,sourceKeys,intro,history=[],tier='生产者',id,details=[]}){let e=all().find(n=>n.producer&&norm(n.en)===norm(name));id=e?.id||id||overrides[norm(name)]||slug(name.replace(/^(Château|Domaine|Champagne|Maison)\s+/i,''));if(byId(id)&&!e)e=byId(id);const p=byId(parent);if(!p)throw Error('Unknown parent '+parent);if(!e){e={id,parent,name,en:name,producer:true,estate:true,national:true,mapLocated:false,lat:p.lat,lng:p.lng,zoom:13,tier,classificationGroup:tier,summary:intro,profile:intro,locationNote:'地图仅定位至关联产区，酒庄入口与葡萄园边界尚未核实。',source:sourceKeys,grapes:'详见具体酒款',soil:'酒庄可能跨多个园地经营',climate:'以具体产区与年份资料为准',lesson:'先区分生产者、酒款和法定产地。'};nodes.push(e);}else{updates[e.id]={...(updates[e.id]||{}),source:[...new Set([...(e.source||[]),...sourceKeys])]};}
profiles[id]={intro,history,sources:sourceKeys.map(k=>sources[k]?.[1]).filter(Boolean),details,coverage:history.length||details.length?'已核实基础档案':'已核实名录；详细历史待补充'};return e;}
const wineMatches=[];
function wine(e,{en=e.en,name=en,appellation=e.parent,labelText,tier='酒庄同名主牌',type='红葡萄酒',sourceKeys=e.source,grapes='具体品种与比例以相应年份技术表为准',summary,matchId}){let w=all().find(w=>w.kind==='wine'&&w.producerId===e.id&&norm(w.en)===norm(en));if(w)return w;let ms=manga.filter(w=>(norm(w.en)===norm(en)||(norm(e.en+' '+w.en)===norm(en)))&&(norm(w.producer)===norm(e.en)||norm(w.en)===norm(e.en)));if(matchId)ms=manga.filter(w=>w.id===matchId);if(ms.length>1)throw Error('Ambiguous manga '+en);let m=ms[0];let id=m?.id||e.id+'-'+slug(en===e.en?'grand':en);if(byId(id))return byId(id);w={id,parent:e.id,producerId:e.id,appellationId:appellation,kind:'wine',name,en,lat:e.lat,lng:e.lng,zoom:16,mapLocated:false,type,tier,labelText:labelText||en,summary:summary||`${en} · ${labelText||type}。与酒庄档案共用生产者入口；具体年份可分别收藏。`,grapes,soil:'地块细节以酒庄资料为准。',climate:'年份背景为区域学习资料，并非本款独立评分。',lesson:'收藏时选择实际瓶身年份；酒庄分级不会自动延伸至其他酒款。',labelLesson:'法定名称、颜色与酒款身份以该年份酒标为准；未核验的信息不以其他酒款资料替代。',source:sourceKeys};nodes.push(w);if(m)wineMatches.push({id,estate:e.id,en});return w;}
const gccSource=source('1855 列级庄委员会 · 按产区名录','https://gcc-1855.fr/the-1855-grand-cru-classification/the-gcc-1855-classification-by-appellation/');const bdxSource=source('波尔多葡萄酒协会 · 1855 名录','https://www.bordeaux.com/en/classifications/classifications-1855/');const regionMap={'Pauillac':'pauillac','Margaux':'margaux-aoc','Pessac':'pessac','Saint-Julien':'saintjulien','Saint-Estèphe':'saintestephe','Haut-Médoc':'haut-medoc-aoc','Sauternes':'sauternes','Barsac':'barsac'};
for(let row of read('gcc-list')){let name=row.name.toLowerCase().replace(/(^|[\s’'-])(\p{L})/gu,(_,a,b)=>a+b.toUpperCase()).replace(/^Château De /,'Château de ').replace(/^Château D’/,'Château d’');let sweet=['Sauternes','Barsac'].includes(row.place);let p=regionMap[row.place];let tier='1855 '+row.rank;let e=estate({name,parent:p,sourceKeys:[gccSource],intro:`${name} 位于 ${row.place}，列入 1855 ${sweet?'苏玳／巴萨克甜白':'红葡萄酒'}分级的 ${row.rank}。`,tier});(sweet?groups.gccSweet:groups.gccRed).push(e.id);if(!all().some(w=>w.kind==='wine'&&w.producerId===e.id))wine(e,{labelText:row.place+' AOC',type:sweet?'甜白葡萄酒':'红葡萄酒',sourceKeys:[gccSource],tier:'酒庄同名主牌 · '+tier});}
// The committee page omits Las Cases; cross-check against the CIVB list.
groups.gccRed.push('leoville-las-cases');updates['leoville-las-cases']={source:[...byId('leoville-las-cases').source,bdxSource]};
const seSource=source('圣埃美隆葡萄酒协会 · 2022 分级完整名录','https://vins-saint-emilion.com/en/welcome-in-the-vineyard/the-2022-classification/');
for(let [i,x] of read('stemilion-profiles').entries()){let name=x.name.replace(/ \(A\)$/,'');let tier=i<14?'2022 Premier Grand Cru Classé'+(/Figeac|Château Pavie$/.test(name)?' A':''):'2022 Grand Cru Classé';let keys=[seSource];if(x.url?.includes('/castle/'))keys.push(source(name+' · 产区协会档案',x.url));let details=[];if(x.address)details.push(['酒庄地址',x.address]);if(x.area)details.push(['协会所列面积',x.area+' 公顷；统计口径以协会档案为准，非实时土地登记']);if(x.varieties)details.push(['葡萄园种植品种',x.varieties+'（种植比例，不是每个年份的调配比例）']);let e=estate({name,parent:'saintemilion',sourceKeys:keys,tier,intro:`${name} 是圣埃美隆的 ${tier} 酒庄。下方列出协会核实的地址与葡萄园资料；酒庄详细沿革仍待补充。`,details});groups.saintEmilion.push(e.id);wine(e,{labelText:'Saint-Émilion Grand Cru AOC',sourceKeys:keys,tier:'酒庄同名主牌 · '+tier});}
const graveIntros=[
'Jean de Pontac 于 1525 年建立葡萄酒庄。Haut-Brion 的历史与早期英国市场、“New French Claret”的形成紧密相连；同时列入 1855 与格拉夫分级。',
'坐落于 Cadaujac，庄园以古老橡树园景为特色，兼产红葡萄酒和干白。1979 年由 Lucien Lurton 收购，2010 年建成新酒窖。',
'与本笃会修士的历史相连，是佩萨克-雷奥良历史悠久的庄园之一。Perrin 家族自 1956 年经营，红、白葡萄酒均是酒庄的重要组成。',
'被林地环绕的 Léognan 庄园，早期名为 Chivaley。1983 年 Bernard 家族收购后持续扩建、重植与改造酒窖，兼产红酒和干白。',
'位于 Villenave-d’Ornon，由 INRAE 持有。酒庄把葡萄种植研究与生产结合，开展农业生态与农林复合实践，兼产红酒和干白。',
'André Lurton 于 1967 年开始租赁经营、1972 年购入葡萄园，1992 年进一步购入城堡和酒窖。与 Château Couhins 为不同档案。',
'庄园原名 Gardière，de Fieuzal 家族为其留下今天的名称。1995 年重新整合 Haut-Gardère 葡萄园，2001 年由 Quinn 家族收购。',
'以红葡萄酒为主的历史酒庄；19 世纪在 Alcide Bellot des Minières 时期建立声誉，1955 年后由 Sanders 家族修复发展。Wilmers 家族于 1998 年收购。',
'以庭院里中世纪堡垒遗存的塔楼命名。Alfred Kressmann 于 1930 年收购，金色条纹酒标自 1934 年沿用；红、白酒均列级。',
'酒名纪念 Malartic 海军将领。Bonnie 家族于 1996 年末收购后改造庄园与重力式酿造设施；红酒和干白均属于格拉夫列级酒。',
'名称源于 17 世纪传教修会，随后经历 Chiapella、Woltner 家族经营。现为 Domaine Clarence Dillon 旗下庄园；La Tour Haut-Brion 的葡萄园自 2006 年并入，Laville Haut-Brion 自 2009 年改名为 La Mission Haut-Brion Blanc。',
'位于林地中的古老庄园，Bethmann 家族自 19 世纪持有。红、白葡萄酒均列级，建筑与周围林地是酒庄历史的一部分。',
'以 1305 年当选教皇的 Clement V 命名，曾长期属于波尔多总主教产业。红葡萄酒与干白分别保有自己的产品身份。',
'名称与 18 世纪苏格兰商人 George Smith 有关。Cathiard 家族修复塔楼、庄园建筑及地下酒窖，并设立自有制桶工坊。'
];
const graveYears=[['1525','Jean de Pontac 建立葡萄酒庄。'],['1979','Lucien Lurton 收购。'],['1956','Perrin 家族开始经营。'],['1983','Bernard 家族收购。'],null,['1972','André Lurton 购入葡萄园。'],['2001','Quinn 家族收购。'],['1998','Wilmers 家族收购。'],['1930','Alfred Kressmann 收购。'],['1996','Bonnie 家族收购。'],['2009','Laville Haut-Brion 更名为 La Mission Haut-Brion Blanc。'],null,['1305','酒庄名称所纪念的 Clement V 当选教皇。'],null];
for(let [i,x] of read('graves-profiles').entries()){let key=source(x.name+' · 佩萨克-雷奥良协会',x.url);let e=estate({name:x.name,parent:'pessac',sourceKeys:[key],intro:graveIntros[i],history:graveYears[i]?[graveYears[i]]:[],tier:'Cru Classé de Graves · 分级须区分红／白酒'});groups.graves.push(e.id);let existing=all().filter(w=>w.kind==='wine'&&w.producerId===e.id);if(!existing.length)wine(e,{labelText:'Pessac-Léognan AOC',tier:'酒庄同名主牌 · 红葡萄酒',en:e.en+' Rouge',sourceKeys:[key],matchId:manga.find(w=>norm(w.en)===norm(e.en)&&norm(w.producer)===norm(e.en))?.id});if(![7].includes(i)&&!existing.some(w=>/Blanc|白/.test(w.en+' '+w.name)))wine(e,{en:e.en+' Blanc',labelText:'Pessac-Léognan AOC',tier:'酒庄同名干白',type:'白葡萄酒',sourceKeys:[key]});}
// Champagne foundation years are association-listed historical dates; avoid conflating person/brand establishment.
for(let x of read('champagne-parsed')){let key=source(x.name+' · 香槟酒商协会档案',x.url);let history=x.year&&!['Dom Pérignon','Henri Giraud'].includes(x.name)?[[x.year,'香槟酒商协会所列创立年份。']]:[];let details=[['协会所列地址',x.address.replace(/\n/g,' · ')]];let e=estate({name:x.name,parent:'champagne-aoc',sourceKeys:[key],intro:`${x.name} 是香槟酒商协会名录中的香槟酒庄／品牌。总部或接待地址位于 ${x.address.split('\n').at(-1)}；葡萄来源可能跨多个村庄。`,history,tier:'Champagne · 酒庄／品牌',details});groups.champagne.push(e.id);}
const bioMap={Alsace:'alsace-aoc',Bourgogne:'burgundy',Champagne:'champagne-aoc',Provence:'provence','Languedoc-Roussillon':'languedoc','Vallée de la Loire':'loire','Vallée du Rhône':'rhone','Vallée Du Rhône':'rhone',Rhône:'rhone',Corse:'corsica',Jura:'jura',Savoie:'savoie','Sud-Ouest':'southwest',Beaujolais:'beaujolais'};
const bioParents={0:'languedoc',1:'champagne-aoc',2:'champagne-aoc',3:'champagne-aoc',4:'provence',5:'anjou-saumur',6:'fleurie',7:'minervois-corbieres',8:'les-baux-de-provence',9:'corsica',10:'morey',11:'cahors',12:'sancerre',13:'morey',14:'anjou-saumur',15:'languedoc',16:'chateauneuf-du-pape',17:'loire',18:'muscadet',19:'bourgueil',20:'muscadet',21:'arbois',22:'saumur-champigny',23:'vosne',24:'touraine',25:'arbin',26:'rhone-north',27:'burgundy',28:'vouvray',29:'alsace-aoc',30:'roussillon',31:'muscadet',32:'morey',33:'rhone-south',34:'agly-calce',35:'meursault',36:'burgundy',37:'arbois',38:'gevrey',39:'alsace-aoc',40:'patrimonio',41:'alsace-aoc',42:'muscadet',43:'terrasses-du-larzac',44:'cahors'};
const bioNotes={1:'自 2003 年转向有机种植，2009 年开始采用生物动力实践，并使用马匹进行部分田间工作。',2:'家族葡萄园历史始于 1895 年，1929 年开始以自有收成酿造香槟；1989 年开始转向生物动力种植。',5:'Saumur 地区的庄园，将葡萄园与林地、篱笆及野生生境共同管理。协会档案记载，大片土地用于保护和恢复生态系统。',6:'位于 Fleurie，也经营 Moulin-à-Vent 与 Saint-Amour 葡萄园。庄园强调自有葡萄，不购入葡萄，并结合林木、牧羊与蜂群管理。',7:'Lignères 家族的 Corbières 庄园，兼产红、白葡萄酒；地块分开酿造，Les Chemins 系列则结合多个地块。',8:'Charmolüe 家族于 2006 年接手，庄园以岩石中的地下酒窖与 13 世纪城堡遗迹为特色，生产红、白与桃红葡萄酒。',12:'Mellot 家族在当地的葡萄酒活动可追溯到 1513 年档案。La Moussière 是认识其 Sancerre 酒款的重要入口。',13:'Joseph Arlaud 于 1949 年建立酒庄，1982 年由 Hervé 接手。家族葡萄园横跨 Morey-Saint-Denis、Gevrey-Chambertin 与 Chambolle-Musigny。',17:'经营 Jasnières 和 Coteaux du Loir，以白诗南酿白酒、Pineau d’Aunis 酿红酒和桃红。酒窖开凿于 tuffeau 岩层中。',18:'位于 Le Landreau，葡萄园以 Melon de Bourgogne 为主，也种植其他白、红品种；酒窖广泛使用陶罐陈酿。',20:'以 Muscadet Sèvre et Maine 为核心，逐步收购特定地块扩展庄园；Melon de Bourgogne 是主要品种。',28:'Victor Huet 与其子 Gaston 于 1928 年建立酒庄，Le Haut-Lieu、Le Mont、Clos du Bourg 是三块历史核心葡萄园，以白诗南为主。',29:'位于 Wintzenheim，葡萄园也分布于 Turckheim 和 Wettolsheim。自 1998 年起采用生物动力种植，兼有大区与特级园葡萄园。',30:'2001 年创立于 Montner，以加泰罗尼亚传统品种和老藤为核心，保留多种红、白葡萄；2011 年全园采用生物动力实践。',32:'夜丘家族酒庄，产品横跨大区、村庄、一级园与特级园。2015 年起将陶罐与木桶结合陈酿。',33:'Saurel 家族于 1986 年接手经营，葡萄园覆盖 Gigondas、Vacqueyras 与 Côtes du Rhône，使用混凝土罐及瓶中陈酿。',34:'位于 Calce，经营多种加泰罗尼亚白、红葡萄品种；在 2010 年后系统采用生物动力实践。',35:'以 Meursault 为基地，葡萄园分布于 Meursault、Monthélie、Pommard 和 Puligny-Montrachet；1997 年起全园采用生物动力种植。',38:'位于 Gevrey-Chambertin 的 Trapet 酒庄，强调温和处理葡萄和重力转移；与 Domaine Trapet Alsace 分别识别。',39:'阿尔萨斯酒庄，以多次采收筛选、天然酵母与传统大木桶陈酿为重要实践，生产大区与具名园地酒款。',41:'1959 年由 Zind 与 Humbrecht 两个家族庄园结合而成。葡萄园分布于 Rangen、Brand、Hengst 等特级园及多个具名地块；1992 年起酒窖设于 Turckheim。',42:'南特地区的 Muscadet 生产者，主要种植 Melon de Bourgogne；以分地块表达和酒泥陈酿为重点。',43:'位于 Joncquières、Terrasses du Larzac 核心地带，强调分地块酿造，再按地块和品种进行调配。',44:'Fabien Jouves 于 2006 年创立于 Cahors 高坡，重视 Malbec 的不同地块表达，依酒款使用混凝土罐、桶和大木桶。'};
for(let [i,x] of read('bio-profiles').entries()){let key=source(x.name+' · Biodyvin 会员档案',x.url);let history=[];if(x.year)history.push([x.year,'加入 Biodyvin 协会（不是酒庄创立年份）。']);let details=[];if(x.appellation)details.push(['协会所列产地／葡萄园范围',x.appellation]);let e=estate({name:x.name,parent:bioParents[i]||bioMap[x.region],sourceKeys:[key],intro:bioNotes[i]||`${x.name} 位于 ${x.region}，在 Biodyvin 协会名录中登记。已核实生产者与区域关联，详细历史和旗下酒款仍待补充。`,history,tier:'生产者 · Biodyvin 会员档案',details});groups.other.push(e.id);}

const pomSource=source('Pomerol Séduction · 酒庄介绍','https://www.pomerol-seduction.com/en/');
for(const [name,intro,year,event] of [
['Clos du Clocher','由 Audy 家族数代经营，葡萄园位于波美侯高地。协会档案记载约 6 公顷葡萄园。'],
['Château Beauregard','庄园历史与 12 世纪医院骑士团有关。18 世纪火灾后重建的庄园建筑，是其历史风貌的一部分。'],
['Château Clinet','葡萄种植的档案记录可追溯至 1595 年，Laborde 家族于 1999 年收购。','1999','Laborde 家族收购。'],
['Château du Vieux Maillet','由 Laviale 家族于 2004 年接手，随后扩充葡萄园。','2004','Laviale 家族接手。'],
['Château Rouget','位于波美侯，由 Labruyère 家族于 1992 年收购后持续投入。','1992','Labruyère 家族收购。'],
['Château Nénin','Despujols 家族自 1847 年持有的庄园，1997 年由 Delon 家族收购。','1997','Delon 家族收购。'],
['Château Mazeyres','葡萄园分布于波美侯西部和南部，以不同地块组合构成庄园的葡萄园基础。'],
['Château La Pointe','波美侯庄园，自 2008 年开始新阶段的葡萄园与酿造设施改进。','2008','启动新阶段的庄园改进。'],
['Château La Conseillante','名称源于历史上的 Catherine Conseillan，庄园的葡萄酒历史跨越数百年。'],
['Château Gazin','Louis Soualle 于 1918 年购入，随后由其后代家族延续经营。','1918','Louis Soualle 购入庄园。']
]){const e=estate({name,parent:'pomerol',sourceKeys:[pomSource],intro,history:year?[[year,event]]:[]});wine(e,{labelText:'Pomerol AOC'});groups.other.push(e.id);}
const extras=[
['Château L’Évangile','pomerol','https://www.lafite.com/fr/domaines/chateau-levangile-fr/lire/','波美侯庄园，Domaines Barons de Rothschild Lafite 于 1990 年收购，此后改进葡萄园管理与酿造设施。','1990','DBR Lafite 收购。'],
['Louis Latour','burgundy','https://www.louislatour.com/en/history','创立于 1797 年的勃艮第家族酒商与葡萄园经营者，酒款跨多个法定产区。','1797','酒庄创立。'],
['Bouchard Père & Fils','burgundy','https://bouchard-pereetfils.com/en/the-domaine','历史始于 1731 年，拥有跨勃艮第多个园地的葡萄园；酒庄名不是单一法定产地。','1731','家族企业的历史起点。'],
['Louis Jadot','burgundy','https://www.kobrandwineandspirits.com/brand-page/louis-jadot-cote-dor-burgundies/about/','创立于 1859 年的勃艮第酒商与生产者，经营多个村庄及园地酒款。','1859','酒庄创立。'],
['Joseph Drouhin','burgundy','https://pim.drouhin.com/3430PY2NAY/en/get/print','Joseph Drouhin 于 1880 年在 Beaune 创立企业，家族随后逐步扩大葡萄园与园地酒的范围。','1880','在 Beaune 创立。'],
['Domaine Leflaive','puligny','https://www.leflaive.fr/en_US/the-Leflaive-wine-family','以 Puligny-Montrachet 为核心的勃艮第家族酒庄，旗下白葡萄酒包括村庄、一级园与特级园，应按各酒款的法定名称分别识别。'],
['Domaine François Raveneau','chablis','https://www.bourgogne-wines.com/winegrowers-and-expertise/passionate-men-and-women/raveneau-francois-chablis-89800%2C2507%2C9363.html?args=Y29tcF9pZD0xNTAyJmFjdGlvbj12aWV3RmljaGUmaWQ9VklOQk9VMDAwMDIwMDk3NyZ8','夏布利生产者，收录依据为勃艮第葡萄酒协会的酒庄档案；不同一级园和特级园保持独立酒款身份。'],
['Trimbach','alsace-aoc','https://www.trimbach.fr/notre-histoire','家族酿酒历史始于 1626 年，1920 年迁至 Ribeauvillé。Clos Sainte Hune 与 Cuvée Frédéric Emile 是两条分别识别的重要酒款。','1626','家族酿酒历史起点。'],
['Hugel','alsace-aoc','https://www.grandes-maisons.alsace/les-maisons/hugel/','1639 年创立于 Riquewihr 的阿尔萨斯家族酒庄。Jean Hugel 参与推动晚收与贵腐精选酒相关规范；不同品种、园地与采收类别分别标示。','1639','在 Riquewihr 创立。']
];for(const[name,parent,url,intro,year,event]of extras){const k=source(name+' · 酒庄／协会档案',url);const e=estate({name,parent,sourceKeys:[k],intro,history:year?[[year,event]]:[]});groups.other.push(e.id);if(parent==='pomerol')wine(e,{labelText:'Pomerol AOC'});}
const champRanges={
'Charles Heidsieck':['Brut Réserve','Rosé Réserve','Blanc de Blancs','Blanc des Millénaires'],
'de Venoge':['Cordon Bleu Brut','Princes Blanc de Blancs','Louis XV'],
'Delamotte':['Brut','Blanc de Blancs','Rosé'],
'Deutz':['Brut Classic','William Deutz','Amour de Deutz'],
'Duval-Leroy':['Fleur de Champagne','Femme de Champagne'],
'Henri Giraud':['Argonne','Esprit Nature','Hommage au Pinot Noir','Blanc de Craie'],
'Henriot':['Brut Souverain','Blanc de Blancs','Cuvée Hemera'],
'Lanson':['Le Black Création','Le Blanc de Blancs','Le Clos Lanson'],
'Laurent-Perrier':['La Cuvée','Grand Siècle','Cuvée Rosé','Ultra Brut'],
'Louis Roederer':['Collection','Cristal','Cristal Rosé','Brut Nature'],
'Perrier Jouët':['Belle Epoque','Belle Epoque Rosé','Belle Epoque Blanc de Blancs'],
'Philipponnat':['Clos des Goisses'],
'Pommery':['Brut Royal','Louise Brut','Clos Pompadour'],
'Taittinger':['Brut Réserve','Comtes de Champagne Blanc de Blancs','Comtes de Champagne Rosé']
};for(const[name,cuvees]of Object.entries(champRanges)){const e=all().find(n=>n.producer&&norm(n.en)===norm(name));for(const cuvee of cuvees){let ms=manga.filter(m=>norm(m.producer)===norm(name)&&[norm(cuvee),norm(name+' '+cuvee)].includes(norm(m.en)));wine(e,{en:name+' '+cuvee,appellation:'champagne-aoc',labelText:'Champagne AOC',type:/Rosé/.test(cuvee)?'桃红起泡葡萄酒':'起泡葡萄酒',tier:'香槟 · 独立酒款',matchId:ms.length===1?ms[0].id:undefined});}}
const boll=all().find(n=>n.producer&&norm(n.en)==='bollinger');const bk=source('Bollinger · 官方酒款系列','https://www.champagne-bollinger.com/en/champagne/');for(const q of ['Special Cuvée','La Grande Année'])wine(boll,{en:'Bollinger '+q,appellation:'champagne-aoc',labelText:'Champagne AOC',type:'起泡葡萄酒',tier:'香槟 · 独立酒款',sourceKeys:[bk]});
const tri=all().find(n=>n.producer&&norm(n.en)==='trimbach');for(const q of ['Riesling Clos Sainte Hune','Riesling Cuvée Frédéric Emile'])wine(tri,{en:'Trimbach '+q,labelText:'Alsace AOC',type:'白葡萄酒',tier:'具名酒款',grapes:'Riesling（雷司令）'});
for(const[id,url,intro,history]of[
['figeac','https://www.chateau-figeac.com/en/the-builders/','自 1892 年起由同一家族传承，Thierry Manoncourt 对现代 Figeac 的葡萄园与设施发展有重要影响。2022 年列为 Saint-Émilion Premier Grand Cru Classé A。',[['1892','进入现今家族的传承历史。'],['2022','晋升为 Premier Grand Cru Classé A。']]],
['pavie','https://www.chateaupavie.com/fr_FR/le-domaine','Perse 家族于 1998 年收购的圣埃美隆庄园，葡萄园与酿造设施随后持续改造。2022 年分级为 Premier Grand Cru Classé A。',[['1998','Perse 家族收购。']]]
])if(profiles[id]){profiles[id].intro=intro;profiles[id].history=history;profiles[id].sources.push(url);}


for(const m of manga){if(byId(m.id)||/具体酒款待核验|待核验/.test(m.en)||norm(m.en)===norm(m.producer))continue;const e=all().find(n=>n.producer&&norm(n.en)===norm(m.producer));if(!e||!profiles[e.id])continue;wine(e,{en:m.en,name:m.name,matchId:m.id,appellation:byId(m.placeId)?m.placeId:e.parent,labelText:m.place||'具体法定产地待核验',type:m.type||'葡萄酒',tier:'漫画索引关联酒款',summary:'沿用《神之水滴》工作索引中的酒款名称与收藏身份，并归入已核实的生产者。漫画原页与具体酒款技术资料仍待复核；详见下方出处。'});}

// Preserve more complete original profiles instead of replacing them with directory text.
const originals=vm.runInContext('ESTATE_PROFILES',c);for(let [id,p]of Object.entries(originals))if(profiles[id])profiles[id]={...profiles[id],...p};
fs.writeFileSync(root+'generated.json',JSON.stringify({nodes,profiles,sources,updates,groups,wineMatches},null,2));console.log({newEstates:nodes.filter(n=>n.producer).length,newWines:nodes.filter(n=>n.kind==='wine').length,groups:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,new Set(v).size])),mangaMerged:wineMatches.length});
