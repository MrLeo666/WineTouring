Object.assign(WINE_IMAGES,{
  "roumier-amoureuses": {
    "src": "labels/roumier-amoureuses.jpg",
    "wine": "Roumier Les Amoureuses 2001",
    "kind": "label",
    "visibleVintage": "2001",
    "sourcePage": "https://www.chateau-le-puy.com/wp-content/uploads/2024/01/2023-05-16-www.thedrinksbusiness.com-16-mai-2023-50000000368823450.pdf",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "真实酒标近照，边缘可见少量瓶身。"
  },
  "palmer-grand": {
    "src": "labels/palmer-grand.png",
    "wine": "Palmer 1999",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://farrvintners.com/wine.php?wine=3658",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "通用酒标，图中未印年份，不代表1999年实物。"
  },
  "lafleur-grand": {
    "src": "labels/lafleur-grand.jpg",
    "wine": "Lafleur 1994",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://farrvintners.com/wine.php?wine=2524",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "通用酒标，图中未印年份，不代表1994年实物。"
  },
  "sandrone-cannubi": {
    "src": "labels/sandrone-cannubi.jpg",
    "wine": "Sandrone Cannubi Boschis 2001",
    "kind": "label",
    "visibleVintage": "2001",
    "sourcePage": "https://www.chateau-le-puy.com/wp-content/uploads/2024/01/2023-05-16-www.thedrinksbusiness.com-16-mai-2023-50000000368823450.pdf",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "对应漫画年份2001。"
  },
  "sqn-inaugural": {
    "src": "labels/sqn-inaugural.png",
    "wine": "Sine Qua Non The Inaugural Eleven Confessions 2003",
    "kind": "label",
    "visibleVintage": "2003",
    "sourcePage": "https://www.sinequanon.com/wines/2003-2/",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "生产者2003年系列酒标；图中未标明Syrah，不作为具体品种实物核验。"
  },
  "poggio-brunello": {
    "src": "labels/poggio-brunello.jpg",
    "wine": "Poggio di Sotto Brunello di Montalcino",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://www.winebow.com/trade-tools/labels/30882",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "当代通用酒标，含ColleMassari字样；不是2005年的历史酒标。"
  },
  "yquem-grand": {
    "src": "labels/yquem-grand.webp",
    "wine": "Yquem 1976",
    "kind": "label",
    "visibleVintage": "1976",
    "sourcePage": "https://www.ebay.com/itm/227489657509",
    "sourceCredit": "原始图片提供者（详情见来源）",
    "note": "脱落酒标照片，标示1976；来自收藏品卖家，未独立鉴定实物真伪。"
  }
});

for(const id of Object.keys(WINE_IMAGES))if(WINE_IMAGES[id].kind==='bottle')delete WINE_IMAGES[id];
Object.assign(WINE_IMAGES,{
 'pegau-da-capo':{src:'labels/pegau-da-capo.jpg',kind:'label',visibleVintage:null,sourcePage:'https://pegau.com/en/wine/cuvee-da-capo/',sourceCredit:'Domaine du Pégau',note:'官方2000年份页面所附背标，图中未印年份；正面酒标仍待补。'},
 'selosse-exquise':{src:'labels/selosse-exquise.jpg',kind:'label',visibleVintage:null,sourcePage:'https://cdn2.site-media.eu/images/document/12708649/B10ChampagnesWeb.pdf',sourceCredit:'酒商原始酒单PDF',note:'Exquise Sec正面酒标近照，图中未印年份。'},
 'ferrer-seleccio':{src:'labels/ferrer-seleccio.png',kind:'label',visibleVintage:'2019',sourcePage:'https://www.winecompanions.nl/web/content/product.template/2136/x_studio_technische_gegevens_van_de_wijn?download=1',sourceCredit:'Wine Companions',note:'2019 Selecció Especial Vinyes Velles正背标展开图；非漫画对应2008年份，仅供识别酒款。'}
});

Object.assign(WINE_IMAGES,{
  "manga-964047534a6e": {
    "src": "labels/moulin-label.jpg",
    "wine": "Moulin Haut Laroque",
    "kind": "label",
    "visibleVintage": "2019",
    "sourcePage": "https://bordeaux-kompass.de/wp-content/BDX_PRO/BDX/CHATEAUX/000715.html",
    "sourceCredit": "Bordeaux Kompass",
    "note": "图示年份为 2019，仅供辨识酒款，不代表漫画中所有年份。"
  },
  "manga-76ff5cc88fb8": {
    "src": "labels/haut-brion.png",
    "wine": "haut-brion",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://www.farrvintners.com/wine.php?wine=2201",
    "sourceCredit": "Farr Vintners",
    "note": "通用酒标，图中未印年份；不代表漫画所列年份的实物。"
  },
  "manga-3071dcdb9946": {
    "src": "labels/petrus.jpg",
    "wine": "petrus",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://www.farrvintners.com/wine.php?wine=3894",
    "sourceCredit": "Farr Vintners",
    "note": "通用酒标，图中未印年份；不代表漫画所列年份的实物。"
  },
  "manga-973e10b9e54f": {
    "src": "labels/leoville-las-cases.jpg",
    "wine": "leoville-las-cases",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://www.farrvintners.com/wine.php?wine=2938",
    "sourceCredit": "Farr Vintners",
    "note": "通用酒标，图中未印年份；不代表漫画所列年份的实物。"
  },
  "manga-d2b7325bcb04": {
    "src": "labels/nenin.jpg",
    "wine": "nenin",
    "kind": "label",
    "visibleVintage": null,
    "sourcePage": "https://www.farrvintners.com/wine.php?wine=3559",
    "sourceCredit": "Farr Vintners",
    "note": "通用酒标，图中未印年份；不代表漫画所列年份的实物。"
  },
  "manga-42d76a2fb6df": {
    "src": "labels/mont-perat.jpg",
    "wine": "Chateau Mont-Perat",
    "kind": "label",
    "visibleVintage": "2006",
    "sourcePage": "https://bordeaux-kompass.de/wp-content/BDX_PRO/BDX/CHATEAUX/001579.html",
    "sourceCredit": "Bordeaux Kompass",
    "note": "图示年份为 2006，仅供辨识酒款，不代表漫画中所有年份。来源分辨率有限。",
    "crop": {
      "x": 89,
      "y": 68,
      "width": 96,
      "height": 221,
      "imageWidth": 204,
      "imageHeight": 300
    }
  }
});

for(const [oldId,newId] of Object.entries({"manga-973e10b9e54f": "leoville-las-cases-grand", "manga-7260910c621c": "ducru-beaucaillou-grand", "manga-0af3bf460644": "leoville-barton-grand", "manga-87c873793ab3": "cos-destournel-grand", "manga-92415598bb1a": "montrose-grand", "manga-43862dac2843": "calon-segur-grand", "manga-b0b6f8c2ae40": "chasse-spleen-grand", "manga-76ff5cc88fb8": "haut-brion-grand", "manga-807e942e45dd": "pape-clement-grand", "manga-3071dcdb9946": "petrus-grand", "manga-edc394f2ea5c": "ausone-grand", "manga-4ba4d8de6434": "guigal-cote-rotie-la-mouline", "manga-ef35986befb0": "clos-rougeard-le-clos"})){if(WINE_IMAGES[oldId]&&!WINE_IMAGES[newId])WINE_IMAGES[newId]=WINE_IMAGES[oldId];}
