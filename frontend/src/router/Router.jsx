import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import ChatPage from "../pages/chatBot/ChatPage";
import UserPanel from "../pages/user/UserPanel";
import { Zones } from "../pages/zones/Zones";
import { Questionnaire } from "../pages/questionnaire/Questionnaire";
import { Results } from "../pages/results/Results";
import { Settings } from "../pages/settings/Settings";

export const RouterLocation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
        <Route path="/panel" element={<UserPanel />}>
          <Route path="zones" element={<Zones />} />

          <Route path="dashboard" element={<Zones />} />
          <Route path="settings" element={<Settings />} />
          <Route path="results" element={<Results />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
