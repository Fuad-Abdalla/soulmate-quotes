"use client";

import { useState } from "react";

export default function PostActions({
  title,
}: {
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(title);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(title);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={copyQuote}
        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
      >
        {copied ? "✅ Copied!" : "📋 Copy Quote"}
      </button>

      <button
        onClick={shareWhatsApp}
        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
      >
        📲 Share WhatsApp
      </button>
    </div>
  );
}
