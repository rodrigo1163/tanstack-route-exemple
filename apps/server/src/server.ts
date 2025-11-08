import fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "../env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.get("/health", () => {
	return "";
});

app.listen({ port: env.PORT }).then(() => {
	console.log(`Server is running on port ${env.PORT}`);
});
