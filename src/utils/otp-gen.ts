import { randomInt } from "node:crypto";

function generateOtp(): number {
  return randomInt(1000, 10000);
}

export default generateOtp;
