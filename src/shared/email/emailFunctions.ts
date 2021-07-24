import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';
import { join } from 'path';

async function sendEmail(html: string, emailDestiny: string, emailSubject: string): Promise<void> {
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
    to: emailDestiny, // list of receivers
    subject: emailSubject, // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
}

function readHtml(htmlFilePath: string, replacements: any): string {
  const filePath = join(__dirname, `../../../${htmlFilePath}`);
  const source = readFileSync(filePath, 'utf-8').toString();
  const template = compile(source);
  const htmlToSend = template(replacements);

  return htmlToSend;
}

// const html = readHtml('src/modules/auth/email/resetPassword.html', {
//   link: 'google.com',
//   first_name: 'Higor',
// });

// sendEmail(html, 'higor@gmail.com', 'testando');

export { sendEmail, readHtml };
