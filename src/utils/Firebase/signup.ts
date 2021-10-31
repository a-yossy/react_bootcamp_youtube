import { fireAuth } from "utils/Firebase/config";

export type FireSignupType = {
  email: string,
  password: string,
};

export const signup = ({ email, password }: FireSignupType) =>
  fireAuth.createUserWithEmailAndPassword(email, password);