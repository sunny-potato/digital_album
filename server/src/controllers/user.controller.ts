import { RequestHandler } from "express";
import {
  getTheSameEmail,
  getTheSameUsername,
  getUsername,
  getUserInfoWithUsernameAndEmail,
} from "../services/user.service";

export const getUsernameController: RequestHandler = async (req, res) => {
  const userId = Number(req.query.userId);
  const username = await getUsername(userId);
  res.status(200).send(username[0].user_name);
};

export const findUserAccount: RequestHandler = async (req, res) => {
  const username = req.query.username as string;
  const email = req.query.email as string;
  const userAccount = await getUserInfoWithUsernameAndEmail({
    username,
    email,
  });

  res.status(200).send(userAccount[0]);
};

export const getUsernameWithEmail: RequestHandler = async (req, res) => {
  const email = req.query.userEmail as string;
  const userId = await getTheSameEmail(email);
  const username = await getUsername(userId[0].id);
  const result = username[0].user_name;
  res.status(200).send(result);
};
export const sendEmailVerificationCode: RequestHandler = async (req, res) => {
  console.log(req.query);
};
