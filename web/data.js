const SOURCES={
 bordeaux:['波尔多葡萄酒协会 · 产区','https://www.bordeaux.com/en/designations/'],
 medoc:['波尔多葡萄酒协会 · 梅多克','https://www.bordeaux.com/en/appellations/medoc/'],
 right:['波尔多葡萄酒协会 · 右岸','https://www.bordeaux.com/en/designations/saint-emilion-pomerol-fronsac/'],
 pomerol:['波尔多葡萄酒协会 · 波美侯','https://www.bordeaux.com/en/designations/saint-emilion-pomerol-fronsac/pomerol/'],
 burgundy:['勃艮第葡萄酒协会 · 地质与风土','https://www.bourgogne-wines.com/wine-and-terroir/our-natural-assets/geology/the-collapse-of-the-bressan-rift/the-cote-de-nuits-cote-de-beaune-and-cote-chalonnaise-created-from-a-major-geological-upheaval,2481,9403.html'],
 margaux:['玛歌酒庄 · 风土','https://chateau-margaux.com/en/le-domaine/le-terroir'],
 mouton:['木桐酒庄 · 从葡萄到酒','https://www.chateau-mouton-rothschild.com/the-vineyard/from-vine-to-wine'],
 cheval:['白马酒庄 · 葡萄园','https://www.chateau-cheval-blanc.com/en/the-vineyard/'],
 drc:['罗曼尼康帝酒庄 · 哲学','https://www.romanee-conti.fr/fr/philosophie-du-domaine'],
 growers:['勃艮第葡萄酒协会 · 酒庄名录','https://www.bourgogne-wines.com/our-wines-our-terroir/the-bourgogne-winegrowing-region-and-its-appellations/the-bourgogne-winegrowing-region-an-ideal-location,2458,9253.html?args=Y29tcF9pZD0yMjc4JmFjdGlvbj12aWV3RmljaGVXaXRoVmlnbmVyb24maWQ9MjI2JmFwcGVsbGF0aW9uX2FwcGVsbGF0aW9uPUJvdXJnb2duZSZhcHBlbGxhdGlvbl9pZF9hY2Nlc3M9MjF8'],
 b21:['波尔多葡萄酒协会 · 2021','https://www.bordeaux.com/fr/millesimes/2021/'],
 b22:['波尔多葡萄酒协会 · 2022','https://www.bordeaux.com/fr/millesimes/2022-un-millesime-elegant-site-officiel-bordeaux-com/'],
 u21:['勃艮第葡萄酒协会 · 2021 年份报告','https://www.bourgogne-wines.com/press/gallery_files/site/289/1910/69996.pdf'],
 u22:['勃艮第葡萄酒协会 · 2022 年份报告','https://www.bourgogne-wines.com/press/gallery_files/site/289/1910/75996.pdf']
};
const NODES=[];
function node(id,parent,name,en,lat,lng,zoom,summary,grapes,soil,climate,lesson,source,extra={}){NODES.push({id,parent,name,en,lat,lng,zoom,summary,grapes,soil,climate,lesson,source,...extra})}
node('france',null,'法国','France',46.6,2.5,6,'从大产区到酒庄，沿着地理层级探索；再用「天、地、人」读懂同一片土地的不同表达。','从赤霞珠、梅洛，到黑皮诺、西拉与佳美','地质、坡向与排水条件因产区而异','海洋性、大陆性与地中海气候共同构成法国的葡萄酒版图。','先比较波尔多的调配逻辑，与勃艮第以地块为核心的表达。',['bordeaux','burgundy']);
node('bordeaux','france','波尔多','Bordeaux',44.95,-.45,9,'河流划出两岸，也带来两种理解红葡萄酒的方式：左岸的赤霞珠，右岸的梅洛与品丽珠。','赤霞珠 · 梅洛 · 品丽珠','砾石、黏土与石灰岩；分布随两岸和地块变化','温和海洋性气候；大西洋、河流与年份降雨共同影响成熟。','“左岸赤霞珠、右岸梅洛”是入门线索，不是每一家酒庄都遵守的配方。',['bordeaux'],{deep:true});
node('burgundy','france','勃艮第','Bourgogne',47.03,4.85,9,'以村庄和地块为线索，观察相近的葡萄品种如何表达不同的坡地与土壤。','红葡萄酒以黑皮诺为核心','金丘常见石灰岩、泥灰岩及其风化土壤','偏大陆性气候；春霜、降雨与采收窗口对年份影响明显。','Climat 指有明确名称与历史身份的葡萄园地块，不等同于“气候”。',['burgundy'],{deep:true});
node('rhone','france','罗讷河谷','Vallée du Rhône',44.65,4.8,8,'沿罗讷河向南，观察西拉与歌海娜的不同角色。','北部以西拉为主；南部常以歌海娜参与调配','北部常见陡坡与花岗岩；南部土壤更为多样','北部偏大陆性，南部更具地中海影响。','不要把南北罗讷当作同一种红葡萄酒风格。',[],{overview:true});
node('loire','france','卢瓦尔河谷','Vallée de la Loire',47.3,.65,8,'从河流出发认识法国凉爽产区，红葡萄酒也是这里的重要一页。','品丽珠 · 黑皮诺 · 佳美（因产区而异）','石灰岩、燧石与其他多样地质','由西向东，海洋性影响逐渐减弱。','先看具体产区，再谈卢瓦尔红葡萄酒的风格。',[],{overview:true});
node('alsace','france','阿尔萨斯','Alsace',48.18,7.38,9,'一个以白葡萄酒著称的产区，也能帮助你认识黑皮诺的另一种表达。','红葡萄酒：黑皮诺','地质拼图复杂，不能用单一土壤概括','孚日山脉的雨影效应是理解当地风土的重要线索。','同是黑皮诺，产区、地块与酿造选择仍会带来差异。',[],{overview:true});
node('beaujolais','france','博若莱','Beaujolais',46.12,4.63,9,'用佳美认识果香、地质与酿造方式的关系。','佳美 Gamay','北部常见花岗岩；不同产区地质有差异','介于多种气候影响之间，年份和地形均有作用。','博若莱不只有新酒，Cru 产区值得单独学习。',[],{overview:true});
node('provence','france','普罗旺斯','Provence',43.5,6,8,'地中海岸的葡萄酒世界；本版关注其中红葡萄酒的学习线索。','慕合怀特 · 歌海娜 · 西拉（因产区而异）','石灰质与其他地质并存','地中海气候，阳光与风是重要因素。','普罗旺斯不只有桃红；学习红酒时，应进一步区分具体 AOC。',[],{overview:true});
node('languedoc','france','朗格多克','Languedoc',43.35,3.05,8,'从海岸到内陆高地，多样地形让调配拥有丰富可能。','歌海娜 · 西拉 · 慕合怀特 · 佳丽酿','石灰岩、片岩等，具体地质随产区改变','地中海影响明显，海拔与海风带来局部差异。','大区名称不能替代子产区与生产者信息。',[],{overview:true});
node('medoc','bordeaux','梅多克','Médoc',45.08,-.73,11,'吉伦特河口左岸的经典红葡萄酒产地；继续进入波亚克或玛歌。','赤霞珠 · 梅洛','砾石丘与黏土等交错分布','河口与海洋共同调节温度。','砾石排水条件是认识这里赤霞珠的重要切入点。',['medoc']);
node('rightbank','bordeaux','利布尔讷地区 · 右岸','Libournais',44.91,-.17,11,'从圣埃美隆到波美侯，梅洛与品丽珠在不同土壤上表达自己。','梅洛 · 品丽珠','石灰岩、黏土、砾石与沙土的组合','同属海洋性影响，但内陆位置与地块条件各有差别。','“右岸”是地理线索，而不是统一的法定等级。',['right']);
node('graves','bordeaux','格拉夫','Graves',44.64,-.5,10,'波尔多南部，砾石土壤与悠久酿酒传统交织。','赤霞珠 · 梅洛；也出产白葡萄酒','砾石与沙、黏土相互交错','海洋性影响；地块位置仍然重要。','格拉夫是地理学习范围；佩萨克-雷奥良拥有自己的 AOC。',['bordeaux']);
node('pauillac','medoc','波亚克','Pauillac',45.195,-.748,13,'梅多克的经典村庄级法定产区，赤霞珠是重要线索。','赤霞珠主导的调配常见','深层砾石是知名酒庄的重要风土组成','吉伦特河口影响下的海洋性气候。','同在波亚克，不同酒庄仍有不同地块与酿造选择。',['medoc','mouton']);
node('margaux-aoc','medoc','玛歌产区','Margaux',45.04,-.675,13,'玛歌是产区名称，也是一家著名酒庄的名字；两者不能混为一谈。','赤霞珠 · 梅洛等','砾石、黏土与石灰质地层形成多样地块','海洋性气候，受河口和大西洋调节。','酒标上的 Margaux 不必然代表 Château Margaux。',['medoc','margaux']);
node('saintemilion','rightbank','圣埃美隆','Saint-Émilion',44.894,-.156,13,'从石灰岩台地到砾石与沙土地块，右岸内部也有显著差异。','梅洛 · 品丽珠','石灰岩台地、黏土坡地与冲积土等','海洋性背景下，地块位置影响成熟条件。','白马酒庄的砾石与黏土，是理解产区内部差异的好例子。',['right','cheval']);
node('pomerol','rightbank','波美侯','Pomerol',44.933,-.2,13,'面积较小、以梅洛闻名的右岸产区。','梅洛为重要品种','黏土、砾石与含铁地层等','受海洋性气候影响，土壤与地块差异仍关键。','不要将波美侯与圣埃美隆视为同一套分级体系。',['pomerol']);
node('pessac','graves','佩萨克-雷奥良','Pessac-Léognan',44.765,-.61,12,'在波尔多城南认识砾石风土，也留意这里的优质白葡萄酒。','红：赤霞珠、梅洛；白：长相思、赛美蓉','砾石丘是重要地貌特征','海洋性气候与局部环境共同作用。','同一法定产区可以同时拥有红、白两种重要表达。',['bordeaux']);
node('nuits','burgundy','夜丘','Côte de Nuits',47.18,4.96,11,'沿狭长坡地展开的红葡萄酒核心区域，村庄名称是学习的下一站。','黑皮诺','侏罗纪石灰岩、泥灰岩与坡积土','偏大陆性；坡向与海拔塑造局部差别。','从村庄进入地块，再把生产者叠加进来，才能逐渐读懂勃艮第。',['burgundy']);
node('beaune','burgundy','伯恩丘','Côte de Beaune',46.98,4.79,11,'红白并重的坡地世界；本版先探索玻玛的红葡萄酒。','红：黑皮诺；白：霞多丽','石灰岩与泥灰岩，地块间土层深度不同','偏大陆性；坡向与采收时点同样重要。','伯恩丘是地理范围，不等于名称相近的单一 AOC。',['burgundy']);
node('gevrey','nuits','热夫雷-香贝丹','Gevrey-Chambertin',47.227,4.969,13,'夜丘北部的经典村庄，从这里学习村庄名、园名与生产者名的区别。','黑皮诺','石灰质地层与多样的坡积土','偏大陆性气候，具体地块需另行考察。','同一生产者可能酿造村庄级、一级园与特级园等不同酒款。',['burgundy','growers']);
node('vosne','nuits','沃恩-罗曼尼','Vosne-Romanée',47.16,4.955,14,'村庄与周边知名园地的名字，构成理解勃艮第酒标的一堂课。','黑皮诺','石灰岩与黏土组成的坡地土壤','偏大陆性气候；地块差异不可被村庄均值替代。','Romanée-Conti 是一块特级园的名称；Domaine de la Romanée-Conti 是生产者。',['burgundy','drc']);
node('pommard','beaune','玻玛','Pommard',47.009,4.795,14,'伯恩丘著名的红葡萄酒村庄，用黑皮诺继续探索风土差异。','黑皮诺','石灰质与黏土土壤，位置与厚度各异','偏大陆性气候。','不要仅凭村庄名称推断所有酒款的力量感；生产者和地块仍然重要。',['burgundy','growers']);
node('ch-margaux','margaux-aoc','玛歌酒庄','Château Margaux',45.045,-.668,15,'一个以严格筛选和地块差异为学习切口的左岸代表酒庄。','赤霞珠 · 梅洛等','砾石、黏土与石灰岩组成的地块拼图','继承玛歌产区的海洋性背景。','分清 Château Margaux 正牌、Pavillon Rouge 与产区内其他酒庄。',['margaux'],{producer:true,people:'观察酒庄如何把不同地块、葡萄品种与筛选结果组织成最终调配。自然条件提供潜力，人决定如何实现它。'});
node('mouton','pauillac','木桐酒庄','Château Mouton Rothschild',45.215,-.772,15,'波亚克的代表生产者；从深砾石地块与赤霞珠理解它的酿造基础。','以赤霞珠为主，另有梅洛等','木桐台地的深砾石土壤','河口与大西洋调节下的梅多克气候。','种植比例不等于某一年的最终调配比例。',['mouton'],{producer:true,people:'酒庄官方介绍涵盖地块、发酵后调配与新橡木桶陈酿。可据此追问：年份条件改变时，筛选与调配如何响应？'});
node('cheval','saintemilion','白马酒庄','Château Cheval Blanc',44.922,-.19,15,'位于圣埃美隆、紧邻波美侯的酒庄，用它来理解右岸并不只有单一配方。','品丽珠 · 梅洛等','黏土、砾石与沙土的复杂组合','右岸的海洋性背景，地块条件具有个性。','白马的风土与品种组合提醒我们：不能将“右岸＝梅洛”机械化。',['cheval'],{producer:true,people:'把葡萄园视为地块组合，理解品丽珠与梅洛的角色。这里的学习重点是品种、土壤和人的长期选择如何结合。'});
node('drc','vosne','罗曼尼康帝酒庄','Domaine de la Romanée-Conti',47.16,4.953,16,'以多个特级园的独立表达，展示地块身份与生产者哲学的关系。','红葡萄酒以黑皮诺为核心','不同持有或经营园地的风土不能合并为单一点位','年份条件相同，园地的局部环境与响应仍可能不同。','“同一酒庄、同一年份、不同园地”是理解地的理想比较逻辑。',['drc'],{producer:true,people:'酒庄将持续理解和表达各特级园潜力作为其哲学。这里标注关联村庄，不代表其全部葡萄园分布。'});
node('rossignol','gevrey','罗西诺-特拉佩酒庄','Domaine Rossignol-Trapet',47.227,4.97,15,'从协会名录中的村庄生产者入手，练习同时读出产地与生产者。','黑皮诺为该村庄红酒的核心','具体园地的土壤需按酒款核对','本页使用大产区年份背景，不代表酒庄逐款结论。','比较前先锁定酒款、等级与年份，避免只比较酒庄名。',['growers'],{producer:true,people:'本版提供酒庄定位与学习框架；尚未收录其具体采收、萃取或用桶数据，故不推断酒庄风格。'});
node('heitz','pommard','阿尔芒·海茨','Armand Heitz',47.01,4.793,15,'通过伯恩丘的生产者，学习区分酒庄所在地与葡萄园所在地。','因具体酒款而异','生产者可能跨村庄酿酒；不能由驻地推断所有地块','年份应与具体产区和酒款同时阅读。','酒庄驻地、酒标产区与葡萄园位置，可能是三件不同的事。',['growers'],{producer:true,people:'协会名录列出该生产者与玻玛的关联。本版未收录逐园持有资料或酿造参数，不把驻地当作所有酒款的来源。'});
const VINTAGES={bordeaux:{2021:{title:'气候挑战下，更要看具体酒庄',tags:['春霜','湿润生长季','差异明显'],weather:'春季霜冻与生长季的湿润条件增加了管理难度，成熟节奏与采收判断尤为重要。',style:'这是学习生产者差异的年份。不能仅凭年份标签，推断每一款红葡萄酒的成熟度或质量。',question:'同一产区里，种植管理、筛选和调配如何应对这一年的压力？',source:'b21'},2022:{title:'炎热干燥，不等于失去平衡',tags:['高温与干旱','提早采收','地块响应'],weather:'高温、干旱构成年份主线，也出现春霜与局部冰雹。采收较早。',style:'协会总结指出，严峻天气下仍有兼具平衡与新鲜感的葡萄酒。不要把“热年份”自动翻译成“只有高酒精、低酸度”。',question:'土壤保水能力、老藤与采收时点，如何改变葡萄面对热浪的反应？',source:'b22'}},burgundy:{2021:{title:'产量偏低，表达偏细腻',tags:['霜冻压力','低产量','细腻表达'],weather:'这是充满天气挑战的一年，霜冻等因素令产量明显受限。',style:'协会以细腻、适合较早欣赏来概括这一年份。具体园地和酒款仍需要单独判断，不能把低产量直接等同于浓郁。',question:'更凉爽的成熟条件，如何改变你对黑皮诺果香与结构的感受？',source:'u21'},2022:{title:'在炎热年份里，寻找饱满与平衡',tags:['炎热干燥','产量恢复','果实成熟'],weather:'经历 2021 的低产之后，2022 在炎热干燥背景下带来较为充足的收成。',style:'协会报告强调成熟果实、饱满口感及令人满意的平衡。相邻地块与不同采收选择仍会产生差异。',question:'与 2021 比较时，哪些感受来自年份，哪些可能来自酒庄与地块？',source:'u22'}}};
Object.assign(SOURCES,{
 rhone:['罗讷河谷葡萄酒协会 · 品种','https://www.vins-rhone.com/en/rhone-valley-vineyards/grape-varieties'],
 loire:['卢瓦尔河葡萄酒协会 · 品种','https://www.vinsdeloire.fr/fr/cepages?page=0'],
 alsace:['阿尔萨斯葡萄酒协会 · 黑皮诺','https://www.vinsalsace.com/en/gouts-et-couleurs/cepages/fra/pinot-noir-dalsace-rouge/'],
 beaujolais:['博若莱葡萄酒协会 · 产区','https://www.beaujolais.com/en/appellation/beaujolais/'],
 provence:['普罗旺斯葡萄酒协会 · 产区介绍','https://www.vinsdeprovence.com/en/le-vignoble/presentation-generale-64804f9668e62'],
 languedoc:['朗格多克葡萄酒协会 · 产区','https://languedoc-wines.com/en/appellations/pdo-languedoc/']
});
for(const n of NODES)if(n.overview)n.source=[n.id];
