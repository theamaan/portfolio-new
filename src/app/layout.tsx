import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amanullah.dev"),
  title: {
    default: "Aman Ullah — AI / LLM Engineer",
    template: "%s · Aman Ullah",
  },
  description:
    "AI engineer who builds production LLM systems for messy, real-world business problems. Backend brain, automation reflex.",
  authors: [{ name: "Aman Ullah" }],
  creator: "Aman Ullah",
  openGraph: {
    type: "website",
    title: "Aman Ullah — AI / LLM Engineer",
    description:
      "Production LLM systems. Quiet, useful, fast. Selected work, case studies, and writing.",
    siteName: "Aman Ullah",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Ullah — AI / LLM Engineer",
    description: "Production LLM systems. Quiet, useful, fast.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 mono text-[12px] bg-[var(--accent)] text-[var(--bg)] px-3 py-2"
        >
          skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
