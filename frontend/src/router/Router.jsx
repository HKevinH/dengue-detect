import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import ChatPage from "../pages/chatBot/ChatPage";
import UserPanel from "../pages/user/UserPanel";

export const RouterLocation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/panel" element={<UserPanel />} />
      </Routes>
    </BrowserRouter>
  );
};
