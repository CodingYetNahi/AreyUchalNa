export type RandomSource = (array: Uint32Array) => Uint32Array;
const secureSource: RandomSource = (array) => crypto.getRandomValues(array);

export function randomIndex(length: number, source: RandomSource = secureSource): number {
  if (!Number.isSafeInteger(length) || length < 1 || length > 0x100000000) throw new RangeError('Range must be between 1 and 2^32.');
  const limit = Math.floor(0x100000000 / length) * length;
  const buffer = new Uint32Array(1);
  do source(buffer); while (buffer[0]! >= limit);
  return buffer[0]! % length;
}
export function selectOne<T>(items: readonly T[], source?: RandomSource): T {
  if (!items.length) throw new RangeError('At least one item is required.');
  return items[randomIndex(items.length, source)]!;
}
export function shuffle<T>(items: readonly T[], source?: RandomSource): T[] {
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=randomIndex(i+1,source);[result[i],result[j]]=[result[j]!,result[i]!];}
  return result;
}
export function selectMultiple<T>(items: readonly T[], count:number, source?:RandomSource):T[]{
  if(!Number.isInteger(count)||count<1||count>items.length) throw new RangeError('Count must fit the available items.');
  return shuffle(items,source).slice(0,count);
}
export function randomInclusive(min:number,max:number,source?:RandomSource):number{
  if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||min>max) throw new RangeError('Use a valid whole-number range.');
  const range=max-min+1;if(range>0x100000000) throw new RangeError('Range is too large.');
  return min+randomIndex(range,source);
}
export interface Team {name:string;members:string[]}
export function generateTeams(people:readonly string[],names:readonly string[],source?:RandomSource):Team[]{
  if(names.length<2) throw new RangeError('At least two teams are required.');
  const teams=names.map((name)=>({name,members:[]}));
  shuffle(people,source).forEach((person,index)=>teams[index%teams.length]!.members.push(person));
  return teams;
}
export interface EliminationRound<T>{selected:T;remaining:T[];finished:boolean}
export function eliminateOne<T>(items:readonly T[],source?:RandomSource):EliminationRound<T>{
  if(items.length<2) throw new RangeError('At least two items must remain.');
  const selected=selectOne(items,source);const index=items.indexOf(selected);
  const remaining=items.filter((_,i)=>i!==index);
  return {selected,remaining,finished:remaining.length===1};
}
