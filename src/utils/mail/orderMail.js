import sendMail from './index';
import db from '../../db/models';

export default async (req, body, type) => {

  // console.log(req.user)
  const {
    id, productId, userId, price, quantity
  } = body;

  const { email, firstName } = await db.User.findOne({
    where: { id: 1 }
  });

  const { title, image } = await db.Product.findOne({
    where: { id: productId }
  });

  //   if (type === 'verify_email') url = `${process.env.APP_URL}/verify?token=${token}`;
  const url = `${process.env.APP_URL}/order/${id}`;

  const userDetails = {
    receiver: email,
    sender: process.env.SENDER,
    templateName: type,
    name: firstName,
    url,
    title,
    image,
    productId,
    quantity,
    buyer: req.user.email,
    price,

  };
  console.log(userDetails);
  await sendMail(userDetails);

  return 'Link Sent';
};
