  import fs from "node:fs";
  import path from "node:path";

  const title = process.argv.slice(2).join(" ").replace(/^"|"$/g, "");
  const slugArg = process.argv.find(a=>a.startsWith("--slug"));
  const slug = slugArg ? slugArg.split("=")[1] : title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  if(!title){ console.error("Usage: pnpm new:project "Title" --slug my-slug"); process.exit(1); }
  const dir = path.join(process.cwd(), "content", "projects");
  const file = path.join(dir, `${slug}.mdx`);
  if(fs.existsSync(file)){ console.error("File exists:", file); process.exit(1); }
  const body = `---
title: "${title}"
slug: "${slug}"
year: ${new Date().getFullYear()}
stack: ["React", "Three.js", "Node"]
featured: false
demo: ""
repo: ""
cover: "/projects/${slug}/cover.jpg"
images:
  - "/projects/${slug}/1.jpg"
  - "/projects/${slug}/2.jpg"
summary: "One-sentence hook."
---

Write your long description here in MDX.
`;
  fs.writeFileSync(file, body);
  console.log("Created", file);
