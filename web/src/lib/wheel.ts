export function winningRotation(index:number,count:number,current=0):number{
 if(index<0||index>=count||count<1)throw new RangeError('Invalid wheel selection.');
 const segment=360/count;const target=360-(index+.5)*segment;const normalized=((current%360)+360)%360;
 return current+1440+((target-normalized+360)%360);
}
export function indexAtPointer(rotation:number,count:number):number{const segment=360/count;const angle=((360-(rotation%360))+360)%360;return Math.floor(angle/segment)%count;}
