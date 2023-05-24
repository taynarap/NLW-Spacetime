import { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        // max size allowed is 5MB
        fileSize: 5_242_880,
      },
    });

    if (!upload) {
      return reply.status(400).send();
    }
  });
}
