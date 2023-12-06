import { RequestHandler } from "express";
import { AccountFromUser, UserAccount } from "../models/types";
import { getAllUserAccounts } from "../services/user";

export const checkUserProfileMatch: RequestHandler = async (req, res) => {
  const userProfileFromClient = req.query as AccountFromUser;
  const userProfileListFromDB = await getAllUserAccounts();

  const userProfileValidationResult = isUserAccountValidated(
    userProfileFromClient,
    userProfileListFromDB
  );
  res.status(200).send(userProfileValidationResult);
};

function isUserAccountValidated(
  userProfileFromClient: { username: string; password: string },
  userProfileListFromDB: any
) {
  const matchedUserName = userProfileListFromDB.find((account: UserAccount) => {
    return account.user_name === userProfileFromClient.username;
  });
  if (matchedUserName === undefined) {
    return { result: false };
  } else {
    if (matchedUserName.user_password === userProfileFromClient.password) {
      return {
        result: true,
        username: matchedUserName.user_name,
        userId: matchedUserName.user_id,
      };
    } else {
      return { result: false };
    }
  }
}
