import {EFFORT_POINTS,type ActivityVersion,type DayRecord,type Domain,type Intention,type LocalDate,type Occurrence,type Reflection} from './types';
import {weekday,weekEnd,weekStart} from './dates';
export function expectedPeriod(v:ActivityVersion,date:LocalDate):{start:LocalDate,end:LocalDate}|null{
 if(date<v.startDate)return null;
 if(v.recurrence.type==='NONE') return v.scheduledDate===date?{start:date,end:date}:null;
 if(v.recurrence.type==='DAILY') return {start:date,end:date};
 if(v.recurrence.type==='SPECIFIC_WEEKDAYS') return v.recurrence.weekdays?.includes(weekday(date))?{start:date,end:date}:null;
 if(v.recurrence.type==='WEEKLY'){const start=weekStart(date);return date===start&&weekEnd(date)>=v.startDate?{start,end:weekEnd(date)}:null}
 return null;
}
export const occurrenceKey=(activityId:string,start:LocalDate,end:LocalDate)=>`${activityId}|${start}|${end}`;
export const snapshotOccurrence=(v:ActivityVersion,start:LocalDate,end:LocalDate,id:string):Occurrence=>({id,activityId:v.activityId,activityVersionId:v.id,effectiveStart:start,effectiveEnd:end,nameSnapshot:v.name,descriptionSnapshot:v.description,effortTierSnapshot:v.effortTier,pointValueSnapshot:EFFORT_POINTS[v.effortTier],status:'PENDING'});
export const taskPointsForDay=(date:LocalDate,occurrences:Occurrence[])=>occurrences.filter(o=>o.status==='COMPLETED'&&o.completedEffectiveDate===date).reduce((n,o)=>n+o.pointValueSnapshot,0);
export function isDeliberateDay(day:DayRecord,domains:Domain[],intentions:Intention[],reflections:Reflection[],occurrences:Occurrence[]){
 const dayIntentions=intentions.filter(i=>i.dayId===day.id); if(domains.length!==4||dayIntentions.length!==4)return false;
 if(dayIntentions.some(i=>!reflections.some(r=>r.intentionId===i.id)))return false;
 return day.dayType==='INTENTIONAL_REST'||taskPointsForDay(day.localDate,occurrences)>=day.taskPointTargetSnapshot;
}
export function bounceBackEligible(domainId:string,previousDayId:string,intentions:Intention[],reflections:Reflection[]){const i=intentions.find(x=>x.dayId===previousDayId&&x.domainId===domainId);if(!i)return false;const r=reflections.find(x=>x.intentionId===i.id);return r?.outcome==='PARTIAL'||r?.outcome==='NOT_TODAY'}
