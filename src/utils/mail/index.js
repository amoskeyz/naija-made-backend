import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
// import Response from '../index';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
  verify_email: process.env.VERIFY_TEMPLATE,
  reset_password: process.env.RESET_TEMPLATE,
  order_mail: process.env.ORDER_TEMPLATE
};

/**
 *
 * @param {object} data email details
 * @returns {object} message
 */
export const sendMail = async (data) => {
  const {
    receiver, sender, templateName, url, name, msg,
  } = data;

  const message = {
    to: receiver,
    from: sender,
    templateId: templates[templateName],

    dynamic_template_data: {
      name,
      url,
      msg
    }
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    throw new Error(error);
  }
};

export default sendMail;
