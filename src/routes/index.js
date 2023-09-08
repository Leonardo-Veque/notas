import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Notas from "../pages/notas";

import Private from "./Private";

function RoutesApp() {
  return (
    <Route>
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
    </Route>
  );
}
export default RoutesApp;
