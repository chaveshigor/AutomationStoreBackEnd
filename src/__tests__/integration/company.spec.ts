import request from 'supertest';
import { createConnection } from 'typeorm';

import { app } from '../../server';
import { ConnectionMethods } from '../utils/connectionMethods';
import { companySeed, planSeed } from '../utils/seeds';

const connectionMethods = new ConnectionMethods();

describe('company features', () => {
  beforeEach(async () => {
    await connectionMethods.connect();
  });

  afterEach(async () => {
    await connectionMethods.clear();
    await connectionMethods.close();
  });

  it('should create a new company', async () => {
    const plan = await request(app).post('/plans').send(planSeed());
    const { body: { id } } = plan;
    const company = await request(app).post(`/companies/${id}`).send(companySeed(id));

    expect(company.body).toMatchObject(companySeed(id));
    expect(company.statusCode).toBe(201);
  });
});
