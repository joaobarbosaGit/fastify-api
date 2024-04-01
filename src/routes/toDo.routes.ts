import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { middleware as query } from 'querymen';

import { IToDoDTO, IUpdateStatusManyDTO, IUpdateStatusOneDTO } from "interfaces";
import {
    CountToDoByStatusController,
    CreateOneToDoController,
    DeleteManyToDoController,
    DeleteOneToDoController,
    ListManyToDoController,
    UpdateManyStatusToDoController,
    UpdateOneBodyToDoController,
    UpdateOneStatusToDoController
} from "controllers";

export async function toDoRoutes(fastify: FastifyInstance) {

    const countToDoByStatusController = new CountToDoByStatusController();
    const createOneToDoController = new CreateOneToDoController();
    const deleteManyToDoController = new DeleteManyToDoController();
    const deleteOneToDoController = new DeleteOneToDoController();
    const listManyToDoController = new ListManyToDoController();
    const updateManyStatusToDoController = new UpdateManyStatusToDoController();
    const updateOneBodyToDoController = new UpdateOneBodyToDoController();
    const updateOneStatusToDoController = new UpdateOneStatusToDoController();

    fastify.get('/count', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    completed: { type: 'boolean' }
                },
                required: ['completed']
            }
        }
    }, async (req, reply) => {
        //@ts-ignore
        const { completed } = req.query;
        try {
            const data = await countToDoByStatusController.handle(completed);
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.post<{ Body: IToDoDTO }>('/', async (req, reply) => {
        const { body, completed, completedAt } = req.body;
        try {
            const data = await createOneToDoController.handle({
                body,
                completed,
                completedAt
            });
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.delete<{ Body: { ids: string[] } }>('/many', async (req, reply) => {
        const { ids } = req.body;
        try {
            const data = await deleteManyToDoController.handle(ids);
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.delete<{ Body: { id: string } }>('/', async (req, reply) => {
        const { id } = req.body;
        try {
            const data = await deleteOneToDoController.handle(id);
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.get('/', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    sort: { type: 'string' },
                    page: { type: 'integer' },
                    limit: { type: 'integer' }
                }
            }
        }
    }, async (req, reply) => {
        //@ts-ignore
        const { sort, page, limit } = req.query;
        try {
            const data = await listManyToDoController.handle({ sort, page, limit });
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.put<{ Body: IUpdateStatusManyDTO }>('/many/completed', async (req, reply) => {
        const { ids, completed } = req.body;
        try {
            const data = await updateManyStatusToDoController.handle({
                ids,
                completed
            });
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.put<{ Body: IUpdateStatusOneDTO }>('/one/body', async (req, reply) => {
        const { id, body } = req.body;
        try {
            const data = await updateOneBodyToDoController.handle({
                id,
                body
            });
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.put<{ Body: IUpdateStatusOneDTO }>('/one/completed', async (req, reply) => {
        const { id, completed } = req.body;
        try {
            const data = await updateOneStatusToDoController.handle({
                id,
                completed
            });
            return reply.send(data);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });
}