export function convertSortAndOrder(
  sortByName: string,
  changedSortByName: string,
  orderByName: string,
  changedOrderByName: string
) {
  if (sortByName === "date") {
    changedSortByName = "Date";
  } else if (sortByName === "name") {
    changedSortByName = "Name";
  } else if (sortByName === "size") {
    changedSortByName = "Size";
  }
  if (orderByName === "asc") {
    changedOrderByName = "A-Z";
  } else if (orderByName === "desc") {
    changedOrderByName = "Z-A";
  }
}
