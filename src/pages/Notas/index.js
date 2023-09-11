/*import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "../../components/NotesList";
import Search from "../../components/Search";
import Header from "../../components/Header";
import "./index.css";

function Notas() {
  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      //Atualizando chamado
      const docRef = doc(db, "notas", id);
      await updateDoc(docRef, {
        notas: notas,
        userId: user.uid,
      })
        .then(() => {
          toast.info("Chamado atualizado com sucesso!");
          setCustomerSelected(0);
          setComplemento("");
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error("Ops erro ao atualizar esse chamado!");
          console.log(error);
        });

      return;
    }

    //Registrar um chamado
    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      notas: notas,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrado!");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops erro ao registrar, tente mais tarde!");
        console.log(error);
      });
  }
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleRegister={handleRegister}
        />
      </div>
    </div>
  );
}
export default Notas;*/

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

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Notas() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [notas, setNotas] = useState([]);
  const [idNotas, setIdNotas] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

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

  async function buscarNotas() {
    const notasRef = collection(db, "usuarios");
    await getDocs(notasRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            notas: doc.data().notas,
          });
        });
        setNotas(lista);
      })
      .catch((error) => {
        console.log("Deu algum erro");
      });
  }
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
  }
  async function excluirNotas(id) {
    const docRef = doc(db, "usuarios", id);
    await deleteDoc(docRef).then(() => {
      alert("Post deletado");
    });
  }
  return (
    <div className="note new">
      <label>Titulo</label>
      <input
        type="text"
        placeholder="Digite o titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <label>Escreva sua nota</label>
      <input
        placeholder="Clique para escrever..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <div className="note-footer">
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarNotas}>Buscar</button>
        <button onClick={e=>editarNotas(id,e)}>Atualizar</button>
      </div>
      <div>
        {notas.map((notas) => {
            return(
            <li key={notas.id}>
              <strong> ID: {notas.id}</strong>
              <span>Titulo: {notas.titulo}</span>
              <span>Texto: {notas.texto}</span>
              <button onClick={() => excluirNotas(notas.id)}>Excluir</button>
            </li>
          
        )})}
      </div>
    </div>
  );
}
