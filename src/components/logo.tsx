import Image from "next/image";
import v6Icon from "@/assets/brand/v6-icon.png";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={v6Icon}
      alt=""
      aria-hidden="true"
      className={className}
      priority
    />
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={`font-mono font-semibold tracking-tight ${className ?? ""}`}>
      V6 Solutions
    </span>
  );
}
