import Dexie,{type EntityTable} from 'dexie';
import type {Activity,ActivityVersion,DayRecord,Domain,Intention,Metadata,Occurrence,ProductivityEvent,Reflection,Settings} from '../core/types';
import type {Building,GameLedgerEntry,GameState,NpcProgress,OwnedItem,PlacedItem} from '../game/types';
export class IntentionalDB extends Dexie {
 activities!:EntityTable<Activity,'id'>;activityVersions!:EntityTable<ActivityVersion,'id'>;occurrences!:EntityTable<Occurrence,'id'>;dayRecords!:EntityTable<DayRecord,'id'>;domains!:EntityTable<Domain,'id'>;intentions!:EntityTable<Intention,'id'>;reflections!:EntityTable<Reflection,'id'>;productivityEvents!:EntityTable<ProductivityEvent,'id'>;settings!:EntityTable<Settings,'id'>;metadata!:EntityTable<Metadata,'key'>;
 gameState!:EntityTable<GameState,'id'>;buildings!:EntityTable<Building,'id'>;ownedItems!:EntityTable<OwnedItem,'id'>;placedItems!:EntityTable<PlacedItem,'id'>;gameLedger!:EntityTable<GameLedgerEntry,'id'>;npcProgress!:EntityTable<NpcProgress,'id'>;
 constructor(name='hollowMoon'){super(name);const core={activities:'id,archivedAt',activityVersions:'id,activityId,effectiveFrom',occurrences:'id,activityId,activityVersionId,effectiveStart,effectiveEnd,status,&[activityId+effectiveStart+effectiveEnd]',dayRecords:'id,&localDate',domains:'id,displayOrder',intentions:'id,dayId,domainId,&[dayId+domainId]',reflections:'id,&intentionId',productivityEvents:'id,type,sourceId,effectiveDate,&[type+sourceId]',settings:'id',metadata:'key'};this.version(1).stores(core);this.version(2).stores({...core,gameState:'id',buildings:'id,type,built',ownedItems:'id,catalogItemId',placedItems:'id,ownedItemId,area',gameLedger:'id,kind,sourceId',npcProgress:'id'});}
}
export const db=new IntentionalDB();
