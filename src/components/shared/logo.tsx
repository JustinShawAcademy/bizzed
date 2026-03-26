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
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="28"
          height="28"
          rx="7"
          className="fill-foreground"
        />
        <path
          d="M8 8h4.5a3.5 3.5 0 0 1 .5 6.96V15a3.5 3.5 0 0 1-1 6.88 3.5 3.5 0 0 1-.5.12H8V8Zm2 2v4h2.5a1.5 1.5 0 1 0 0-3H10Zm0 6v4h3a1.5 1.5 0 1 0 0-3h-3Z"
          className="fill-background"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Bizzed
        </span>
      )}
    </Link>
  );
}

export { Logo };
