import * as React from "react";
export function Tabs({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }
export function TabsList({ children }: { children: React.ReactNode }) { return <div className="flex gap-2 mb-4">{children}</div>; }
export function TabsTrigger({ children, value, setValue, current }:{children:React.ReactNode,value:string,setValue:(v:string)=>void,current:string}){
  const active = current===value;
  return <button onClick={()=>setValue(value)} className={"chip " + (active?"bg-white text-black":"")} aria-pressed={active}>{children}</button>;
}
export function TabsContent({ children, value, current }:{children:React.ReactNode,value:string,current:string}){
  if(current!==value) return null; return <div>{children}</div>;
}
