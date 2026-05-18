import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import AgentLauncher from "@/components/AgentLauncher";

export const metadata: Metadata = {
  metadataBase: new URL("https://taiyab.autostrata.ai"),
  title: "Mohammad Taiyab Khan — Data & AI Engineer",
  description:
    "Data & AI Engineer · Co-Founder of Autostrata.ai · Royal Holloway MSc · Open to UK sponsorship. I build AI products that move from idea to demo to deployed.",
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
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Nav />
        {children}
        <AgentLauncher />
      </body>
    </html>
  );
}
