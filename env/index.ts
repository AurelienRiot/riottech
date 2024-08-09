import { z } from "zod";

const envVariableSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXT_PUBLIC_STRIPE_API_KEY: z.string(),
  STRIPE_API_KEY: z.string(),
  STRIPE_WEBHOOKS_SECRET: z.string(),
  NODEMAILER_EMAIL: z.string(),
  NODEMAILER_PASSWORD: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  PDF_URL: z.string(),
  SCALEWAY_ACCESS_KEY_ID: z.string(),
  SCALEWAY_SECRET_ACCESS_KEY: z.string(),
  NEXT_PUBLIC_SCALEWAY_BUCKET_NAME: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  INVOICE_URL: z.string(),
});

envVariableSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariableSchema> {}
  }
}
