import { FastifyInstance } from "fastify";

import { ListSocketMessagesController } from "controllers/listSocketMessages.controller";

export async function socketRoutes(fastify: FastifyInstance) {
    const listSocketMessagesController = new ListSocketMessagesController();
    fastify.get('/', async (req, reply) => {
        try {
            const socketMessages = await listSocketMessagesController.handle();
            return reply.send(socketMessages);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });
}