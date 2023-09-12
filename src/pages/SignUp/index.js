import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      await signUp(email, password, name);
    }
  }

  return (
    <div className="body">
      <div id="form">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Cadastrar</h1>

          <label>Nome</label>
          <input
            className="input"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            className="input"
            type="text"
            placeholder="Email por favor"
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
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/" className="link">
          Já possui uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}
