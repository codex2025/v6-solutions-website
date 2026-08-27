import type { ReactNode } from "react";

export function Marquee({
  items,
  reverse = false,
  speed = 32,
}: {
  items: ReactNode[];
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div
      className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 items-center gap-10 pr-10 ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } group-hover:[animation-play-state:paused]`}
        >
          {items.map((item, i) => (
            <div key={i} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
