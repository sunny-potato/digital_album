import { RequestHandler } from "express";
import {
  getTheSameEmail,
  getTheSameUsername,
  getUsername,
  getUserInfoWithUsernameAndEmail,
  saveSecurityCode,
  matchSecurityCode,
  deleteSecurityCode,
} from "../services/user.service";
import sendEmail from "../configs/nodemailer.config";
import { createVerificationCode } from "../utils/emailOauth";

export const getUsernameController: RequestHandler = async (req, res) => {
  const userId = Number(req.query.userId);
  const username = await getUsername(userId);
  res.status(200).send(username[0].user_name);
};

export const getUsernameWithEmail: RequestHandler = async (req, res) => {
  const email = req.query.email as string;
  const userId = await getTheSameEmail(email);
  const username = await getUsername(userId[0].id);
  const result = username[0].user_name;
  res.status(200).send(result);
};

export const findUserAccount: RequestHandler = async (req, res) => {
  const username = req.query.username as string;
  const email = req.query.email as string;
  let result;
  const userAccount = await getUserInfoWithUsernameAndEmail({
    username,
    email,
  });
  if (userAccount[0]) {
    result = userAccount[0].email;
  } else {
    result = undefined;
  }

  res.status(200).send(result);
};

export const sendEmailVerificationCode: RequestHandler = async (req, res) => {
  const useremail = req.query.useremail as string;
  const username = req.query.username as string;
  // console.log(username);

  const userInfo = await getUserInfoWithUsernameAndEmail({
    username: username,
    email: useremail,
  });
  if (userInfo.length === 0) return;
  const userId = userInfo[0].id;
  // console.log(userId);
  const securityCode = createVerificationCode();
  const resultSendEmail = await sendEmail({
    to: useremail as string,
    subject: "[Digital album] Please verify your account",
    text: "text",
    html: `<div><div>Hello, ${username}</div>
    <div>You're receiving this e-mail because you requested a password reset for your account.</div>
    <div>To set a new password, enther the verification code on "Digital album" website.</div>
    <div>Verification code: ${securityCode} </div>
    <div>If you did not request this verification, please ignore this email.</div>
    <div>Thank you.</div>
    <div>Digital album team</div></div>`,
  });
  const saveSecurityCodeinDB = await saveSecurityCode({
    code: securityCode,
    userId: userId,
  });
  res.status(200).send(resultSendEmail);
};

export const checkVerificationCode: RequestHandler = async (req, res) => {
  const useremail = req.query.useremail as string;
  const username = req.query.username as string;
  const securityCode = Number(req.query.sercuritycode) as number;
  let isCodeMatched;
  const userInfo = await getUserInfoWithUsernameAndEmail({
    username: username,
    email: useremail,
  });
  if (userInfo.length === 0) return;
  const userId = userInfo[0].id;
  const sendtCode = await matchSecurityCode(userId);
  if (sendtCode[0].code === securityCode) {
    isCodeMatched = true;
    await deleteSecurityCode({ userId: userId, code: securityCode });
  } else {
    isCodeMatched = false;
  }
  res.status(200).send(isCodeMatched);
};
