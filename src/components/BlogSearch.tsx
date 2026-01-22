"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PostItem = {
  slug: string;
  meta: {
    title: string;
    description: string;
    date: string;
    category?: string;
    tags?: string[];
  };
};

export default function BlogSearch({ posts }: { posts: PostItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return posts;

    return posts.filter(({ slug, meta }) => {
      const inTags = (meta.tags || []).some((t) => t.toLowerCase().includes(q));
      return (
        meta.title.toLowerCase().includes(q) ||
        meta.description.toLowerCase().includes(q) ||
        (meta.category || "").toLowerCase().includes(q) ||
        inTags ||
        slug.toLowerCase().includes(q)
      );
    });
  }, [query, posts]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search quotes, categories, tags..."
          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-pink-300"
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-white/60">No results found for “{query}”.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(({ slug, meta }) => {
            const category = meta.category || "General";
            const tags = meta.tags || [];

            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 shadow-sm transition hover:bg-white/10 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-semibold text-white group-hover:text-pink-300">
                    {meta.title}
                  </h2>
                  <span className="text-xs text-white/50 whitespace-nowrap">
                    {meta.date}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/60">{meta.description}</p>

                {/* Category + Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {category}
                  </span>

                  {tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/60"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
