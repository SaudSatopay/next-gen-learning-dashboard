import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina — Next-Gen Learning Dashboard",
  description:
    "A futuristic, server-rendered student dashboard built with Next.js, Supabase, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Ambient sunset atmosphere — fixed behind all content, never interactive. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div
            className="absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,45,155,0.16), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-52 -right-40 h-[46rem] w-[46rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,176,32,0.12), transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,61,0.08), transparent 70%)",
            }}
          />
          <div className="grain absolute inset-0 opacity-[0.05]" />
        </div>
        {children}
      </body>
    </html>
  );
}
