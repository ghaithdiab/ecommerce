// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from "nodemailer";


export const sendEmail= async(options)=>{
   // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transpoter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:true,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASSWORD
    }
  })
  // 2) Define the email options
  const mailOptions={
    from:`E-shop App <gaithdebo.94@gmail.com>`,
    to:options.email,
    subject:options.subject,
    text:options.message
  }
  // 3) Send Email using transporter and mailOptions
  await transpoter.sendMail(mailOptions);

}