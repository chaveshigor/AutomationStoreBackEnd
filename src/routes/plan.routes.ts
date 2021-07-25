import { Router } from 'express';

import { checkIfPlanExists } from '../middlewares/planMiddlewares';
import { CreatePlanController } from '../modules/plan/useCases/createPlan/createPlanController';
import { EditPlanController } from '../modules/plan/useCases/editPlan/editPlanController';
import { ListPlansController } from '../modules/plan/useCases/listPlans/listPlansController';

const planRoutes = Router();

planRoutes.post('/',
  new CreatePlanController().handle);

planRoutes.put('/:plan_id',
  checkIfPlanExists,
  new EditPlanController().handle);

planRoutes.get('/',
  new ListPlansController().handle);

export { planRoutes };
