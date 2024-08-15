
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDbN3B4G62nPwt3CvnnmEcZ_aEz69ClXyU",
  authDomain: "miniblog-4b21d.firebaseapp.com",
  projectId: "miniblog-4b21d",
  storageBucket: "miniblog-4b21d.appspot.com",
  messagingSenderId: "978814959057",
  appId: "1:978814959057:web:1977aa1fc22cbb439b74f0",
  measurementId: "G-FV52CV75XJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export {db};