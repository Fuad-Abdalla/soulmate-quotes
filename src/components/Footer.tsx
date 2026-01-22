export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} SoulMate Quotes — All rights reserved.
      </div>
    </footer>
  );
}
