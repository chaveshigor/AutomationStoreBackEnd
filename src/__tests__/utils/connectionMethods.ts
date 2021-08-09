import { Connection, getConnection } from 'typeorm';

import { setNewConnection } from '../../database/connection';

class ConnectionMethods {
  async connect(): Promise<Connection> {
    const connection = await setNewConnection();
    return connection;
  }

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.map(async (entity) => {
      try {
        await connection.query(`truncate table ${entity.tableName} cascade`);
      } catch (error) {
        // pass
      }
    });
  }

  async close(): Promise<void> {
    const connection = getConnection();
    await connection.close();
  }
}

export { ConnectionMethods };
