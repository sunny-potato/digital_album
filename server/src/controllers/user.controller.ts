import { RequestHandler } from "express";
import {
  getTheSameEmail,
  getTheSameUsername,
  getUsername,
} from "../services/user.service";

export const getUsernameController: RequestHandler = async (req, res) => {
  const userId = Number(req.query.userId);
  const username = await getUsername(userId);
  res.status(200).send(username[0].user_name);
};

export const findUserAccount: RequestHandler = async (req, res) => {
  const userInput = req.query.userInput as string;
  let result;
  if (userInput.includes("@")) {
    result = await getTheSameEmail(userInput);
  } else {
    result = await getTheSameUsername(userInput);
  }
  res.status(200).send(`${result.length}`);
};
