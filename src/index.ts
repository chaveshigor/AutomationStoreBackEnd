import { config } from 'dotenv';

import { setNewConnection } from './database/connection';
import { app } from './server';

config({
  path: '.env',
});

let db_host = process.env.TYPEORM_HOST;
if (process.env.APP_ENV === 'dev') {
  db_host = 'dbAS';
}

setNewConnection(db_host);

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
