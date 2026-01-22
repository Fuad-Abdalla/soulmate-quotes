import Link from "next/link";
import { getAllCategories } from "@/lib/posts";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <Link
            key={c}
            href={`/category/${encodeURIComponent(c)}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm hover:bg-white/10 transition"
          >
            <p className="font-semibold">{c}</p>
            <p className="text-sm text-white/60">View posts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
