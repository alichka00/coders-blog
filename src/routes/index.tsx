import { Articles } from "pages/articles";
import { Admins } from "pages/Admins";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/admins" element={<Admins />}></Route>
      </Route>
      <Route path="*" element={<Navigate to={"/articles"} />} />
    </Routes>
  );
};
