import type {Occurrence} from './types';
export function streakStats(occurrences:Occurrence[]){const xs=[...occurrences].sort((a,b)=>a.effectiveStart.localeCompare(b.effectiveStart));let current=0,best=0,lifetime=0;for(const o of xs){if(o.status==='COMPLETED'){current++;lifetime++;best=Math.max(best,current)}else if(o.status==='MISSED')current=0}return{current,best,lifetime}}
