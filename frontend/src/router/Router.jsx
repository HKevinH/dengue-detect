import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import ChatPage from "../pages/chatBot/ChatPage";
import UserPanel from "../pages/user/UserPanel";
import { Zones } from "../pages/zones/Zones";

export const RouterLocation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
        <Route path="/panel" element={<UserPanel />}>
          <Route path="zones" element={<Zones />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
