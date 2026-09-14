import {describe,expect,it} from 'vitest';

type View='SETTLEMENT'|'CARPENTER'|'FURNITURE'|'HOME';
function renderBuilding(b:{type:string}){return {...b,buildingType:b.type,type:'building'};}
function payloadFromTap(o:any){return o.type==='building'?{...o,type:o.buildingType}:null;}
function route(type:string):View{return type==='CARPENTER'?'CARPENTER':type==='FURNITURE_STORE'?'FURNITURE':type==='COTTAGE'?'HOME':'SETTLEMENT';}

describe('settlement building routing regression',()=>{
  for(const [building,destination] of [['COTTAGE','HOME'],['CARPENTER','CARPENTER'],['FURNITURE_STORE','FURNITURE']] as const){
    it(`${building} tap routes to ${destination}`,()=>{
      const rendered=renderBuilding({type:building});
      expect(rendered.type).toBe('building');
      expect(rendered.buildingType).toBe(building);
      const tapped=payloadFromTap(rendered)!;
      expect(tapped.type).toBe(building);
      expect(route(tapped.type)).toBe(destination);
    });
  }
  it('decor does not route',()=>expect(payloadFromTap({type:'decor'})).toBeNull());
});
