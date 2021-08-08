import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import { setNewConnection } from '../../database/connection';
import { app } from '../../server';

let connection: Connection;

describe('Plan features', () => {
  beforeEach(async () => {
    connection = await setNewConnection();
  });

  afterEach(async () => {
    // connection = getConnection();
    // await connection.close();
  });

  it('it should list all the plans', async () => {
    const result = await request(app).get('/plans');
    expect(result.text).toEqual('hello');
    expect(result.statusCode).toEqual(200);
  });
});
