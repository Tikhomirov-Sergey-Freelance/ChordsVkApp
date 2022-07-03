import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, Database } from 'firebase/database'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { Firestore } from '@firebase/firestore'
import { Analytics } from 'firebase/analytics'

import { firebaseConfig } from '../../code/database/config'

export class FirebaseStore {

    firebaseToken: string

    private firebase: FirebaseApp
    private database: Database
    private firestore: Firestore
    private firebaseAnalitics: Analytics

    constructor() {

        if(!global['window']) return
        this.firebaseToken = window.firebaseToken
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
    
        if (this.firebaseToken) {
    
          const auth = getAuth()
          await signInWithCustomToken(auth, this.firebaseToken)
        }
      }
}

export default FirebaseStore