import type {LocalDate} from './types';
export const localDate=(d=new Date()):LocalDate=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`};
export const parseLocal=(s:LocalDate)=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
export const addDays=(s:LocalDate,n:number):LocalDate=>{const d=parseLocal(s);d.setDate(d.getDate()+n);return localDate(d)};
export const weekday=(s:LocalDate)=>parseLocal(s).getDay() as 0|1|2|3|4|5|6;
export const weekStart=(s:LocalDate)=>addDays(s,-weekday(s));
export const weekEnd=(s:LocalDate)=>addDays(weekStart(s),6);
export const previousDay=(s:LocalDate)=>addDays(s,-1);
