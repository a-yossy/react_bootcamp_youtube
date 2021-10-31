import { firestore, fireAuth } from "utils/Firebase/config";

export const checkAuthToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(
        { includeMetadataChanges: true },
        async (doc) => {
          if (!doc.exists) return;
          const idToken = await fireAuth.currentUser?.getIdTokenResult();

          if (
            idToken?.token &&
            idToken.claims["https://hasura.io/jwt/claims"]
          ) {
            unsubscribe();
            resolve(idToken.token);
          }
        },
        reject
      );
  });
};
