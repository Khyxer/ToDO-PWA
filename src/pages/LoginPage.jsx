import React from "react";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className=" min-h-[85vh] flex px-6 py-8 justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
