import { useState, useContext } from "react";
import "../SignUp/index.css";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signIn(email, password);
    }
  }

  return (
    <div className="body">
      <form onSubmit={handleSignIn} id="form">
        <h1 className="title">Entrar</h1>

        <label>Email</label>
        <input
          className="input"
          type="text"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" id="btn">
          {loadingAuth ? "Carregando..." : "Acessar"}
        </button>
        <Link to="/register" className="link">
          Criar uma conta
        </Link>
      </form>
    </div>
  );
}
