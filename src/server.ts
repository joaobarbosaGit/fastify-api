import dotenv from 'dotenv';
import Fastify from 'fastify';
import * as qs from 'fastify-qs'
import { connect } from 'mongoose'

import { toDoRoutes } from './routes/toDo.routes';
import { socketRoutes } from 'routes/socket.routes';

dotenv.config();

const serverPort = process.env.SERVER_PORT;
const mongoUrl = `mongodb://${process.env.DB_ADMIN_USER}:${process.env.DB_ADMIN_PASS}@localhost`;

const start = async () => {
  try {
    const app = Fastify();
    await app.register(require('fastify-qs'), { useQuerystring: true })


    await app.register(toDoRoutes, {
      prefix: '/api/toDo',
    });
    await app.register(socketRoutes, {
      prefix: '/api/socket',
    });

    await connect(mongoUrl)
    await app.listen({ port: serverPort as any });
    console.log('Server running at adress http://localhost:3333');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
