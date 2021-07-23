import { Router } from 'express';

import { checkIfPlanExists } from '../modules/plan/middleware/planMiddlewares';
import { CreatePlanController } from '../modules/plan/useCases/createPlan/createPlanController';
import { EditPlanController } from '../modules/plan/useCases/editPlan/editPlanController';

const planRoutes = Router();

planRoutes.post('/',
  new CreatePlanController().handle);

planRoutes.put('/:plan_id',
  (req, res, next) => checkIfPlanExists(req, res, next),
  new EditPlanController().handle);

export { planRoutes };
