import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
import { Login as login, Signup } from "../Types/Login";

// User
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

export async function getUsernameWithEmail(userEmail: string) {
  const response = await axios.get(`/user/getUsername?userEmail=${userEmail}`);
  return response.data as string;
}
export async function findUserAccount(userInput: {
  username: string;
  email: string;
}) {
  const response = await axios.get(
    `/user/findUserAccount?username=${userInput.username}&&email=${userInput.email}`
  );
  return response.data as string;
}
// export async function findUserAccount(userInput: string) {
//   const response = await axios.get(`/user/findAccount?userInput=${userInput}`);
//   return response.data as number;
// }

// export async function findUserAccount(userInput: string) {
//   const response = await axios.get(`/user/findAccount?userInput=${userInput}`);
//   return response.data as number;
// }

export async function sendEmailVerificationCode(userEmail: string) {
  const response = await axios.get(
    `/user/getEmailVerificationCode?userEmail=${userEmail}`
  );
  console.log(response);
}
