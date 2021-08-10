import request from 'supertest';

import { app } from '../../server';
import { ConnectionMethods } from '../utils/connectionMethods';
import { planSeed } from '../utils/seeds';

const connectionMethods = new ConnectionMethods();

describe('Plan features', () => {
  beforeEach(async () => {
    await connectionMethods.connect();
  });

  afterEach(async () => {
    await connectionMethods.clear();
    await connectionMethods.close();
  });

  it('it should create a new plan', async () => {
    const { name, price } = planSeed();
    const result = await request(app).post('/plans').send(planSeed());

    expect(result.body.name).toEqual(name);
    expect(result.body.price).toEqual(price);
    expect(result.statusCode).toEqual(201);
  });

  it('it should not create a plan that already exists', async () => {
    await request(app).post('/plans').send(planSeed());

    const result = await request(app).post('/plans').send(planSeed());

    expect(result.body).toHaveProperty('error');
    expect(result.statusCode).toEqual(400);
  });
});
