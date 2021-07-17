import { Router } from 'express';

const companyRoutes = Router();

companyRoutes.get('/', (req, res) => res.json({ hello: 'world' }));

export { companyRoutes };
