import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { prisma } from "../../../lib/prisma";
import { auth } from "../../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function createTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/tasks",
    {
      schema: {
        tags: ["tasks"],
        summary: "Create a task",
        body: z.object({
          text: z.string(),
        }),
        response: {
          200: z.object({
            task: z.object({
              text: z.string(),
              id: z.string(),
              completed: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
              userId: z.string(),
            }),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });

      if (!session) {
        reply.status(401).send({ error: "UNAUTHORIZED" });
        return;
      }

      const { text } = request.body;

      const task = await prisma.todo.create({
        data: {
          text,
          userId: session.user.id,
        },
      });

      return { task };
    }
  );
}
