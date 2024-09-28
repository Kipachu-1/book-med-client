"use client";
import { useState } from "react";
import Login from "./login";
import SignUp from "./sign-up";

type TAuthorizationProps = {
  authType: "login" | "register";
};

export const Authorization: React.FC<TAuthorizationProps> = ({ authType }) => {
  const [_type, setType] = useState(authType);

  const goToLogin = () => setType("login");
  const goToRegister = () => setType("register");

  return (
    <>
      {_type === "login" ? (
        <Login onSignUp={goToRegister} />
      ) : (
        <SignUp onLogin={goToLogin} />
      )}
    </>
  );
};
