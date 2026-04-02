import { NextResponse } from "next/server";
import { applicationSchema, isEligible } from "@/lib/schemas/application";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const supabase = getSupabaseAdmin();

  const { data: row, error: insertError } = await supabase
    .from("applications")
    .insert({
      full_name: data.fullName,
      email: data.email,
      company_name: data.companyName,
      industry: data.industry,
      team_size: data.teamSize,
      estimated_acquisition_value: data.estimatedAcquisitionValue,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError || !row) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { error: "Failed to save application" },
      { status: 500 },
    );
  }

  if (isEligible(data.estimatedAcquisitionValue)) {
    const priceId = process.env.STRIPE_PAYMENT_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 },
      );
    }

    const origin = request.headers.get("origin") ?? "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply`,
      customer_email: data.email,
      metadata: { application_id: row.id },
      invoice_creation: { enabled: true },
    });

    await supabase
      .from("applications")
      .update({ status: "approved", stripe_session_id: session.id })
      .eq("id", row.id);

    return NextResponse.json({ result: "eligible", url: session.url });
  }

  await supabase
    .from("applications")
    .update({ status: "waitlisted" })
    .eq("id", row.id);

  return NextResponse.json({ result: "waitlisted" });
}
