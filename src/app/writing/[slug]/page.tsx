import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default function Post({ params }:{params:{slug:string}}){
  const file = path.join(process.cwd(), "content", "writing", `${params.slug}.mdx`);
  if(!fs.existsSync(file)) return notFound();
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      <article className="prose prose-invert max-w-none mt-8">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
