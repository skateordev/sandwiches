import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Greeting.</h2>
      <p>${text}</p>
      <p>👅, ront</p>
    </div>
  `;
}

export interface Envelope {
  to?: string[] | null;
  from: string;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelope: Envelope;
  response: string;
  messageIs: string;
  messageTime: number;
  envelopeTime: number;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'orb@rocsteady.net',
    subject: 'Your password resetinng tokan!',
    html: makeANiceEmail(`UR PASSWORD RESENG TOEKN !
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">CLK 2 RESEIT</a>
    `),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`📬 Message setn! Peep it at ${getTestMessageUrl(info)}`);
  }
}
