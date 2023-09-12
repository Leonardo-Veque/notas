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

export default function Editar() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [notas, setNotas] = useState([]);
  const [idNotas, setIdNotas] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNotas() {
      const listRef = onSnapshot(collection(db, "usuarios"), (snapshot) => {
        let listaNota = [];

        snapshot.forEach((doc) => {
          listaNota.push({
            id: doc.id,
            titulo: doc.data().titulo,
            notas: doc.data().notas,
          });
          console.log(doc.data());
        });
        setNotas(listaNota);
        console.log(notas);
      });
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
        setIdNotas("");
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
    <div className="note new">
      <h2>Pode editar sua nota</h2>
      <label>Titulo</label>
      <input
        type="text"
        placeholder="Digite o titulo"
        value={notas.titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <label>Escreva sua nota</label>
      <textarea
        placeholder="Clique para escrever..."
        value={notas.notas}
        onChange={(e) => setTexto(e.target.value)}
      />
      <div className="note-footer">
        <button onClick={(e) => editarNotas(id, e)}>Atualizar</button>
      </div>
    </div>
  );
}
