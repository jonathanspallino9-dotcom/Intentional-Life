export type ID = string;
export type LocalDate = string; // YYYY-MM-DD in device-local calendar
export type EffortTier = 'SMALL'|'STANDARD'|'MAJOR';
export const EFFORT_POINTS: Record<EffortTier,number>={SMALL:1,STANDARD:2,MAJOR:3};
export type RecurrenceType='NONE'|'DAILY'|'WEEKLY'|'SPECIFIC_WEEKDAYS';
export type Weekday=0|1|2|3|4|5|6; // Sunday=0
export interface RecurrenceRule { type:RecurrenceType; weekdays?:Weekday[] }
export interface Activity {id:ID;createdAt:string;archivedAt?:string|null}
export interface ActivityVersion {id:ID;activityId:ID;effectiveFrom:LocalDate;name:string;description?:string;effortTier:EffortTier;recurrence:RecurrenceRule;startDate:LocalDate;scheduledDate?:LocalDate}
export type OccurrenceStatus='PENDING'|'COMPLETED'|'MISSED';
export interface Occurrence {id:ID;activityId:ID;activityVersionId:ID;effectiveStart:LocalDate;effectiveEnd:LocalDate;nameSnapshot:string;descriptionSnapshot?:string;effortTierSnapshot:EffortTier;pointValueSnapshot:number;status:OccurrenceStatus;completedAt?:string;completedEffectiveDate?:LocalDate}
export type DayType='NORMAL'|'INTENTIONAL_REST';
export interface DayRecord {id:ID;localDate:LocalDate;taskPointTargetSnapshot:number;dayType:DayType;closedAt?:string}
export interface Domain {id:ID;name:string;displayOrder:number}
export interface Intention {id:ID;dayId:ID;domainId:ID;text:string;createdAt:string}
export type DomainOutcome='ACHIEVED'|'PARTIAL'|'NOT_TODAY';
export interface Reflection {id:ID;intentionId:ID;outcome:DomainOutcome;text:string;recordedAt:string}
export type ProductivityEventType='TASK_COMPLETED'|'DOMAIN_ACHIEVED'|'DOMAIN_PARTIALLY_ACHIEVED'|'BOUNCE_BACK_COMPLETED'|'DELIBERATE_DAY_COMPLETED';
export interface ProductivityEvent {id:ID;type:ProductivityEventType;sourceId:ID;effectiveDate:LocalDate;recordedAt:string;payload?:Record<string,unknown>;version:1}
export type ThemeId='MOONLIT_SANCTUARY'|'SUNLIT_GROVE'|'EMBER_STONE'|'CELESTIAL_MINIMAL'|'TWILIGHT_BLOOM';
export interface Settings {id:'singleton';mantra:string;defaultTaskPointTarget:number;theme:ThemeId}
export interface Metadata {key:string;value:string}
