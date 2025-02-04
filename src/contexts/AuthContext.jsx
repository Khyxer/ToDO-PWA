import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const uploadImageToImgBB = async (file) => {
    const API_KEY = "78eec7ce5ba78b3c3b67b3897a11468e";
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error al subir la imagen");
    }
  };

  const signup = async (email, password, username, avatarFile, bannerFile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let avatarUrl = null;
      let bannerUrl = null;

      if (avatarFile) {
        avatarUrl = await uploadImageToImgBB(avatarFile);
      }

      if (bannerFile) {
        bannerUrl = await uploadImageToImgBB(bannerFile);
      }

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        avatarUrl,
        bannerUrl,
        theme: "dark",
        color: "#DA4127",
      });
    } catch (error) {
      console.error("Error in signup:", error);
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ ...currentUser, ...docSnap.data() });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, loading, uploadImageToImgBB }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
