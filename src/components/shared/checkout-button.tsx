"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ComponentProps, ReactNode } from "react";

interface CheckoutButtonProps
  extends Omit<ComponentProps<typeof Button>, "onClick"> {
  children: ReactNode;
}

function CheckoutButton({
  children,
  disabled,
  ...props
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data: { url?: string; error?: string } = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading || disabled} {...props}>
      {loading ? "Redirecting\u2026" : children}
    </Button>
  );
}

export { CheckoutButton };
export type { CheckoutButtonProps };
