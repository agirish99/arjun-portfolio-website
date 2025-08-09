import { loadProject } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

export default function ProjectDetail({ params }: { params: { slug: string } }){
  const project = loadProject(params.slug);
  if(!project) return notFound();
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <p className="opacity-80">{project.summary}</p>
      {project.cover ? <div className="mt-4"><Image src={project.cover} alt="" width={1200} height={630} /></div> : null}
      <article className="prose prose-invert max-w-none mt-8">
        <MDXRemote source={project.body} />
      </article>
      <div className="mt-6 flex gap-3">
        {project.demo ? <a className="underline" href={project.demo} target="_blank">Live demo</a> : null}
        {project.repo ? <a className="underline" href={project.repo} target="_blank">Source</a> : null}
      </div>
    </div>
  );
}
