import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(null);
    setError(null);

    const response = await fetch("https://workout-buddy-backend-azure.vercel.app/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      //   save the user & token to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //   update the authContext
      dispatch({ type: "LOGIN", payload: json });

      //   update the isLoading state
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
