import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyC5hoFeLNnROYllXyjPtPiuiHEUa-rTWXA",

  authDomain: "notepad-47801.firebaseapp.com",

  projectId: "notepad-47801",

  storageBucket: "notepad-47801.appspot.com",

  messagingSenderId: "956799002689",

  appId: "1:956799002689:web:b978951182bcb029b3fec0"

};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };