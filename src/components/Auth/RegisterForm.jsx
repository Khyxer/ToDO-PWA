import React, { useState } from "react";
import ToggleTheme from "../ToggleTheme";
import { InputItem } from "./InputItem";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loading";

const TestItem = ({
  title,
  fileId,
  isBanner,
  value,
  onChange,
  file,
  onChangeImg,
}) => (
  <div className="grid gap-4">
    <p className="text-[#728AA1]">{title}</p>
    <div>
      <label
        htmlFor={fileId}
        className="inline-block border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-md cursor-pointer hover:bg-gray-200 font-medium duration-200"
      >
        Select file
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onChangeImg}
        id={fileId}
        className="hidden"
      />
    </div>
    <div className={isBanner ? "" : "flex items-end gap-2"}>
      {file && (
        <div>
          <div
            className={`${
              isBanner ? "w-full rounded-none lg:h-36" : "w-24 rounded-full"
            } h-24 dark:bg-[#272C38] bg-[#A3B0C2] overflow-hidden`}
          >
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
      {!isBanner && (
        <div className="w-full">
          <InputItem
            type="text"
            texto="User Name"
            isPass={false}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  </div>
);

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      await signup(email, password, username, avatarFile, bannerFile);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Error al registrar usuario: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size <= 2 * 1024 * 1024) {
          setFile(file);
          setError("");
        } else {
          setError("La imagen debe ser menor a 2MB");
        }
      } else {
        setError("Por favor selecciona un archivo de imagen válido");
      }
    }
  };

  return (
    <>
      {isUploading && <Loading message={"Creating your account..."} />}
      <ToggleTheme />
      <div className="dark:bg-[#152232] bg-[#FAFAFA] p-6 gap-10 rounded-lg md:w-[60%] xl:w-[40%] w-full flex flex-col justify-center items-center">
        <h2 className="dark:text-[#728AA1] text-4xl font-extrabold text-center text-[#4A6A83]">
          Create New Account
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col w-full gap-10" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-10">
            <TestItem
              isBanner={false}
              title="Upload your avatar"
              fileId="avatar-file-upload"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onChangeImg={(e) => handleFileChange(e, setAvatarFile)}
              file={avatarFile}
            />
            <TestItem
              isBanner={true}
              title="Upload your banner"
              fileId="banner-file-upload"
              onChangeImg={(e) => handleFileChange(e, setBannerFile)}
              file={bannerFile}
            />

            <InputItem
              type="text"
              texto="Email"
              isPass={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputItem
              type="password"
              texto="Password"
              isPass={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="dark:bg-[#027FBE] bg-[#2696E0] text-xl font-bold py-1 px-8 text-[#EDF1F5] dark:text-[#D3D3D3] rounded-xl"
            disabled={isUploading}
          >
            Create Account
          </button>
        </form>

        <p className="text-[#4C4C4C] dark:text-[#D3D3D3] font-medium text-xs lg:text-base">
          Do you have account?{" "}
          <a className="dark:text-[#027FBE] text-[#2696E0]" href="/login">
            Log in your account
          </a>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
