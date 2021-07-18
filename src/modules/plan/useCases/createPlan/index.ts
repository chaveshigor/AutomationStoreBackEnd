import { getCustomRepository } from 'typeorm';

import { PlansRepository } from '../../repositories/plansRepository';
import { CreatePlanController } from './createPlanController';
import { CreatePlanUseCase } from './createPlanUseCase';

// const repo = getCustomRepository(PlansRepository);
const createPlanUseCase = new CreatePlanUseCase();
const createPlanController = new CreatePlanController(createPlanUseCase);

export { createPlanController };
