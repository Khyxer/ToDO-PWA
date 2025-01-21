import React from "react";
import ToggleTheme from "./ToggleTheme";
import { InputItem } from "./LoginForm";

const RegisterForm = () => {
  return (
    <>
      <ToggleTheme />
      <div className="dark:bg-[#152232] bg-[#FAFAFA] p-6 gap-10 rounded-lg w-[80%] flex flex-col justify-center items-center">
        <h2 className="dark:text-[#728AA1] text-4xl font-extrabold text-center text-[#4A6A83] ">
          Create New Account
        </h2>
        <div className="w-full flex flex-col gap-10">
          <div className="grid gap-2">
            <p className="text-[#728AA1]">Upload your avatar</p>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <div className="w-[76px] h-[76px] dark:bg-[#272C38] bg-[#A3B0C2] flex justify-center items-center ">
                  <p className="text-[11px] text-[#B9B9B9] text-center">
                    Click to upload avatar
                  </p>
                </div>
              </div>
              <InputItem type={"text"} texto={"User Name"} isPass={false} />
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-[#728AA1]">Upload your banner</p>
            <div className="flex-1">
              <div className="w-full h-[76px] dark:bg-[#272C38] bg-[#A3B0C2] flex justify-center items-center ">
                <p className="text-[11px] text-[#B9B9B9] text-center">
                  Click to upload banner
                </p>
              </div>
            </div>
          </div>
          <InputItem type={"text"} texto={"Email"} isPass={false} />
          <InputItem type={"password"} texto={"Password"} isPass={true} />
        </div>
        <button className="dark:bg-[#027FBE] bg-[#2696E0] text-xl font-bold py-1 px-8 text-[#EDF1F5] dark:text-[#D3D3D3] rounded-xl ">
          Create Account
        </button>
        <strong className=" text-[#4C4C4C] dark:text-[#D3D3D3] text-xs">
          Do you have account?{" "}
          <a className="dark:text-[#027FBE] text-[#2696E0]" href="/login">
            Log in your account
          </a>
        </strong>
      </div>
    </>
  );
};

export default RegisterForm;
