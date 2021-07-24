import { Router } from 'express';
import { getRepository } from 'typeorm';

import { Client } from '../models/Client';
import { Company } from '../models/Company';

const clientsRoutes = Router();

clientsRoutes.post('/', async (req, res) => {
  const clientsRepo = getRepository(Client);
  const companiesRepo = getRepository(Company);
  const companyResult = await companiesRepo.findOne('c6aa85af-2a69-49e6-8b7b-d1bba7597fc4') as Company;

  const client = clientsRepo.create({
    first_name: 'higor',
    last_name: 'chaves',
    phone: '123',
    email: '123',
    company: [companyResult],
  });

  try {
    await clientsRepo.save(client);
  } catch (error) {
    console.log(error);
  }

  const getClient = await clientsRepo.find({ relations: ['company'] });
  console.log(getClient);
  return res.status(201).json(getClient);
});

export { clientsRoutes };
