import z from "zod";

export const environmentSchema = z
  .object({
    PORT: z.coerce.number().default(3000),
    SEQ_API_KEY: z.string().optional(),
    SEQ_SERVER_URL: z.url().optional(),
  })
  .readonly();

export const environment = environmentSchema.parse(Bun.env);
