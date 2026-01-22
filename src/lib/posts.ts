import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
};

const postsDir = path.join(process.cwd(), "posts");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): { slug: string; meta: PostMeta }[] {
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDir, `${slug}.md`);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(file);

    const meta: PostMeta = {
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      category: data.category ? String(data.category) : "General",
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };

    return { slug, meta };
  });

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  // normalize common typo
  const cleanSlug = slug.replace(/qoutes/gi, "quotes");

  const candidateA = path.join(postsDir, `${cleanSlug}.md`);
  const candidateB = path.join(postsDir, `${cleanSlug.replace(/quotes/gi, "qoutes")}.md`);

  const fullPath = fs.existsSync(candidateA) ? candidateA : candidateB;

  // Debug (optional)
  console.log("🟣 Requested slug:", slug);
  console.log("🟣 Using slug:", cleanSlug);
  console.log("🟣 Looking for file:", fullPath);

  if (!fs.existsSync(fullPath)) {
    console.log("🔴 NOT FOUND. Available files:", fs.readdirSync(postsDir));
    return null;
  }

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const meta: PostMeta = {
    title: String(data.title ?? cleanSlug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: data.category ? String(data.category) : "General",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };

  return { slug: cleanSlug, meta, contentHtml };
}


export function getAllCategories() {
  const posts = getAllPostsMeta();
  const set = new Set<string>();

  posts.forEach((p) => set.add(p.meta.category || "General"));
  return Array.from(set).sort();
}

export function getAllTags() {
  const posts = getAllPostsMeta();
  const set = new Set<string>();

  posts.forEach((p) => (p.meta.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getPostsByCategory(category: string) {
  const posts = getAllPostsMeta();

  const target = category.trim().toLowerCase();

  return posts.filter((p) => {
    const c = (p.meta.category || "General").trim().toLowerCase();
    return c === target;
  });
}

export function getPostsByTag(tag: string) {
  const posts = getAllPostsMeta();

  const target = tag.trim().toLowerCase();

  return posts.filter((p) =>
    (p.meta.tags || []).some((t) => String(t).trim().toLowerCase() === target)
  );
}
