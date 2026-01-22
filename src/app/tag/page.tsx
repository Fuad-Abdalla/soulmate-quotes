import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Tags</h1>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t}
            href={`/tag/${encodeURIComponent(t)}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            #{t}
          </Link>
        ))}
      </div>
    </div>
  );
}
