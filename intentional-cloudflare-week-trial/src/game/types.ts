import type {ID,ProductivityEventType} from '../core/types';
export type BuildingType='COTTAGE'|'CARPENTER'|'FURNITURE_STORE'|'TAILOR'|'GALLERY'|'NURSERY'|'PAINTER'|'THEME_SHOP';
export type ItemCategory='FURNITURE'|'RUG'|'FLOORING'|'WALLPAPER'|'CLOTHING'|'ART'|'LANDSCAPING'|'BUILDING_STYLE'|'THEME';
export interface GameState{id:'singleton';currency:number;settlementLevel:number;createdAt:string}
export interface Building{id:ID;type:BuildingType;name:string;level:number;x:number;y:number;width:number;height:number;built:boolean;overgrown:boolean}
export interface CatalogItem{id:ID;shop:BuildingType;name:string;category:ItemCategory;price:number;permanent:boolean;minShopLevel:number;width?:number;height?:number}
export interface OwnedItem{id:ID;catalogItemId:ID;acquiredAt:string;quantity:number}
export interface PlacedItem{id:ID;ownedItemId:ID;area:'HOME'|'SETTLEMENT';x:number;y:number;width:number;height:number}
export interface GameLedgerEntry{id:ID;kind:'EARN'|'SPEND';amount:number;sourceId:ID;sourceType:string;createdAt:string}
export interface NpcProgress{id:BuildingType;met:boolean;interactionCount:number;relationshipLevel:number}
export const REWARD_BY_EVENT:Record<ProductivityEventType,number>={TASK_COMPLETED:0,DOMAIN_ACHIEVED:2,DOMAIN_PARTIALLY_ACHIEVED:1,BOUNCE_BACK_COMPLETED:2,DELIBERATE_DAY_COMPLETED:5};
