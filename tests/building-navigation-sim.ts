import {destinationForBuilding} from '../src/game/navigation';
const cases:any[]=[
 ['COTTAGE','HOME'],
 ['CARPENTER','CARPENTER'],
 ['FURNITURE_STORE','FURNITURE'],
 ['TAILOR',null],['GALLERY',null],['NURSERY',null],['PAINTER',null],['THEME_SHOP',null]
];
for(const [input,expected] of cases){
 const actual=destinationForBuilding(input);
 if(actual!==expected)throw new Error(`${input}: expected ${expected}, got ${actual}`);
}
for(let i=0;i<10000;i++){
 const [input,expected]=cases[i%cases.length];
 if(destinationForBuilding(input)!==expected)throw new Error(`randomized failure at ${i}`);
}
console.log('Building navigation simulation: PASS (10,000 randomized checks)');
