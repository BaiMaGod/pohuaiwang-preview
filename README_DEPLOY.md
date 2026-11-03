# 破坏就能变强 · 公开预览部署仓库

**本仓库只保存部署配置，不保存私有游戏源码。** 首次成功运行后，GitHub Pages 只发布官方 LayaAir 3.4 CLI 编译、浏览器真实试玩、SHA256校验通过的Web产物。

正式源码仓库：https://github.com/BaiMaGod/pohuaiwang

## 一次性配置（仓库所有者）

1. 在本仓库 Settings → Pages → Build and deployment，设置 Source 为 GitHub Actions。
2. 在 GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens，生成只针对私有 BaiMaGod/pohuaiwang 仓库的只读 Token，权限只勾选 Contents: Read-only，尽量设置短有效期。
3. 在本仓库 Settings → Secrets and variables → Actions → New repository secret 新增 LAYA_SOURCE_READ_TOKEN 并填入该 Token。不要把 Token 发给AI或保存进代码。
4. 在 Actions 里运行 Build private LayaAir game and deploy Pages（Run workflow）。

## 发布必须通过

- 私有源码检出和版本确认。
- TypeScript检查及规则单测。
- 官方 LayaAir 3.4.0 CLI 真实创建3D空模板并编译Web。
- 业务 TypeScript 作为真实游戏入口接入官方Web脚本。
- Chromium 在390×844和375×667两个视口真实输入、摧毁物品、对抗保安、结算成功。
- Web目录完整SHA256证明，二次验证，不含私有TS和源映射。
- 仅部署本次构建且验收通过的Web包，部署后检查页面与游戏JS。

任何一步失败则停止发布。没有使用假引擎、Canvas替身或旧包兜底。工作流仅允许 workflow_dispatch 手动触发，公开PR不会运行带Token的步骤。

正式部署成功后预期页面地址：https://baimagod.github.io/pohuaiwang-preview/

**当前状态：部署流程已配置，但不代表发布成功。需要设置只读Secret并通过首次构建、真实试玩和Pages部署。**
