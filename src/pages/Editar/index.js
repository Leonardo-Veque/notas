import { useState, useEffect, useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Header from "../../components/Header";

export default function Editar() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [notas, setNotas] = useState([]);
  const [idNotas, setIdNotas] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();
  const [nota, setNota] = useState([]);

  useEffect(() => {
    async function loadNotas() {
      const notaRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(notaRef);
      docSnap.data();
      try {
        const docSnap = await getDoc(notaRef);
        setTitulo(docSnap.data().titulo);
        setTexto(docSnap.data().notas);
      } catch (error) {
        console.log(error);
      }
    }
    loadNotas();
  }, []);

  async function editarNotas(id) {
    const docRef = doc(db, "usuarios", id);

    await updateDoc(docRef, {
      titulo: titulo,
      notas: texto,
    })
      .then(() => {
        console.log("Notas Atualizado");
        setTitulo("");
        setTexto("");
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("NOTA EDITADA COM SUCESSO!");
    navigate("/notas");
  }
  return (
    <div className="container">
      <Header />
      <div className="note-new">
        <h2>Pode editar sua nota</h2>
        <label>Titulo</label>
        <input
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Escreva sua nota</label>
        <textarea
          placeholder="Clique para escrever..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="note-footer">
          <button onClick={(e) => editarNotas(id, e)}>Atualizar</button>
        </div>
      </div>
    </div>
  );
}
