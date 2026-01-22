import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import PostActions from "@/components/PostActions";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ Redirect typo URLs to correct slug for SEO
  if (slug.toLowerCase().includes("qoutes")) {
    redirect(`/blog/${slug.replace(/qoutes/gi, "quotes")}`);
  }

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const category = post.meta.category || "General";
  const tags = post.meta.tags || [];

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-sm text-white/60">{post.meta.date}</p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
        {post.meta.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href={`/category/${encodeURIComponent(category)}`}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10"
        >
          {category}
        </Link>

        {tags.map((t) => (
          <Link
            key={t}
            href={`/tag/${encodeURIComponent(t)}`}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            #{t}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-white/70">{post.meta.description}</p>

      <PostActions title={post.meta.title} />

      <hr className="my-8 border-white/10" />

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
