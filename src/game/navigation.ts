import type {BuildingType} from './types';
export type GrowDestination='HOME'|'CARPENTER'|'FURNITURE'|null;
export function destinationForBuilding(type:BuildingType):GrowDestination{
 if(type==='COTTAGE')return 'HOME';
 if(type==='CARPENTER')return 'CARPENTER';
 if(type==='FURNITURE_STORE')return 'FURNITURE';
 return null;
}
