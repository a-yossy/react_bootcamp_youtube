import { useState } from "react";

export type ErrorState = "main" | "name" | "email" | "password";
export type SetErrorFn = (name: ErrorState, message: string) => void;

export const useAuthHelper = (
  executeProcess: () => Promise<void>,
  formValidation: (setError: SetErrorFn) => boolean
) => {
  const [error, setError] = useState<Map<ErrorState, string>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorHandler: SetErrorFn = (name, message) => {
    setError((prev) => new Map(prev.set(name, message)));
  };

  const authExecute = async() => {
    setError(new Map());
    const invalidValidation = formValidation(setErrorHandler);
    if (invalidValidation) return;
    setLoading(true);

    try {
      await executeProcess();
    } catch (error : any) {
      setErrorHandler("main", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    authExecute,
    loading,
    error,
    setErrorHandler
  };
};
