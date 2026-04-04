import nodemailer from "nodemailer";
import { config } from "../config.js";
export const nodemailerService = {
  async sendEmail({ to } : { to:string }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
      }
    });
    try {
      await transporter.verify();
      console.log("Nodemailer transporter is ready to send emails");
    } catch (error) {
      console.error("Error verifying Nodemailer transporter:", error);
    }
    try {
      const info = await transporter.sendMail({
        from: "gonzalohaag1311@gmail.com",
        to: to,
        subject: "Test Email from Nodemailer",
        text: "This is a test email sent using Nodemailer with OAuth2 authentication.",
        html: "<p>This is a test email sent using <b>Nodemailer</b> with OAuth2 authentication.</p>",
      });   
      console.log("Email enviado", info.messageId);
    }
    catch (error) {
      console.error("Error sending email:", error);
    }
  }
};