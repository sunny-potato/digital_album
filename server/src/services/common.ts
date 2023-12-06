import sql from "../configs/db.config";

export async function getSortBy(sortById: number) {
  return await sql`select name from sort_by where id=${sortById}`;
}

export async function getOrderBy(orderById: number) {
  return await sql`select name from order_by where id=${orderById}`;
}
