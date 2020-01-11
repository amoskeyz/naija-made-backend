import sendMail from './index';
import { verificationToken } from '../index';

export default async (body, type) => {
  let url;
  const { firstName, email, id } = body;
  const token = verificationToken(id, email);

  if (type === 'verify_email') url = `${process.env.APP_URL}/verify?token=${token}`;
  else url = `${process.env.APP_URL}/reset/${token}`;

  const userDetails = {
    receiver: email,
    sender: process.env.SENDER,
    templateName: type,
    name: firstName,
    url
  };
  console.log(userDetails);
  await sendMail(userDetails);

  return 'Link Sent';
};
