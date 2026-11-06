import { z } from "zod";
export const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter at least 2 characters.")
      .max(80, "Use at most 80 characters."),
    email: z.string().trim().email("Enter a valid email address.").max(254),
    subject: z
      .string()
      .trim()
      .min(3, "Add a short subject.")
      .max(120, "Use at most 120 characters."),
    message: z
      .string()
      .trim()
      .min(20, "Please include at least 20 characters.")
      .max(4000, "Use at most 4,000 characters."),
    website: z.string().max(0),
    consent: z
      .boolean()
      .refine((v) => v, {
        message: "Please agree so I can use your details to respond."
      })
  })
  .strict();
export const contactRequestSchema = contactFormSchema.extend({
  clientId: z.string().uuid()
});
export type ContactValues = z.infer<typeof contactFormSchema>;
