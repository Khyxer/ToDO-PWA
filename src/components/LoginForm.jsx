import React from "react";
import ToggleTheme from "./ToggleTheme";

export const InputItem = ({ type, texto, isPass }) => (
  <div className=" relative group">
    <input
      type={type}
      required
      className="border-b-2 w-full bg-transparent text-[#4C4C4C] dark:text-[#d3d3d3c5] border-[#728AA1] dark:focus:border-[#d3d3d3c5] dark:valid:border-[#d3d3d3c5] focus:border-[#4C4C4Cc5] valid:border-[#4C4C4Cc5] placeholder:text-[#728AA1] px-2 text-lg outline-none peer"
    />
    <label
      className={`absolute left-2 duration-200 pointer-events-none text-base text-[#728AA1]
        peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#728aa17e]
        peer-valid:scale-75 peer-valid:-translate-y-6 peer-valid:text-[#728aa17e]
        ${isPass ? "peer-focus:left-1 peer-valid:left-1" : ""}`}
    >
      {texto}
    </label>
  </div>
);

const LoginForm = () => {
  return (
    <>
      <ToggleTheme />
      <div className="dark:bg-[#152232] bg-[#FAFAFA] p-6 gap-10 rounded-lg w-[80%] flex flex-col justify-center items-center">
        <h2 className="dark:text-[#728AA1] text-4xl font-extrabold text-[#4A6A83] ">
          Log In
        </h2>
        <div className="w-full flex flex-col gap-8">
          <InputItem type={"text"} texto={"Email"} isPass={false} />
          <InputItem type={"password"} texto={"Password"} isPass={true} />
        </div>
        <button className="dark:bg-[#027FBE] bg-[#2696E0] text-xl font-bold py-1 px-8 text-[#EDF1F5] dark:text-[#D3D3D3] rounded-xl ">
          Log In
        </button>
        <strong className=" text-[#4C4C4C] dark:text-[#D3D3D3] text-xs">
          Do you no have account?{" "}
          <a className="dark:text-[#027FBE] text-[#2696E0]" href="/register">
            Create a new account
          </a>
        </strong>
      </div>
    </>
  );
};

export default LoginForm;
