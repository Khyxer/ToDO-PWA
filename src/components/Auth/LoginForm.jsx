import React, { useEffect, useState } from "react";
import ToggleTheme from "../ToggleTheme";
import { InputItem } from "./InputItem";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import Loading from "../Loading";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error al iniciar sesión. Por favor verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Loading message={"logging in..."} /> : ""}
      <ToggleTheme />
      <div className="dark:bg-[#152232] bg-[#FAFAFA] py-20 px-9 gap-10 rounded-lg md:w-[60%] xl:w-[30%] w-full flex flex-col justify-center items-center">
        <h2 className="dark:text-[#728AA1] text-5xl font-extrabold text-[#4A6A83] ">
          Log In
        </h2>
        <form className="flex flex-col gap-10 w-full " onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-8">
            <InputItem
              type={"text"}
              texto={"Email"}
              isPass={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputItem
              type={"password"}
              texto={"Password"}
              isPass={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="dark:bg-[#027FBE] bg-[#2696E0] text-xl font-bold py-1 px-8 text-[#EDF1F5] dark:text-[#D3D3D3] rounded-xl ">
            Log In
          </button>
        </form>
        <p className=" text-[#4C4C4C] dark:text-[#D3D3D3] font-medium text-xs lg:text-base">
          Do you no have account?{" "}
          <a className="dark:text-[#027FBE] text-[#2696E0]" href="/register">
            Create a new account
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
