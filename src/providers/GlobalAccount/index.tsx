import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalUser } from "stores/User";
import { useUserByIdLazyQuery } from "utils/graphql/generated";
import { AuthCredential } from "stores/AuthCredential";
import { AuthCredentialLoaded } from "stores/AuthCredentialLoaded";
import { AccountLoaded } from "stores/AccountLoaded";

export const GlobalAccount = ({ children }: PropsWithChildren<{}>) => {
  const [
    userQuery,
    { data: apolloData, error: apolloError, loading: apolloLoading },
  ] = useUserByIdLazyQuery();

  const [globalUser, setGlobalUser] = useRecoilState(GlobalUser);
  const credential = useRecoilValue(AuthCredential);
  const authLoaded = useRecoilValue(AuthCredentialLoaded);

  const setAccountLoaded = useSetRecoilState(AccountLoaded);

  useEffect(() => {
    if (authLoaded) {
      if (credential) {
        if (!apolloLoading && !globalUser?.id) {
          setAccountLoaded(false);
          userQuery({ variables: { id: credential } });
        }
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [credential, authLoaded]);

  useEffect(() => {
    if (authLoaded && !apolloLoading) {
      if (apolloData?.users_by_pk?.id && credential) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
      setAccountLoaded(true);
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
    }
  }, [apolloError]);

  return <>{children}</>
};
