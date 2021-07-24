import { createTransport } from 'nodemailer';

async function sendEmail(): Promise<void> {
  console.log(process.env.EMAIL_HOST);
  const transport = createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT as string, 10) || 2525,
    auth: {
      user: process.env.EMAIL_USER || 'be8a8f977f4f07',
      pass: process.env.EMAIL_PASS || 'd014b2b4ad8f4e',
    },
  });

  await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
}
// sendEmail();

export { sendEmail };
