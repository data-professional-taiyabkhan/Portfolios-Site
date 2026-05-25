"use client";

const items = [
  "I build AI products that move from idea → demo → deployed",
  "Royal Holloway MSc · Merit",
  "Co-Founder · Autostrata.ai",
  "Currently building in the UK",
  "Published in Zenodo",
  "Six paid clients shipped",
];

export default function Marquee() {
  return (
    <div className="relative py-10 border-y border-line bg-paper-deep/40 overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-3xl md:text-5xl italic text-ink whitespace-nowrap">
              {item}
            </span>
            <span className="text-accent text-3xl md:text-5xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
