import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  const posts = getPostsByCategory(categoryName);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-white/60">Category</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {categoryName}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-white/60">No posts found in this category.</p>
      ) : (
        <div className="space-y-4">
          {posts.map(({ slug, meta }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="block rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <h2 className="font-semibold text-white">{meta.title}</h2>
              <p className="mt-1 text-sm text-white/60">{meta.description}</p>
              <p className="mt-3 text-xs text-white/50">{meta.date}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
