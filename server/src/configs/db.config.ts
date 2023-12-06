import postgres from "postgres";
import "dotenv/config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// connect to noen.tech
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: "require" });

// psql
// const sql = postgres({
//   database: PGDATABASE,
//   host: PGHOST,
//   user: PGUSER,
//   password: PGPASSWORD,
// });

// testDB();
// async function testDB() {
//   console.log("HEEI!");
//   const res = await sql`
//         select * from album;
//     `;
//   console.log(res);
// }

export default sql;
