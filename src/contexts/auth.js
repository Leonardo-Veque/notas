import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setloadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@ticketsPRO");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(email, password) {
    setloadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
        };

        setUser(data);
        storageUser(data);
        setloadingAuth(false);
        toast.success("Bem vindo(a) de volta");
        navigate("/notas");
      })
      .catch((error) => {
        console.log(error);
        setloadingAuth(false);
        toast.error("Ops Algo de errado");
      });
  }

  async function signUp(email, password, name) {
    setloadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
          };
          setUser(data);
          storageUser(data);
          setloadingAuth(false);
          toast.success("Seja bem vindo(a)");
          navigate("/notas");
        });
      })
      .catch((error) => {
        console.log(error);
        setloadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data));
  }

  async function logOut() {
    await signOut(auth);
    localStorage.removeItem("@ticketsPRO");
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logOut,
        loadingAuth,
        loading,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
