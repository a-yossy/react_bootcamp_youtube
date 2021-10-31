import { useEffect, PropsWithChildren } from "react";
import { useSetRecoilState } from "recoil";
import { fireAuth } from "utils/Firebase/config";
import { AuthCredential } from "stores/AuthCredential";
import { AuthCredentialLoaded } from "stores/AuthCredentialLoaded";

export const AuthStateListener = ({ children } : PropsWithChildren<{}>) => {
  const setCredential = useSetRecoilState(AuthCredential);
  const setLoaded = useSetRecoilState(AuthCredentialLoaded);

  useEffect(() => {
    const unsubscriber = fireAuth.onAuthStateChanged(async (credential) => {
      setCredential(credential?.uid || undefined);

      setLoaded(true);
    });
    
    return unsubscriber;
  });
  return <>{children}</>
};
