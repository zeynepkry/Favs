import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,setPersistence, browserSessionPersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDjQluZHyKDKCHPgh4vpGVMyvHhgRaro-8",
  authDomain: "favs-669fd.firebaseapp.com",
  projectId: "favs-669fd",
  storageBucket: "favs-669fd.appspot.com",
  messagingSenderId: "449419071456",
  appId: "1:449419071456:web:7501af936288439d466585",
  measurementId: "G-E1W25M9WGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app);
const auth = getAuth(app)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Session persistence set successfully
  })
  .catch((error) => {
    // Error setting session persistence
    console.error("Error setting session persistence:", error);
  });

export { auth };