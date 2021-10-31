import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { GlobalUser } from "stores/User";
import { FireSignupType } from "utils/Firebase/signup";
import { signup as fireSignup } from "utils/Firebase/signup";
import { useInsertUserMutation } from "utils/graphql/generated";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { checkAuthToken } from "hooks/Authentication/useSignup/checkAuthToken";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setGlobalUser = useSetRecoilState(GlobalUser);
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;
    if (!nameRef.current?.value) {
      setError("name", "名前が入力されていません。");
      invalidValidation = true;
    }

    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }

    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }

    return invalidValidation;
  };

  const signup = async() => {
    const { user } = await fireSignup({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ユーザーの登録に失敗しました。");
    }

    await checkAuthToken(user.uid);

    const apolloResponse = await insertMutation({
      variables: {
        id: user.uid,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
      setGlobalUser(apolloResponse.data?.insert_users_one);
      navigate("/");
    } else {
      throw new Error("ユーザーの登録に失敗しました。");
    }
  };

  const { authExecute, error, setErrorHandler, loading } = useAuthHelper(
    signup,
    formValidation
  );

  useEffect(() => {
    if (apolloError?.message) {
      setErrorHandler("main", apolloError.message);
    }
  }, [apolloError]);

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup: authExecute,
    error,
    loading,
  };
};
