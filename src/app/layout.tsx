import type { Metadata } from "next";
import "./globals.css";
import { loadSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio – Arjun Girish",
  description: "Software Engineer – React • TypeScript • Node.js"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = loadSite();
  return (
    <html lang="en" className="dark">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
          <nav className="container flex items-center justify-between py-4">
            {/* Home Button */}
            <a href="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </a>
            
            {/* Center Navigation */}
            <div className="flex gap-6 text-sm">
              <a href="/about">About</a>
              <a href="/projects">Projects</a>
              <a href="/experience">Experience</a>
            </div>
            
            {/* Resume Download */}
            <a 
              href="/arjun-resume.pdf" 
              download="Arjun_Girish_Resume.pdf"
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="container py-10 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {site.name}. Built with Next.js, R3F, Tailwind & Motion.
        </footer>
        {site.socials.plausibleDomain ? <script defer data-domain={site.socials.plausibleDomain} src="https://plausible.io/js/script.js"></script>: null}
      </body>
    </html>
  );
}
