import { fireAuth } from "utils/Firebase/config";

export type FireLoginType = {
  email: string,
  password: string,
};

export const login = ({ email, password }: FireLoginType) => 
  fireAuth.signInWithEmailAndPassword(email, password);