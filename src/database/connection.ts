import { config } from 'dotenv';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

let envirement = '';
if (process.env.NODE_ENV) {
  envirement = `.${process.env.NODE_ENV.trim()}`;
}

config({
  path: `.env${envirement}`,
});

async function setNewConnection(host = 'localhost'): Promise<Connection> {
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, {
    host,
  });

  const newConnection = await createConnection(connectionOptions);

  return newConnection;
}

export { setNewConnection };
