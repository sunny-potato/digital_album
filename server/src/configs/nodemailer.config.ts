import nodemailer from "nodemailer";
import "dotenv/config";

const { GMAILUSER, GMAILPASSWORD } = process.env;
console.log(process.env);

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "stmp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAILUSER,
    pass: GMAILPASSWORD,
  },
});

export default transport;
