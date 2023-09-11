import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Notas from "../pages/Notas";

import Private from "./Private";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/notas"
        element={
          <Private>
            <Notas />
          </Private>
        }
      />
    </Routes>
  );
}
export default RoutesApp;
