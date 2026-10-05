// Manga answers, not the television adaptation or competing guesses.
const APOSTLES = [
 ['roumier-amoureuses','Georges Roumier','Chambolle-Musigny 1er Cru Les Amoureuses','爱侣园一级园','2001','法国 · 勃艮第 · Chambolle-Musigny','红葡萄酒',47.185,4.958,'burgundy','同一个爱侣园，不同生产者是不同酒款；请同时核对 Roumier 与年份。'],
 ['palmer-grand','Château Palmer','Château Palmer','宝玛正牌','1999','法国 · 波尔多 · Margaux','红葡萄酒',45.043,-.668,'margaux-aoc','1999 为使徒答案；不要与漫画中提出的 2000 或副牌 Alter Ego 混淆。'],
 ['pegau-da-capo','Domaine du Pégau','Châteauneuf-du-Pape Cuvée Da Capo','佩高 Da Capo 特酿','2000','法国 · 罗讷河谷 · Châteauneuf-du-Pape','红葡萄酒',44.057,4.831,'rhone','Da Capo 是具体特酿，不能用同酒庄的 Cuvée Réservée 代替。'],
 ['lafleur-grand','Château Lafleur','Château Lafleur','花堡正牌','1994','法国 · 波尔多 · Pomerol','红葡萄酒',44.93,-.197,'pomerol','Lafleur 与 Lafleur-Pétrus 是不同酒庄；收藏以完整酒款名识别。'],
 ['colin-chevalier','Michel Colin-Deléger','Chevalier-Montrachet Grand Cru','骑士蒙哈榭特级园','2000','法国 · 勃艮第 · Chevalier-Montrachet','干白葡萄酒',46.946,4.738,'burgundy','特级园名相同不代表酒款相同，生产者必须是 Michel Colin-Deléger。'],
 ['sandrone-cannubi','Luciano Sandrone','Barolo Cannubi Boschis','巴罗洛 Cannubi Boschis','2001','意大利 · 皮埃蒙特 · Barolo','红葡萄酒',44.615,7.943,null,'保留漫画所用的历史酒款名称 Cannubi Boschis，便于核对老年份酒标。'],
 ['sqn-inaugural','Sine Qua Non','The Inaugural Eleven Confessions Syrah','创始 Eleven Confessions 西拉','2003','美国 · 加利福尼亚 · Santa Rita Hills','红葡萄酒',34.626,-120.205,null,'此名称对应特定年份；不能将其他年份、名称或歌海娜酒款视为同一使徒。'],
 ['selosse-exquise','Jacques Selosse','Cuvée Exquise Sec','Exquise 香槟','NV','法国 · 香槟 · Avize','香槟',48.973,4.011,null,'NV 表示无年份，并非年份资料缺失；Exquise 与 Initial、Substance 是不同酒款。'],
 ['poggio-brunello','Poggio di Sotto','Brunello di Montalcino','蒙塔希诺布鲁奈罗','2005','意大利 · 托斯卡纳 · Montalcino','红葡萄酒',42.99,11.505,null,'应核对 Brunello di Montalcino；同酒庄 Rosso di Montalcino 是不同酒款。'],
 ['sirugue-grands','Robert Sirugue','Grands Échezeaux Grand Cru','大依瑟索特级园','2002','法国 · 勃艮第 · Grands Échezeaux','红葡萄酒',47.174,4.961,'burgundy','Grands Échezeaux 与 Échezeaux 是不同的特级园，不能省略 Grands。'],
 ['ferrer-seleccio','Ferrer Bobet','Selecció Especial','特别精选','2008','西班牙 · 加泰罗尼亚 · Priorat','红葡萄酒',41.15,.89,null,'应核对 Selecció Especial 特别精选，而不只是酒庄名称 Ferrer Bobet。'],
 ['yquem-grand',"Château d’Yquem","Château d’Yquem",'滴金贵腐甜白','1976','法国 · 波尔多 · Sauternes','甜白葡萄酒',44.543,-.328,'bordeaux','使徒答案为 1976；干白 Y 与贵腐甜白 d’Yquem 是不同酒款。']
].map((w,i)=>({id:w[0],producer:w[1],en:w[2],name:w[3],vintage:w[4],place:w[5],type:w[6],lat:w[7],lng:w[8],placeId:w[9],note:w[10],apostle:i+1}));
