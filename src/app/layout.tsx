import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rolevise — Hire vs Automate Audit",
  description:
    "Decide what to keep, automate, or outsource for any role. Working version for Peak Air Co Office Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header no-print">
          <div className="container inner">
            <a className="brand" href="/">
              <span className="brand-mark" aria-hidden />
              Rolevise
            </a>
            <nav className="nav-links">
              <a href="/audit">Audit</a>
              <a href="/audit/summary">Summary</a>
              <a href="/login">Login</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
