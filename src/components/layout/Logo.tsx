import Image from "next/image";
import { asset, cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Kryptonex shield mark + wordmark. The mark file is the club's official logo. */
export function Logo({
  className,
  showWordmark = true,
  size = 34,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative shrink-0 overflow-hidden rounded-[9px] ring-1 ring-[var(--border)]"
        style={{ width: size, height: size }}
      >
        <Image
          src={asset("/brand/kryptonex-logo.jpg")}
          alt=""
          width={size * 2}
          height={size * 2}
          className="h-full w-full scale-[1.28] object-cover object-center"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">{site.name}</span>
          <span className="mt-0.5 font-mono text-[9.5px] tracking-[0.16em] text-fg-subtle uppercase">
            DPGU · STR
          </span>
        </span>
      )}
    </span>
  );
}
