import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Quotes" },
  { href: "/category", label: "Category" },
  { href: "/tag", label: "Tag" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="SoulMate Quotes Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-semibold tracking-wide text-white">
            SoulMate Quotes
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 text-sm sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile shortcut */}
        <Link
          href="/blog"
          className="sm:hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition"
        >
          Quotes
        </Link>
      </div>
    </header>
  );
}
