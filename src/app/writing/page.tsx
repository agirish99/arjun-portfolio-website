import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export default function WritingPage(){
  const dir = path.join(process.cwd(), "content", "writing");
  const items = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f=>f.endsWith(".mdx")).map((f)=>{
    const raw = fs.readFileSync(path.join(dir, f), "utf-8");
    const { data } = matter(raw);
    return { title: data.title, slug: data.slug, summary: data.summary };
  }) : [];
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold mb-6">Writing</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map(p => (
          <Link key={p.slug} href={`/writing/${p.slug}`} className="block rounded-xl bg-white/5 p-5 border border-white/10 hover:bg-white/10">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="opacity-80">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
