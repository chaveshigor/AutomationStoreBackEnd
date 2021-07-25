import { NextFunction, Request, Response } from 'express';
import { validate } from 'uuid';

import { CompaniesRepository } from '../modules/company/repositories/companiesRepository';

async function checkIfCompanyExists(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const { cnpj } = req.body;

  const repo = new CompaniesRepository();

  const company = await repo.findOne(
    { CNPJ: cnpj },
  );

  if (!company) {
    return res.status(404).json({ error: 'company not found' });
  }

  return next();
}

async function checkIfCompanyExistsById(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  let { company_id } = req.body;

  if (!company_id) {
    company_id = req.user.company_id;
  }

  if (!validate(company_id)) {
    return res.status(400).json({ error: 'id not valid' });
  }

  const repo = new CompaniesRepository();
  const company = await repo.findOne(
    { id: company_id },
  );

  if (!company) {
    return res.status(404).json({ error: 'company not found' });
  }

  return next();
}

export { checkIfCompanyExists, checkIfCompanyExistsById };
