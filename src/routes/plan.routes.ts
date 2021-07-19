import { Router } from 'express';

import { checkIfPlanExists } from '../modules/plan/middleware/planMiddlewares';
import { createPlanController } from '../modules/plan/useCases/createPlan';
import { editPlanController } from '../modules/plan/useCases/editPlan';

const planRoutes = Router();

planRoutes.post('/', (req, res) => createPlanController.handle(req, res));
planRoutes.put('/:plan_id', (req, res, next) => checkIfPlanExists(req, res, next), (req, res) => editPlanController.handle(req, res));

export { planRoutes };
