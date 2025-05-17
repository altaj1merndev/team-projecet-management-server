import nodeMailer from 'nodemailer';
import config from '../../config';

const sendEmail = async (options: any) => {
    const transporter = nodeMailer.createTransport({
      host: config.smptHost,
      port: config.smptPort,
      service: 'gmail',
      secure: config.NODE_ENV === 'production',
      auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPass,
      },
    } as nodeMailer.TransportOptions);
  
    const mailOptions = {
      from: config.nodemailerUser,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };
  
    try {
      // Sending the email and capturing the result
      const result = await transporter.sendMail(mailOptions);
  
      // // Logging the message ID from the result
      // console.log(`Email sent successfully! Message ID: ${JSON.stringify(result)}`);
  
      // // Return the message ID or other relevant details
      return result?.messageId;
    } catch (error: any) {
      console.error(`Failed to send email: ${error?.message}`);
      throw new Error('Failed to send email');
    }
  };
  
  export default sendEmail;