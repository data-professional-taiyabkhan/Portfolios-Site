import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import AgentLauncher from "@/components/AgentLauncher";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://taiyab.autostrata.ai"),
  title: "Mohammad Taiyab Khan — Data & AI Engineer",
  description:
    "Data & AI Engineer · Co-Founder of Autostrata.ai · Royal Holloway MSc. I build AI products that move from idea to demo to deployed.",
  openGraph: {
    title: "Mohammad Taiyab Khan — Data & AI Engineer",
    description: "I build AI products that move from idea → demo → deployed.",
    url: "https://taiyab.autostrata.ai",
    siteName: "Mohammad Taiyab Khan",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Taiyab Khan — Data & AI Engineer",
    description: "I build AI products that move from idea → demo → deployed.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          <Cursor />
          <Nav />
          {children}
          <AgentLauncher />
        </MotionConfig>
        <Analytics />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","xfsvngk5c4");
            `,
          }}
        />
      </body>
    </html>
  );
}
