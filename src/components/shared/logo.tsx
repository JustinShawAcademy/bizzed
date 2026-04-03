import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="Bizzed home"
    >
      {showWordmark && (
        <span className="translate-y-1 text-lg font-semibold leading-none tracking-tight text-foreground">
          Bizzed
        </span>
      )}
      <Image
        src="/logo-mark.png"
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 dark:invert"
        priority
        aria-hidden
      />

    </Link>
  );
}

export { Logo };
