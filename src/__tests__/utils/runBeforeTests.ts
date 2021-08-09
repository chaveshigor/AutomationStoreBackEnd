import { setNewConnection } from '../../database/connection';

async function runBeforeAll() {
  const connection = await setNewConnection();
  await connection.runMigrations();
  await connection.close();
}

export default runBeforeAll;
