import type { Metadata } from "next";
import Link from "next/link";
import BlogSearch from "@/components/BlogSearch";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Quotes",
  description: "Love quotes, soulmate quotes, and relationship wisdom.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Quotes</h1>
        <p className="text-white/60">
          Search love quotes, soulmate lines, and relationship wisdom.
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/categories"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Browse Categories
          </Link>
          <Link
            href="/tags"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Browse Tags
          </Link>
        </div>
      </header>

      {/* Search + Results */}
      <BlogSearch posts={posts} />
    </div>
  );
}
