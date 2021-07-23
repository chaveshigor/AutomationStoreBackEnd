import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import { ErrorHandler } from '../../../ErrorHandler';
import { IPlansRepository } from '../repositories/IPlansRepository';
import { PlansRepository } from '../repositories/plansRepository';

async function checkIfPlanExists(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const { plan_id } = req.params;

  if (!validate(plan_id)) {
    throw new ErrorHandler('invalid plan id', 400);
  }

  const repo = getCustomRepository(PlansRepository);

  const plan = await repo.findOne({ id: plan_id });

  if (!plan) {
    return res.status(404).json({ error: 'plan dont exists' });
  }

  return next();
}

export { checkIfPlanExists };
