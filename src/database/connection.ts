import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

const connectionMananger = (): Promise<void> => getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = 'dbAS'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

export { connectionMananger };
