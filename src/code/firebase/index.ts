// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, Database } from 'firebase/database'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { Firestore } from '@firebase/firestore'
import { Analytics } from 'firebase/analytics'

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
};

class FirebaseProvider {

  private firebase: FirebaseApp
  private database: Database
  private firestore: Firestore
  private firebaseAnalitics: Analytics

  private token: string

  constructor(token: string) {
    this.token = token
  }

  async getFirestore() {

    if (!this.firestore) {
      await this.initDatabase()
    }

    return this.firestore
  }

  private async initDatabase() {

    this.firebase = initializeApp(firebaseConfig)
    this.firebaseAnalitics = global['window'] && getAnalytics(this.firebase)
    this.database = getDatabase(this.firebase)

    this.firestore = getFirestore(this.firebase)

    if (this.token) {

      const auth = getAuth()
      await signInWithCustomToken(auth, this.token)
    }
  }
}

export default FirebaseProvider