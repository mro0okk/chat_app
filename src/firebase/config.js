import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZF_zRO2rXesN-mG2PQsDl5wq3YWnGW1I",
  authDomain: "chat-app-c84d4.firebaseapp.com",
  projectId: "chat-app-c84d4",
  storageBucket: "chat-app-c84d4.appspot.com",
  messagingSenderId: "815578964302",
  appId: "1:815578964302:web:469cc38e0ff42b34187e1f",
  measurementId: "G-XQE9SHL3RF",
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const analytics = firebase.analytics(app)

const auth = firebase.auth()
const db = firebase.firestore()
auth.useEmulator("http://localhost:9099")
if (window.location.hostname === "localhost")
  db.useEmulator("localhost", "8080")
export { auth, db, analytics }
export default firebase
