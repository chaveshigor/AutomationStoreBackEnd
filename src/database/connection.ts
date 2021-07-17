import { Connection, createConnection } from 'typeorm';

interface IConnectionMananger {
    connect: () => Promise<Connection>
}

function connectionMananger(): IConnectionMananger {
  async function connect(): Promise<Connection> {
    const connection = await createConnection();
    return connection;
  }

  return { connect };
}

export { connectionMananger };
