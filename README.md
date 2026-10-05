# WineTouring · 天地人葡萄酒地图

法国葡萄酒产区、酒庄与酒款的交互地图，包含《神之水滴》酒款筛选、搜索和按年份收藏功能。

## 在 Mac 上打开

```bash
git clone https://github.com/MrLeo666/WineTouring.git
cd WineTouring
npm ci
npm run build
node scripts/check.mjs
```

安装 Node.js 22.13 或更新版本，建议使用 Node.js 24 LTS。验证脚本使用 `node:sqlite`。
在 Codex 中添加这个本地文件夹即可继续开发。

## 预览地图

```bash
python3 -m http.server 8000 --directory web
```

浏览器打开 http://localhost:8000。此方式可以查看地图、搜索与酒款资料；收藏 API 需要 Worker、D1 数据库和经过认证的用户身份，静态预览不提供云端收藏功能。

## 文件结构

- `web/`：页面、交互代码、酒款目录、地图、酒标和酒庄图片。
- `worker/index.js`：网站服务与收藏 API。
- `db/`、`drizzle/`：数据库结构与迁移。
- `scripts/`：构建、验证、资料导入和补全工具。
- `research/`：研究来源、导入记录、数据检查与待办。
- `.openai/hosting.json`：现有网站的部署关联配置。

`npm run build` 生成 `dist/server/index.js`。收藏数据库中的现有用户记录不包含在此源码仓库中；网站当前的数据库仍由原部署管理。

## 开发交接

本次同步以原网站源码提交 `5ea025ed843497d720c1760e7effa5fc7e45c585` 为基准，保留全部已跟踪的代码、数据、图片和研究文件。

后续重点：核验圣埃美隆酒庄地图标注和酒标覆盖，继续补全法国酒庄资料，检查漫画页面加载速度。既有需求包括搜索酒款、各级产区地图的“神之水滴”筛选、漫画酒款与常规档案合并，以及按酒款和年份收藏。

修改数据后先构建并运行现有验证脚本。地图坐标、酒标和酒庄信息应保留来源，不要用未经核实的数据填补缺口。网站部署和 GitHub 源码同步是独立操作；推送此仓库不会自动更新原网站。
