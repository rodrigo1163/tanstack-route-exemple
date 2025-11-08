import fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.get("/health", () => {
	return "";
});

app.listen({ port: 3333 }).then(() => {
	console.log("Server is running on port 3333");
});
