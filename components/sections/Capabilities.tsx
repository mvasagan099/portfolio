import Link from "next/link";
import { AppWindow, Radio, Smartphone, Workflow, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
const capabilities = [
  { icon: AppWindow, title: "Interfaces that feel considered.", text: "Responsive web applications with clear navigation, useful feedback, and attention to everyday interactions.", stack: "React · Next.js · TypeScript", color: "text-accent", href:"#projects" },
  { icon: Radio, title: "Systems that stay connected.", text: "APIs, WebSockets, shared state, and reconnect flows for applications that need to work together in real time.", stack: "Node.js · Socket.IO · Redis", color: "text-violet-300", href:"/projects/gaming-hub/" },
  { icon: Smartphone, title: "Beyond the browser.", text: "Mobile experiences that connect native permissions, authentication, local storage, and cloud services.", stack: "Flutter · Capacitor · Supabase", color: "text-sky-300", href:"/projects/calculator-messenger/" },
  { icon: Workflow, title: "Built with the full picture.", text: "From database structure and service integration to containerized deployments and release verification.", stack: "PostgreSQL · Docker · CI/CD", color: "text-amber-200", href:"#experience" },
];
export default function Capabilities() {
 return <section id="capabilities" className="mx-auto max-w-content px-6 py-20"><SectionHeading id="capabilities" kicker="What I bring" title="The details matter. So does the bigger picture." /><div className="mt-10 grid gap-4 md:grid-cols-2">{capabilities.map((c,i)=><Link href={c.href} key={c.title} className="capability-card group relative rounded-2xl border border-border bg-surface/40 p-7 transition-colors hover:border-accent/30"><div className="flex items-center justify-between"><span className={`flex h-11 w-11 items-center justify-center rounded-xl border border-current/10 bg-white/[.025] ${c.color}`}><c.icon size={22} /></span><span className="font-mono text-[10px] text-muted/60">0{i+1}</span></div><h3 className="mt-7 text-xl font-medium tracking-tight">{c.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-muted">{c.text}</p><div className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-5"><p className="font-mono text-[10px] text-muted">{c.stack}</p><ArrowUpRight size={16} className={c.color} /></div></Link>)}</div></section>;
}
