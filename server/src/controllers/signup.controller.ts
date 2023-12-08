import express, { RequestHandler } from "express";
import {
  createNewUserAccount,
  createNewUserInfo,
  getTheSameUsername,
} from "../services/user.service";

export const checkUsernameValidation: RequestHandler = async (req, res) => {
  const usernameFromClient = req.query.username;
  if (usernameFromClient) {
    const foundUsername = await getTheSameUsername(
      usernameFromClient as string
    );
    let isUsernameValid;
    if (foundUsername.length === 1) {
      isUsernameValid = false;
    } else {
      isUsernameValid = true;
    }
    res.status(200).send(isUsernameValid);
  } else {
    res.status(400).send("No username given from client");
  }
};

export const createNewUser: RequestHandler = async (req, res) => {
  const signupInfo = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    telephon: req.body.telephon,
    address: req.body.address,
  };
  const newUser = await createNewUserInfo(signupInfo);
  const newUserId = Number(newUser[0].id);

  if (newUserId) {
    const accountInfo = {
      username: req.body.username,
      password: req.body.password,
      userId: newUserId,
    };
    const newAccount = await createNewUserAccount(accountInfo);
    res.status(200).send("success with registering new user");
  }
};
