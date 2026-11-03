import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=path.resolve(process.argv[2] || '');
if (!root || !fs.existsSync(path.join(root,'index.html'))) throw Error('Missing genuine Web build.');
const ePath=path.join(root,'_build-evidence.json');
if(!fs.existsSync(ePath)) throw Error('No release evidence, deployment forbidden.');
const e=JSON.parse(fs.readFileSync(ePath,'utf8'));
if(e.verifiedSource!=='real-engine-not-qa-mock' || e.engine!=='LayaAir 3.4.0 official CLI runtime plus real TS gameplay entry') throw Error('Not official LayaAir build.');
if(e.browserSmokePassed!==true || e.touchSmokePassed!==true ||
  !Array.isArray(e.browserSmokeViewport) || e.browserSmokeViewport.length<2) throw Error('Real browser gameplay tests missing.');
if(!Array.isArray(e.files) || e.files.length<4) throw Error('Missing SHA256 evidence.');
const needed=new Set(['index.html','libs/laya.core.js','js/index.js','js/pohuai-game.js']);
for(const f of e.files) {
  if(!f.path || path.isAbsolute(f.path) || f.path.includes('..') || /\.(ts|tsx|map)$/i.test(f.path)) throw Error('Unsafe artifact path: '+f.path);
  const local=path.join(root,f.path);
  if(!fs.existsSync(local)) throw Error('Missing artifact '+f.path);
  const bytes=fs.readFileSync(local);
  if(bytes.length!==f.bytes || crypto.createHash('sha256').update(bytes).digest('hex')!==f.sha256) throw Error('Artifact not equal to tested build: '+f.path);
  needed.delete(f.path);
}
if(needed.size) throw Error('Critical engine/gameplay files missing: '+[...needed].join(','));
for(const d of ['src','docs','tools','tests','node_modules','.git']) if(fs.existsSync(path.join(root,d))) throw Error('Private source leaked: '+d);
console.log('PUBLIC_PREVIEW_RELEASE_GATE_PASS',e.sourceCommit,e.files.length,'assets');
