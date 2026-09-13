import type {ProductivityEvent} from '../core/types';import {REWARD_BY_EVENT} from './types';
export function rewardForEvent(e:ProductivityEvent){return e.type==='TASK_COMPLETED'?Number(e.payload?.points??0):REWARD_BY_EVENT[e.type]}
export function cellsOverlap(a:{x:number;y:number;width:number;height:number},b:{x:number;y:number;width:number;height:number}){return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y}
export function canPlace(item:{x:number;y:number;width:number;height:number},others:{x:number;y:number;width:number;height:number}[],gridW:number,gridH:number){return item.x>=0&&item.y>=0&&item.x+item.width<=gridW&&item.y+item.height<=gridH&&!others.some(o=>cellsOverlap(item,o))}
