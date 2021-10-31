import { fireAuth } from "utils/Firebase/config";

export const forgetPass = (email: string) =>
  fireAuth.sendPasswordResetEmail(email);