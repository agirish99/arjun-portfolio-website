import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import YAML from "yaml";

const root = process.cwd();
const contentDir = path.join(root, "content");

// Schemas
export const SiteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  location: z.string(),
  email: z.string().email(),
  phone: z.string(),
  socials: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    plausibleDomain: z.string().optional()
  }),
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    scene: z.string().optional()
  })
});

export const SkillsSchema = z.record(z.array(z.string()));

export const ExperienceItem = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string().optional(),
  start: z.string(),
  end: z.string(),
  highlights: z.array(z.string())
});
export const ExperienceSchema = z.array(ExperienceItem);

export const ProjectFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.number(),
  stack: z.array(z.string()),
  featured: z.boolean().default(false),
  demo: z.string().optional(),
  repo: z.string().optional(),
  cover: z.string().optional(),
  images: z.array(z.string()).optional(),
  summary: z.string().optional()
});

export type Project = z.infer<typeof ProjectFrontmatter> & { body: string };

// Helpers
function safeRead(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

export function loadSite() {
  const data = JSON.parse(safeRead(path.join(contentDir, "site.json")));
  const parsed = SiteSchema.safeParse(data);
  if(!parsed.success) throw new Error("site.json invalid: " + parsed.error.message);
  return parsed.data;
}

export function loadSkills() {
  const yml = safeRead(path.join(contentDir, "skills.yml"));
  const data = YAML.parse(yml);
  const parsed = SkillsSchema.safeParse(data);
  if(!parsed.success) throw new Error("skills.yml invalid: " + parsed.error.message);
  return parsed.data;
}

export function loadExperience() {
  const yml = safeRead(path.join(contentDir, "experience.yml"));
  const data = YAML.parse(yml);
  const parsed = ExperienceSchema.safeParse(data);
  if(!parsed.success) throw new Error("experience.yml invalid: " + parsed.error.message);
  return parsed.data;
}

export function loadProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  const files = fs.readdirSync(dir).filter(f=>f.endsWith(".mdx"));
  return files.map(filename => {
    const raw = safeRead(path.join(dir, filename));
    const { data, content } = matter(raw);
    const parsed = ProjectFrontmatter.safeParse({
      ...data,
      year: typeof data.year === "string" ? parseInt(data.year, 10) : data.year
    });
    if(!parsed.success) throw new Error(`${filename} frontmatter invalid: ${parsed.error.message}`);
    return { ...(parsed.data as any), body: content } as Project;
  }).sort((a,b)=> b.year - a.year);
}

export function loadProject(slug: string): Project | null {
  const p = loadProjects().find(p => p.slug === slug);
  return p ?? null;
}

export function searchIndex() {
  // Very small index for client search
  const projects = loadProjects().map(p => ({
    t: p.title, s: p.summary ?? "", y: p.year, k: p.stack, slug: p.slug, type: "project"
  }));
  return projects;
}
