import { FastifyInstance } from 'fastify';
import { validateAdminKey } from '../middleware/admin.middleware';
import {
  createTenant,
  listTenants,
  metrics,
  users,
  subscriptions,
} from '../controllers/admin.controller';

export async function tenantRoutes(fastify: FastifyInstance) {
  // Rutas existentes
  fastify.post('/', {
    preHandler: [validateAdminKey],
    handler: createTenant,
  });

  fastify.get('/', {
    preHandler: [validateAdminKey],
    handler: listTenants,
  });

  // Nuevas rutas de métricas
  fastify.get('/metrics', {
    preHandler: [validateAdminKey],
    handler: metrics,
  });

  fastify.get('/users', {
    preHandler: [validateAdminKey],
    handler: users,
  });

  fastify.get('/subscriptions', {
    preHandler: [validateAdminKey],
    handler: subscriptions,
  });
}