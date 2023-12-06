import crypto from "crypto";

export function getUnikImageName() {
  return crypto.randomUUID();
}
