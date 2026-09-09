import { z } from "zod";

export const leadSchema = z.object({
  postalCode: z
    .string()
    .trim()
    .regex(
      /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/,
      "Vul een geldige postcode in."
    ),

  houseNumber: z
    .string()
    .trim()
    .min(1, "Vul uw huisnummer in.")
    .max(20),

  name: z
    .string()
    .trim()
    .min(2, "Vul uw naam in.")
    .max(100),

  phone: z
    .string()
    .trim()
    .min(6, "Vul een geldig telefoonnummer in.")
    .max(30),

  email: z
    .string()
    .trim()
    .email("Vul een geldig e-mailadres in.")
    .max(150),

  note: z
    .string()
    .trim()
    .max(1500)
    .optional()
    .default(""),

  source: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default("website"),

  website: z
    .string()
    .optional()
    .default(""),
});

export type LeadPayload = z.infer<typeof leadSchema>;
