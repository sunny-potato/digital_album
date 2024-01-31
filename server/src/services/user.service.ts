import sql from "../configs/db.config";

export async function getAllUserAccounts() {
  return await sql`select * from user_account`;
}

// export async function findPassword(password: string) {
//   return await sql`select * from user_account where password=${password}`;
// }

export async function getTheSameUsername(username: string) {
  return await sql`select * from user_account where user_name=${username}`;
}
export async function getTheSameEmail(email: string) {
  return await sql`select * from user_info where email=${email}`;
}

export async function getUsername(userId: number) {
  return await sql`select user_name from user_account where user_id=${userId}`;
}

export async function getUserInfoWithUsernameAndEmail(userInput: {
  username: string;
  email: string;
}) {
  return await sql`select * from user_account inner join user_info on user_info.id=user_account.user_id where user_account.user_name=${userInput.username} and user_info.email=${userInput.email}`;
}

export async function createNewUserInfo(userInfo: {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  telephon: string;
  address: string;
}) {
  return await sql`insert into user_info(first_name, last_name, birthdate, email, telephon, address) values(${userInfo.firstname}, ${userInfo.lastname},${userInfo.birthdate},${userInfo.email},${userInfo.telephon},${userInfo.address}) returning id`;
}
export async function createNewUserAccount(userAccount: {
  username: string;
  password: string;
  userId: number;
}) {
  return await sql`insert into user_account(user_name, user_password, user_id) values(${userAccount.username}, ${userAccount.password}, ${userAccount.userId}) `;
}

export async function saveSecurityCode(codeInfo: {
  code: number;
  userId: number;
}) {
  return await sql`insert into security_code(code, user_id) values(${codeInfo.code},${codeInfo.userId} )`;
}

export async function matchSecurityCode(userId: number) {
  return await sql`select * from security_code where user_id=${userId}`;
}

export async function deleteSecurityCode(codeInfo: {
  code: number;
  userId: number;
}) {
  return await sql`delete from security_code where user_id=${codeInfo.userId} `;
}

export async function updatePassword(userData: {
  username: string;
  newPassword: string;
}) {
  return await sql`update user_account set user_password=${userData.newPassword} where user_name=${userData.username} `;
}
