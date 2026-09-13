import {db} from './db';
export interface Backup{format:'intentional-productivity-backup';backupFormatVersion:1;databaseSchemaVersion:1|2;createdAt:string;data:Record<string,unknown[]>}
const coreTables=['settings','domains','activities','activityVersions','occurrences','dayRecords','intentions','reflections','productivityEvents','metadata'] as const;
const gameTables=['gameState','buildings','ownedItems','placedItems','gameLedger','npcProgress'] as const;
const allTables=[...coreTables,...gameTables] as const;
export async function createBackup():Promise<Backup>{const data:Record<string,unknown[]>={};for(const name of allTables)data[name]=await db.table(name).toArray();return{format:'intentional-productivity-backup',backupFormatVersion:1,databaseSchemaVersion:2,createdAt:new Date().toISOString(),data}}
export function validateBackup(x:any):x is Backup{return x?.format==='intentional-productivity-backup'&&x?.backupFormatVersion===1&&(x?.databaseSchemaVersion===1||x?.databaseSchemaVersion===2)&&coreTables.every(t=>Array.isArray(x.data?.[t]))&&(x.databaseSchemaVersion===1||gameTables.every(t=>Array.isArray(x.data?.[t])))}
export async function restoreBackup(b:Backup){if(!validateBackup(b))throw new Error('Invalid or incompatible backup');await db.transaction('rw',allTables.map(t=>db.table(t)),async()=>{for(const name of allTables){await db.table(name).clear();const rows=b.data[name]??[];if(rows.length)await db.table(name).bulkAdd(rows)}})}
export async function downloadBackup(){const b=await createBackup();const blob=new Blob([JSON.stringify(b,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`intentional-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url)}
