import {describe,expect,it} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {destinationForBuilding} from '../src/game/navigation';

describe('Grow building navigation regression',()=>{
 it('routes current enterable buildings',()=>{
  expect(destinationForBuilding('COTTAGE')).toBe('HOME');
  expect(destinationForBuilding('CARPENTER')).toBe('CARPENTER');
  expect(destinationForBuilding('FURNITURE_STORE')).toBe('FURNITURE');
 });
 it('does not subscribe the root live query to NPC bookkeeping',()=>{
  const source=fs.readFileSync(path.resolve('src/ui/App.tsx'),'utf8');
  const liveQuery=source.match(/useLiveQuery\(async\(\)=>\(\{([\s\S]*?)\}\),\[ready\]\)/)?.[1]??'';
  expect(liveQuery).not.toContain('npcProgress');
 });
});
