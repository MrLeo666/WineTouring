# WineTouring manga catalog: immediate manual continuation

User explicitly rejected scheduling. Do not create, resume, or run scheduled work. Continue only as foreground user-authorized work.

User request (29 September 2026, Asia/Hong_Kong): attach real LABEL-ONLY images, research as comprehensively as possible all wines mentioned in The Drops of God manga through the night, mark them on the existing map, deduplicate against all already plotted wines, and add the original manga logo beside any wine that appears in the manga. Do not replace the existing Site or existing user favorites. User explicitly authorizes research, editing and publishing; no messaging to third parties is authorized.

Existing Site: appgprj_6abbb5042e788191a2f20a36160bf001
URL: https://terroir-wine-atlas.leolai666.chatgpt.site
Use Sites tools/skills to open its latest source at the start of each run, inspect access, edit and publish the same owner-private Site. Never rely on prior scratch availability. Never create a replacement Site. No credentials are saved here; obtain a current Sites source credential each run. This is finite research/feature completion, not a permanent periodic content refresh.

## Current implementation
- Custom plain-JavaScript frontend in `web/`, embedded in a Cloudflare Worker by `scripts/build.mjs`.
- D1-backed favorites, private per authenticated user. Existing migration is immutable. No schema change is needed for content work.
- Original geography and wine records: data.js, deep-data.js, pauillac-data.js, margaux-data.js; the existing label catalog is label-data.js.
- Twelve apostles: apostles-data.js. Unified working catalog: manga-data.js. Manga UI: manga-ui.js. Images: manga-labels.js. Source evidence and pending work are in research/.
- `research/candidate-index.json`: 692 volume-level rows from a public index spanning original volumes 1–44; this is NOT proof of exhaustive original-page review.
- `scripts/import-manga.mjs` normalizes obvious producer aliases, preserves 20 old wine IDs, coalesces repeated wine/vintage/volume occurrences, excludes Fine de Bourgogne spirit, and writes current candidate catalog. `research/import-status.json` counts are preliminary. Do not blindly regenerate after manual corrections: preserve verified corrections/extra sources and canonical IDs, or extend the generator to replay them.
- `research/source-geography.json` contains only factual metadata, no tasting prose. Existing mapped coordinates include broad region centroids inferred from appellation or secondary metadata; displayed precision makes this explicit. Many wines remain without coordinates and are visible in the list, not fabricated on the map.
- `research/wine-id-aliases.json`: when merging a previously published duplicate, record old ID => surviving ID. The backend resolves aliases on read/save/delete so saved favorites survive. Keep original IDs authoritative. Do not renumber all IDs.

## Research priorities
1. Finish true label-only artwork for Pegau Cuvée Da Capo, Michel Colin-Deléger Chevalier-Montrachet, Selosse Exquise, Robert Sirugue Grands Échezeaux, Ferrer Bobet Selecció Especial. Inspect exact producer, cuvée, and visible vintage. Never replace with another producer/cuvée, invented image or whole-bottle shot. Existing seven assets have careful captions: Roumier 2001 close-up, Sandrone 2001, SQN 2003 series art (variety not printed), Yquem 1976 detached-label photo, vintage-free Palmer/Lafleur, and modern Poggio label explicitly NOT 2005-era. Improve lower-confidence examples if real historical scans become available.
2. Cross-check every original-volume record against Japanese volume lists (source independence unverified) and, where publicly available, publisher/author resources or original pages. Do not claim original-page verification when only secondary lists were read. Track completed volume ranges and unresolved conflicts in research/progress.json (create it).
3. Resolve duplicate wine names, producer aliases, historic naming, incorrect producer assignments, and red/white/cuvée distinctions. Same estate is not automatically the same wine. Same vineyard with different producers remains distinct. A year omitted in a manga list is unknown, NOT NV. A current seller's pictured year is not automatically the manga year.
4. Improve precise appellation and producer location sourcing, using producer/consortium primary sources. Keep approximate region points labeled; do not invent estate coordinates. Group same-location wines on the map. Retain uncertain wines in the searchable pending list.
5. Extend completeness to original all 44 volumes. Then inventory `Mariage / 最終章` (26 volumes) and later sequel separately with an explicit `series` field. Do not mix TV adaptations into manga evidence; do not label sequel wines as original-volume appearances.
6. Add real label images to other featured wines where attainable, with source page, image URL, visible vintage and provenance. Maintain label-only convention.
7. Preserve the manga logo as the original publisher artwork displayed through a clipped CSS viewport. `web/labels/manga-publisher-art.jpg` comes from https://morning.kodansha.co.jp/content/images/c/kaminoshizuku/wide.jpg ; no fake logo redraw. Badge membership is driven by MANGA_BY_ID and must appear on existing matching wine cards/details too.

## Sources and known cautions
- https://www.drops-of-god.com/en/wines/ and /en/volumes/1/ through /44/: working source. Has roughly 706 displayed appearances (including apostle/final candidate sections), not that many unique wines. Index and review counts vary. Its tasting prose and some metadata appear unreliable: use only sourced factual clues, never its ratings/tasting prose as evidence. Original 44-volume list currently yields 692 rows.
- https://kaminoshizuku.com/kami001/ through /kami044/: Japanese volume lists (source independence unverified). These also contain errors, e.g. some Mouton rows mislabeled Burgundy. Reconcile, don't assume perfect.
- https://kaminoshizuku.com/mariage/ (discover exact next paths from links), Wine Wine Club, Comic Gourmet, and producer/consortium sites can supplement. Source discovery should respect public access; no paywall bypass.
- Known conflict: Lafite in original volume 44 is listed 1982 by English index and 1985 by Japanese list. Display pending conflict until original evidence resolves it.
- The English index has suspicious mappings such as Moulin Haut-Laroque => Château Moulin-à-Vent and Bel-Air la Royère => Belair-Monange. Verify, correct and record evidence, do not merely translate them.
- Direct public `curl -L --fail --max-time 35 URL` worked for source HTML and the publisher/producer PDF; Python urllib intermittently 403ed. Do not bypass genuine access denial. The HTML index exposes factual wine data in `data-wine-search-json` but only for published entries; draft entries are in the visible HTML. Do not copy third-party creative descriptions.
- Images/evidence references are in research/label-candidates.json. Paths in that file are original candidate filenames, not guaranteed downloadable assets; use the source URLs and current web/labels/ assets. The Drinks Business PDF hosted by Château Le Puy has original embedded images; `pdfimages -j` can extract them without inventing images. Many are bottles/illustrations, not acceptable pure labels.

## Validation and delivery
- Run `node scripts/build.mjs`, `node scripts/check.mjs`, and syntax checks for changed frontend scripts. Additional focused UI checks are useful when changing interactions. No browser preview was available for this custom Worker; do not claim visual browser QA unless actually performed.
- `dist/.openai/hosting.json` requires `d1: "DB"`; `dist/server/index.js` exports fetch; migrations are copied to dist/.openai/drizzle. Build copies real assets into the Worker; preserve source and all existing labels.
- Publish exact pushed source and archive via standard Sites workflow, verify terminal success. Don't silently make the Site public.
- Update research progress, sources, unresolved records, actual counts and remaining gaps before each publish, enabling a subsequent user-requested continuation.
- Report in Chinese concise actual progress and gaps. Final morning update should include the Site URL, counts distinguishing candidate/verified/mapped/images, what is unresolved, and whether scope beyond the original 44 volumes was reached. Never claim all wines are found or verified unless supported by coverage audit.

## Latest checkpoint
See progress.json, import-status.json, review-status.json and mariage-status.json for current counts. All 44 original lists compared to Japanese lists, plus 26 Mariage lists indexed. 10 of 12 apostles have label images (one back label); six additional manga labels added. Original-page verification remains incomplete. No scheduled continuation.
