import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Login as login, Signup } from "../Types/Login";
import { ProfileInfo, userInput } from "../Types/Commonness";

export async function validateLoginInfo(loginInfo: login) {
  return await axios.get(
    `/login?username=${loginInfo.username}&&password=${loginInfo.password}`
  );
}

export async function checkUsernameAvailability(currentUsername: string) {
  return await axios.get(`/signup?username=${currentUsername}`);
}
export async function createNewAccount(signupInfo: Signup) {
  return await axios.post(`/signup/newuser`, signupInfo);
}

export async function getUsername(userId: number) {
  const response = await axios.get(`/user?userId=${userId}`);
  return response.data as string;
}

export async function getUsernameWithEmail(email: string) {
  const response = await axios.get(`/user/getUsername?email=${email}`);
  return response.data as string;
}
export async function findUserAccount(userInput: {
  username: string;
  email: string;
}) {
  const response = await axios.get(
    `/user/findUserAccount?username=${userInput.username}&email=${userInput.email}`
  );
  return response.data as string;
}

export async function sendEmailVerificationCode(userData: userInput) {
  const response = await axios.get(
    `/user/getEmailVerificationCode?useremail=${userData.email}&username=${userData.username}`
  );
  return response.data as boolean;
}

export async function checkVerificationCode(
  userData: userInput,
  securityCode: number
) {
  const response = await axios.get(
    `/user/checkVerificationCode?useremail=${userData.email}&username=${userData.username}&sercuritycode=${securityCode}`
  );
  return response.data as boolean;
}

export async function updatePassword(userData: {
  username: string;
  newPassword: string;
}) {
  const response = await axios.post(
    `/user/${userData.username}/updatePassword`,
    userData
  );
  return response.data as string;
}

export async function getuserAllInformation(userId: number) {
  const response = await axios.get(`/user/profile?userId=${userId}`);
  return response.data as ProfileInfo;
}
