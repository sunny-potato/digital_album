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

export async function getUsername(userId: number) {
  return await sql`select user_name from user_account where user_id=${userId}`;
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
