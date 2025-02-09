import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const useThemeUser = async () => {
  try {
    const currentUser = auth.currentUser.uid;
    const userRef = doc(db, `users/${currentUser}`);
    const docSnap = await getDoc(userRef);
    const currentTheme = docSnap.data().theme;

    if (currentTheme != "dark") {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {
    console.error("error", error);
  }
};
