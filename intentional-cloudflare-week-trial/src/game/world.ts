import type {Building} from './types';

export const ART_TILE_PX=16;
export const SETTLEMENT_GRID={width:24,height:20} as const;
export type PlacementClass='GROUND'|'SMALL'|'TALL'|'STRUCTURE';
export type WorldObject={id:string;x:number;y:number;width:number;height:number;placementClass:PlacementClass;depthAnchorX?:number;depthAnchorY?:number;depthBias?:number};
export type ClearanceZone={id:string;ownerId:string;x:number;y:number;width:number;height:number;blockedClasses:PlacementClass[]};
export type RenderPart={objectId:string;part:'BASE'|'UPPER';depth:number};

export function depthAnchor(o:WorldObject){return{x:o.depthAnchorX??o.x+(o.width-1)/2,y:o.depthAnchorY??o.y+o.height-1}}
export function depthValue(o:WorldObject){const a=depthAnchor(o);return a.y+(o.depthBias??0)}
export function compareDepth(a:WorldObject,b:WorldObject){const da=depthValue(a),db=depthValue(b);if(da!==db)return da-db;const aa=depthAnchor(a),ab=depthAnchor(b);if(aa.x!==ab.x)return aa.x-ab.x;return a.id.localeCompare(b.id)}
export function sortByDepth<T extends WorldObject>(objects:T[]){return [...objects].sort(compareDepth)}
export function clearanceOverlap(a:{x:number;y:number;width:number;height:number},z:ClearanceZone){return a.x<z.x+z.width&&a.x+a.width>z.x&&a.y<z.y+z.height&&a.y+a.height>z.y}
export function violatesClearance(item:WorldObject,zones:ClearanceZone[]){return zones.some(z=>z.ownerId!==item.id&&z.blockedClasses.includes(item.placementClass)&&clearanceOverlap(item,z))}
export function canPlaceWorld(item:WorldObject,others:WorldObject[],zones:ClearanceZone[],grid=SETTLEMENT_GRID){return item.x>=0&&item.y>=0&&item.x+item.width<=grid.width&&item.y+item.height<=grid.height&&!others.some(o=>item.x<o.x+o.width&&item.x+item.width>o.x&&item.y<o.y+o.height&&item.y+item.height>o.y)&&!violatesClearance(item,zones)}
export function buildingWorldObject(b:Building):WorldObject{return{id:b.id,x:b.x,y:b.y,width:b.width,height:b.height,placementClass:'STRUCTURE'}}
export function entranceClearance(b:Building,depth=2):ClearanceZone{return{id:`clearance:${b.id}:entrance`,ownerId:b.id,x:b.x+Math.max(0,Math.floor(b.width/2)-1),y:b.y+b.height,width:Math.min(2,b.width),height:depth,blockedClasses:['TALL','STRUCTURE']}}
export function renderParts(objects:(WorldObject&{splitUpper?:boolean})[]):RenderPart[]{const sorted=sortByDepth(objects);const parts:RenderPart[]=[];for(const o of sorted){const d=depthValue(o);parts.push({objectId:o.id,part:'BASE',depth:d});if(o.splitUpper)parts.push({objectId:o.id,part:'UPPER',depth:d+0.0001})}return parts}
