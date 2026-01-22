import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 6);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section
        className="relative overflow-hidden rounded-2xl"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Better overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 dark:from-black/50 dark:via-black/30 dark:to-black/60" />

        <div className="relative z-10 px-6 py-24 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">SoulMate Quotes</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            Words for soulmates, love that lasts, and feelings you can’t explain.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Read Quotes
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED QUOTES */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          "I didn’t find love… I found you. And that was everything.",
          "Some souls don’t meet by accident. They meet by destiny.",
          "You feel like home in a world that never stayed still.",
        ].map((q, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-sm leading-relaxed text-black/80 dark:text-white/80">
              “{q}”
            </p>
            <p className="mt-4 text-xs font-medium text-pink-600 dark:text-pink-300">
              ♥ Featured
            </p>
          </div>
        ))}
      </section>

      {/* LATEST */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest quotes</h2>
          <Link href="/blog" className="text-sm underline">
            View all
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-black/60 dark:text-white/60">No posts yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {posts.map(({ slug, meta }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-lg font-semibold group-hover:text-pink-600 dark:group-hover:text-pink-300">
                  {meta.title}
                </h3>

                <p className="mt-2 text-sm text-black/70 dark:text-white/60">
                  {meta.description}
                </p>

                <span className="mt-3 inline-block text-xs font-medium text-pink-600 dark:text-pink-300">
                  ♥ SoulMate Quote
                </span>

                <p className="mt-4 text-xs text-black/50 dark:text-white/50">
                  {meta.date}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="rounded-2xl border border-black/10 bg-gradient-to-r from-pink-100 to-white p-6 shadow-sm dark:border-white/10 dark:from-pink-500/10 dark:to-white/5">
        <h3 className="text-lg font-semibold">Get a quote daily 💌</h3>
        <p className="mt-1 text-sm text-black/70 dark:text-white/60">
          Join SoulMate Quotes and receive love lines you can share anytime.
        </p>

        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none placeholder:text-black/40 focus:border-pink-400 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/40 dark:focus:border-pink-300"
          />
          <button
            type="button"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 text-xs text-black/60 dark:text-white/50">
          
        </p>
      </section>

      {/* ADS */}
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm text-black/70 dark:text-white/60">
         
        </p>
      </section>
    </div>
  );
}
