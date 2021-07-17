import { app } from './server';

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
