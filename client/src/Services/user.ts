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
  return response.data;
}

export async function findUserAccount(userInput: string) {
  const response = await axios.get(`/user/findAccount?userInput=${userInput}`);
  return response.data;
}
