import nodemailer from "nodemailer";
import "dotenv/config";
import { sendEmail } from "../models/types";

const { GMAILUSER, CLIENTID, CLIENTSECRET, REFRESHTOKEN, ACCESSTOKEN } =
  process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "stmp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: GMAILUSER,
    clientId: CLIENTID,
    clientSecret: CLIENTSECRET,
    refreshToken: REFRESHTOKEN,
    accessToken: ACCESSTOKEN,
    expires: 1484314697598,
  },
});

const sendEmail = async ({ to, subject, text, html }: sendEmail) => {
  const transporterSendEmail = await transporter.sendMail({
    from: GMAILUSER,
    to,
    subject,
    text,
    html,
  });
  if (transporterSendEmail.accepted.length !== 0) {
    console.log(`The email sendt to ${transporterSendEmail.accepted[0]}`);
    return true;
  }
  if (transporterSendEmail.rejected.length !== 0) {
    console.log(`${transporterSendEmail.rejected[0]} rejected to send`);
    return false;
  }
  return false;
};

export default sendEmail;
