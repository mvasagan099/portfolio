"use client";
import { Download } from "lucide-react";
export default function PrintResume() {
  return <button type="button" onClick={()=>window.print()} className="flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-background"><Download size={16} />Print / Save PDF</button>;
}
