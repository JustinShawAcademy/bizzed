import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_ID = process.env.STRIPE_PAYMENT_ID;

export async function POST(request: Request) {
  if (!PRICE_ID) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 },
    );
  }

  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}`,
    invoice_creation: {
      enabled: true,
    },
  });

  return NextResponse.json({ url: session.url });
}