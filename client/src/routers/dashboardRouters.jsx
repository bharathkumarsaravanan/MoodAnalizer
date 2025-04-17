import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardContainer";
import HomeLayout from "../pages/homeLayout/HomeLayout";
import Login from "../pages/auth/login/Login";
import SpotifyLoggedIn from "../pages/auth/login/SpotifyLoggedIn";
const DashboardRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/spotify-logged-in" element={<SpotifyLoggedIn />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        {/* <Route path="/playlist/:id" element={<Playlist />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default DashboardRouters;
