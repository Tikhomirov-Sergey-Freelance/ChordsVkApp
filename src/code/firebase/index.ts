// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3e15pWN9vA-cNbzZp15S8oa8E2nyB45c",
  authDomain: "chords-7f150.firebaseapp.com",
  projectId: "chords-7f150",
  storageBucket: "chords-7f150.appspot.com",
  messagingSenderId: "876182563897",
  appId: "1:876182563897:web:8161ba973a700f579571e8",
  measurementId: "G-C0H2MJXMS5"
}

const init = () => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)

    return { app, analytics }
}

export default init