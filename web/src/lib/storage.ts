export interface SavedList{id:string;name:string;options:string[]}
export interface StorageResult{lists:SavedList[];error:string|null}
export const STORAGE_KEY='arey-uchal-na.lists.v1';
export function loadLists(storage:Pick<Storage,'getItem'>):StorageResult{try{const raw=storage.getItem(STORAGE_KEY);if(!raw)return {lists:[],error:null};const value:unknown=JSON.parse(raw);if(!Array.isArray(value)||!value.every(isSavedList))throw new Error();return {lists:value,error:null};}catch{return {lists:[],error:'Saved lists could not be read. Your current choices are still safe.'}}}
function isSavedList(x:unknown):x is SavedList{if(!x||typeof x!=='object')return false;const v=x as Record<string,unknown>;return typeof v.id==='string'&&typeof v.name==='string'&&Array.isArray(v.options)&&v.options.every(o=>typeof o==='string')}
export function saveLists(storage:Pick<Storage,'setItem'>,lists:SavedList[]):string|null{try{storage.setItem(STORAGE_KEY,JSON.stringify(lists));return null}catch{return 'This browser did not allow saved-list storage.'}}
