import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const UserColorContext = createContext();

export const useUserColor = () => {
  return useContext(UserColorContext);
};

export const UserColorProvider = ({ children }) => {
  const [userColor, setUserColor] = useState("#DA4127");
  const [loading, setLoading] = useState(true);

  const fetchUserColor = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const color = userData.color || "#DA4127";
        setUserColor(color);
      } else {
        console.error("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user color: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserColor();
  }, []);

  return (
    <UserColorContext.Provider value={{ userColor, setUserColor, loading }}>
      {children}
    </UserColorContext.Provider>
  );
};
