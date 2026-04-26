import nodemailer from "nodemailer";
import { config } from "../config.js";
export const nodemailerService = {
  async sendEmail({ to } : { to:string }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gonzalohaag1311@gmail.com",
        pass: config.GOOGLE_APP_PASSWORD
      }
    });
    try {
      const info = await transporter.sendMail({
        from: "gonzalohaag1311@gmail.com",
        to: to,
        subject: "Lavado finalizado!",
        html: "<p>Su lavado ha sido finalizado. Puedes pasar a retirar el vehículo cuando quieras.</p>",
      });   
      console.log("Email enviado", info.messageId);
    }
    catch (error) {
      console.error("Error sending email:", error);
    }
  }
};