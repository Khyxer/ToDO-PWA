import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { UserColorProvider } from "./contexts/UserColorContext";
import { doc, getDoc } from "firebase/firestore";
import { useThemeUser } from "./hooks/useThemeUser";

function AppContent() {
  useDocumentTitle();
  useThemeUser();

  return (
    <UserColorProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/loading"
          element={<Loading message={"You shouldn't see this page..."} />}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserColorProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
