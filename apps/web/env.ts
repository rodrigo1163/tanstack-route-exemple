import { z } from "zod";

const envSchema = z.object({
	API_URL: z.url().default("http://localhost:3333"),
	CLIENT_URL: z.url().default("http://localhost:3000"),
});

export const env = envSchema.parse(import.meta.env);
