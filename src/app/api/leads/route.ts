import { NextResponse } from "next/server";
import { Resend } from "resend";

import { leadSchema } from "@/lib/lead";

export const runtime = "nodejs";

function normalizePostalCode(postalCode: string) {
  const clean = postalCode
    .replace(/\s+/g, "")
    .toUpperCase();

  return `${clean.slice(0, 4)} ${clean.slice(4)}`;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Controleer de ingevulde gegevens.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const lead = result.data;

    if (lead.website) {
      return NextResponse.json({
        ok: true,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    const fromEmail = process.env.LEAD_FROM_EMAIL;

    if (!apiKey) {
      console.error("RESEND_API_KEY ontbreekt.");

      return NextResponse.json(
        {
          ok: false,
          message: "RESEND_API_KEY ontbreekt op de server.",
        },
        {
          status: 500,
        }
      );
    }

    if (!toEmail) {
      console.error("LEAD_TO_EMAIL ontbreekt.");

      return NextResponse.json(
        {
          ok: false,
          message: "LEAD_TO_EMAIL ontbreekt op de server.",
        },
        {
          status: 500,
        }
      );
    }

    if (!fromEmail) {
      console.error("LEAD_FROM_EMAIL ontbreekt.");

      return NextResponse.json(
        {
          ok: false,
          message: "LEAD_FROM_EMAIL ontbreekt op de server.",
        },
        {
          status: 500,
        }
      );
    }

    const postalCode = normalizePostalCode(
      lead.postalCode
    );

    const resend = new Resend(apiKey);

    const { data, error } =
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],

        subject:
          `Nieuwe woningaanmelding | ` +
          `${postalCode} ${lead.houseNumber}`,

        replyTo: lead.email,

        text: [
          "Nieuwe woningaanmelding via HaagVast",
          "",
          "WONING",
          `Postcode: ${postalCode}`,
          `Huisnummer: ${lead.houseNumber}`,
          "",
          "CONTACT",
          `Naam: ${lead.name}`,
          `Telefoon: ${lead.phone}`,
          `E-mail: ${lead.email}`,
          "",
          "TOELICHTING",
          lead.note || "Geen toelichting opgegeven.",
          "",
          "HERKOMST",
          lead.source,
          "",
          `Ontvangen: ${new Date().toLocaleString(
            "nl-NL",
            {
              timeZone: "Europe/Amsterdam",
            }
          )}`,
        ].join("\n"),
      });

    if (error) {
      console.error(
        "Resend versturen mislukt:",
        error
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "Resend kon de e-mail niet versturen.",
          resendError: error,
        },
        {
          status: 502,
        }
      );
    }

    console.log(
      "HaagVast lead verstuurd:",
      data?.id
    );

    return NextResponse.json({
      ok: true,
      id: data?.id,
    });
  } catch (error) {
    console.error(
      "Onverwachte fout in /api/leads:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Er ging iets mis bij het verwerken van de woningaanmelding.",
      },
      {
        status: 500,
      }
    );
  }
}
