
import { config } from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/user';

config();

const app = fastify();
app.register(cors, { origin: process.env.CLIENT_URL });

app.register(userRoutes)


app.listen({port: parseInt(process.env.PORT!)}) 


