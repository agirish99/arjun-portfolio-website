  import fs from "node:fs";
  import path from "node:path";
  const title = process.argv.slice(2).join(" ").replace(/^"|"$/g, "");
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  if(!title){ console.error("Usage: pnpm new:post "Title""); process.exit(1); }
  const dir = path.join(process.cwd(), "content", "writing");
  const file = path.join(dir, `${slug}.mdx`);
  if(fs.existsSync(file)){ console.error("File exists:", file); process.exit(1); }
  const body = `---
title: "${title}"
slug: "${slug}"
summary: ""
year: ${new Date().getFullYear()}
---

Write your post here.
`;
  fs.writeFileSync(file, body);
  console.log("Created", file);
