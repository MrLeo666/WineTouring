const ESTATE_PROFILES={
  "ch-margaux": {
    "intro": "玛歌酒庄位于梅多克的玛歌产区，庄园建筑、酒窖与葡萄园共同构成其身份。由 Louis Combes 设计的城堡，是法国新帕拉第奥式建筑的代表之一。",
    "history": [
      [
        "1810",
        "城堡建设工程启动。"
      ],
      [
        "1977",
        "André Mentzelopoulos 收购酒庄，开始修复与投入。"
      ]
    ],
    "sources": [
      "https://chateau-margaux.com/en/le-domaine/histoire",
      "https://chateau-margaux.com/en/le-domaine/notre-patrimoine"
    ]
  },
  "latour": {
    "intro": "拉图酒庄位于波亚克，紧邻吉伦特河口。Enclos 是酒庄历史上的核心葡萄园；塔楼形象、庄园沿革和对葡萄园的长期投入，是认识酒庄的重要线索。",
    "history": [
      [
        "1331",
        "现存最早提及 Latour 的文件，记录了兴建防御塔的许可。"
      ],
      [
        "1993",
        "François Pinault 通过 Artémis 收购酒庄，随后推进持续改造。"
      ]
    ],
    "sources": [
      "https://www.chateau-latour.com/en/in-the-beginning/since-1331"
    ]
  },
  "mouton": {
    "intro": "木桐酒庄把葡萄酒与艺术紧密联系在一起。其历史不仅包括葡萄园与酿酒设施的演变，也包括酒庄装瓶及艺术酒标传统。",
    "history": [
      [
        "1853",
        "Nathaniel de Rothschild 在拍卖中购入 Château Brane-Mouton。"
      ],
      [
        "1924",
        "Philippe de Rothschild 决定将全部葡萄酒在酒庄装瓶。"
      ],
      [
        "1973",
        "木桐晋升为一级列级庄。"
      ]
    ],
    "sources": [
      "https://www.chateau-mouton-rothschild.com/the-history/key-dates/key-date-1853",
      "https://www.chateau-mouton-rothschild.com/the-history/the-history-of-mouton/from-baron-philippe",
      "https://family.rothschildarchive.org/estates/63-chateau-mouton"
    ]
  },
  "lafite": {
    "intro": "拉菲古堡位于波亚克，酒庄及葡萄园在罗斯柴尔德家族入主前便已有悠久历史。Carruades 台地与酒庄核心山脊相邻，也为旗下另一款酒提供了名称。",
    "history": [
      [
        "1868",
        "James de Rothschild 收购拉菲，开启罗斯柴尔德家族篇章。"
      ]
    ],
    "sources": [
      "https://www.lafite.com/history/",
      "https://www.lafite.com/domaines/chateau-lafite-rothschild/read/"
    ]
  },
  "palmer": {
    "intro": "宝玛位于玛歌产区，庄园围绕新文艺复兴式城堡形成建筑群。Charles Palmer、Pereire 兄弟以及后来的酒商家族，先后塑造了酒庄的历史。",
    "history": [
      [
        "1814",
        "Charles Palmer 购入庄园，其姓名成为酒庄名称。"
      ],
      [
        "1853",
        "Pereire 兄弟购入酒庄，推动庄园建筑及整体布局发展。"
      ],
      [
        "1938",
        "波尔多酒商家族联合购入庄园，开启新的发展阶段。"
      ]
    ],
    "sources": [
      "https://www.chateau-palmer.com/en/estate",
      "https://www.chateau-palmer.com/en/article/charles-palmers-claret"
    ]
  },
  "pichon-baron": {
    "intro": "碧尚男爵位于波亚克，双塔城堡与前方水池是庄园的重要视觉标志。它与碧尚女爵源自同一历史庄园，分家后成为两家独立酒庄。",
    "history": [
      [
        "1850",
        "原碧尚庄园分为两部分，分别形成男爵与女爵酒庄。"
      ],
      [
        "1851",
        "Raoul Pichon de Longueville 委建今天所见的双塔城堡。"
      ],
      [
        "1987",
        "AXA Millésimes 收购酒庄。"
      ],
      [
        "1988",
        "酿造设施、酒窖与城堡的改造工程启动。"
      ]
    ],
    "sources": [
      "https://www.pichonbaron.com/en/heritage"
    ]
  }
};
const ESTATE_PHOTOS={
  "ch-margaux": [
    {
      "src": "estates/margaux.webp",
      "caption": "玛歌酒庄城堡与草坪",
      "source": "https://chateau-margaux.com/en/le-domaine/notre-patrimoine",
      "credit": "Château Margaux 官网",
      "width": 2160,
      "height": 1080
    }
  ],
  "latour": [
    {
      "src": "estates/latour.jpg",
      "caption": "拉图酒庄夏季葡萄园",
      "source": "https://www.chateau-latour.com/en/in-the-beginning/the-land-of-pauillac",
      "credit": "Château Latour 官网",
      "width": 742,
      "height": 1066
    }
  ],
  "mouton": [
    {
      "src": "estates/mouton.jpg",
      "caption": "木桐酒庄建筑与葡萄园",
      "source": "https://www.chateau-mouton-rothschild.com/",
      "credit": "Château Mouton Rothschild 官网",
      "width": 1440,
      "height": 580
    }
  ],
  "lafite": [
    {
      "src": "estates/lafite.jpg",
      "caption": "拉菲古堡塔楼、时钟与风向标",
      "source": "https://www.lafite.com/domaines/chateau-lafite-rothschild/read/",
      "credit": "Château Lafite Rothschild 官网",
      "width": 630,
      "height": 866
    }
  ],
  "palmer": [
    {
      "src": "estates/palmer-chateau.webp",
      "caption": "宝玛酒庄屋顶与塔楼",
      "source": "https://www.chateau-palmer.com/en/estate",
      "credit": "Château Palmer 官网",
      "width": 1080,
      "height": 1200
    }
  ],
  "pichon-baron": [
    {
      "src": "estates/pichon.jpg",
      "caption": "碧尚男爵城堡与秋季葡萄园",
      "source": "https://www.pichonbaron.com/en/heritage",
      "credit": "Château Pichon Baron 官网",
      "width": 1440,
      "height": 900
    }
  ]
};
// Navigation ownership and geographic attribution are separate relationships.
for(const wine of NODES.filter(n=>n.kind==='wine'&&n.producerId)){const estate=NODES.find(n=>n.id===wine.producerId&&n.producer);if(estate&&wine.parent!==estate.id){wine.appellationId=wine.parent;wine.parent=estate.id;}}

ESTATE_PROFILES.angelus={intro:'金钟酒庄位于圣埃美隆，由 de Boüard de Laforest 家族传承经营。酒名与钟形标志来自当地教堂的祈祷钟声。酒庄历史可追溯至家族 1782 年迁居圣埃美隆；今日的庄园与酒款系列则经历了后续扩建和发展。',history:[['1782','Jean de Boüard de Laforest 定居圣埃美隆。'],['1920','家族购入名为 Angelus 的约 3 公顷地块。'],['1987','Carillon 首个年份推出。'],['2012','获历史 Premier Grand Cru Classé A；Stéphanie de Boüard-Rivoal 加入管理。'],['2019','Carillon 酒窖为当年采收投入使用，Tempo 系列创立。'],['2022','酒庄撤回当届圣埃美隆分级申请。']],sources:['https://www.angelus.com/en/the-property.html','https://www.angelus.com/en/the-wines.html','https://www.angelus.com/en/le-premier.html','https://www.angelus.com/en/412-saint-emilion-2022-classification.html']};

ESTATE_PHOTOS.angelus=[{"src": "estates/angelus-carillon.jpg", "caption": "Chai Carillon 酒窖外观与葡萄园", "source": "https://www.angelus.com/en/the-property.html", "credit": "Château Angélus 官网", "width": 1949, "height": 1152}];
