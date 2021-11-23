// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getFirestore, collection } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG70Q8XMvKfSU48NLjICNcHxm4w1LGGiU",
  authDomain: "chords-test-c25b3.firebaseapp.com",
  projectId: "chords-test-c25b3",
  storageBucket: "chords-test-c25b3.appspot.com",
  messagingSenderId: "961783308721",
  appId: "1:961783308721:web:265426d5c87511d98add90"
};

const init = () => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)
    const database = getDatabase(app)
    const firestore = getFirestore(app)

    return { app, database, firestore, analytics }
}

export default init