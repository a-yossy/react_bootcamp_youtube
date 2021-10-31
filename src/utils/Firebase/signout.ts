import { fireAuth } from "utils/Firebase/config";

export const signout = () =>
  fireAuth.signOut();