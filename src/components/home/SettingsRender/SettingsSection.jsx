import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import UserPreference from "./UserPreference";
import EditProfile from "./EditProfile";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useUserColor } from "../../../contexts/UserColorContext";
import Spinner from "../../others/Spinner";
import { auth, db } from "../../../firebase/config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import Loading from "../../Loading";

const SettingsSection = () => {
  const toast = useToast();
  const { userColor, loading } = useUserColor();
  const { user, logout, uploadImageToImgBB } = useAuth();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  //estos son los datos de los otros componentes
  const [settings, setSettings] = useState({
    userName: user.username,
    selectedColor: user.preferences?.color || userColor,
    selectedTheme: user.preferences?.theme || { theme: "dark" },
    avatarFile: null,
    bannerFile: null,
  });

  //estas son las funciones para manejar el cambio en un algun dato de los ajustes
  const handleFileChange = (type, file) => {
    setSettings((prev) => ({
      ...prev,
      [`${type}File`]: file,
    }));
  };

  const handleUserNameChange = (newUserName) => {
    setSettings((prev) => ({
      ...prev,
      userName: newUserName,
    }));
  };

  const handleColorChange = (color) => {
    setSettings((prev) => ({
      ...prev,
      selectedColor: color,
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({
      ...prev,
      selectedTheme: theme,
    }));
  };

  //esta es la funcion para actualizar el perfil
  const updateProfile = async () => {
    if (!settings.userName?.trim()) {
      toast.error("Enter a valid username");
      return;
    }

    //esto es para actualizar el documento con los nuevos datos
    const currentUser = auth.currentUser.uid;
    setUpdatingProfile(true);

    try {
      const userRef = doc(db, `users/${currentUser}`);
      const docSnap = await getDoc(userRef);

      //si settings avatar o banner file son falso su valor sera la misma url
      const currentAvatar = docSnap.data().avatarUrl;
      const currentBanner = docSnap.data().bannerUrl;

      let avatarUrl = currentAvatar;
      let bannerUrl = currentBanner;

      if (settings.avatarFile) {
        avatarUrl = await uploadImageToImgBB(settings.avatarFile);
      }

      if (settings.bannerFile) {
        bannerUrl = await uploadImageToImgBB(settings.bannerFile);
      }

      await updateDoc(userRef, {
        color: settings.selectedColor,
        username: settings.userName,
        theme: settings.selectedTheme.theme,
        avatarUrl: avatarUrl,
        bannerUrl: bannerUrl,
      });
      window.location.reload();
      setUpdatingProfile(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdatingProfile(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {updatingProfile && (
        <div className="fixed top-0 left-0 w-full z-[999] ">
          <Loading message={"Updating profile..."} />
        </div>
      )}
      <main>
        <header className="mb-6">
          <h1 className="font-medium text-xl lg:text-2xl text-[#4A6A83] dark:text-[#728AA1]">
            Settings
          </h1>
        </header>

        <div className="px-6 py-4 rounded-lg dark:bg-[#152232] bg-[#FAFAFA] space-y-6">
          <UserPreference
            onColorSelect={handleColorChange}
            onThemeSelect={handleThemeChange}
            defaultTheme={settings.selectedTheme.theme} //esto no deberia hacer nada pero por alguna razon rompe todo xD
          />

          <EditProfile
            onUserNameChange={handleUserNameChange}
            initialUsername={settings.userName}
            onFileChange={handleFileChange}
          />

          <div
            className="flex items-center lg:flex-row flex-col-reverse justify-between gap-6 pt-4 border-t
           border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={logout}
              className="border-red-600 border-2 hover:bg-red-600 duration-200 rounded-md text-red-600 
              hover:text-[#e9e9e9] font-semibold w-full lg:w-fit px-5 py-2 lg:py-1 
              flex items-center justify-center gap-1"
            >
              <IoLogOutOutline className="lg:text-3xl text-2xl" />
              Logout
            </button>

            <button
              onClick={updateProfile}
              className="bg-[#2696E0] border-[#2696E0] border-2 text-[#e9e9e9] font-semibold 
              w-full lg:w-fit px-5 py-2 lg:py-1 flex items-center justify-center gap-1 
              rounded-md hover:bg-[#3280b4] hover:border-[#3280b4] duration-150"
            >
              <FaRegSave />
              Save
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsSection;
