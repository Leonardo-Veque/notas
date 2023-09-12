import Header from "../../components/Header";

import { useState, useEffect, useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./index.css";
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

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Notas() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [notas, setNotas] = useState([]);
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

  async function handleAdd() {
    await addDoc(collection(db, "usuarios"), {
      titulo: titulo,
      notas: texto,
    })
      .then(() => {
        console.log("Notas Salva");
        setTexto("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("erro" + error);
      });
  }
  async function excluirNotas(id) {
    const docRef = doc(db, "usuarios", id);
    await deleteDoc(docRef).then(() => {
      toast.success("Nota removida");
    });
  }

  /*Estrutura criar nota */
  return (
    <div className="container">
      <Header />
      <div className="notes-list">
        <div className="note">
          {notas.map((notas) => {
            return (
              <div key={notas.id}>
                <span> {notas.titulo}</span>
                <span>{notas.notas}</span>
                <button onClick={() => excluirNotas(notas.id)}>Excluir</button>
                <div className="note-footer">
                  <button>
                    <a href={`editar/${notas.id}`}>Vizualizar</a>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="note-new">
          <input
            type="text"
            placeholder="Digite o titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            placeholder="Clique para escrever..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <div className="note-footer">
            <button onClick={handleAdd}>Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
