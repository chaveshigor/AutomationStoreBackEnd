import { Router } from 'express';

import { createPlanController } from '../modules/plan/useCases/createPlan';
import { editPlanController } from '../modules/plan/useCases/editPlan';

const planRoutes = Router();

planRoutes.post('/', (req, res) => createPlanController.handle(req, res));
planRoutes.put('/:id', (req, res) => editPlanController.handle(req, res));

export { planRoutes };
