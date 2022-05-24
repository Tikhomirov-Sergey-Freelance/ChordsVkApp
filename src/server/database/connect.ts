import mongoose = require('mongoose')
import { iResult } from 'types/common';

const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4,
    useNewUrlParser: true, 
    useUnifiedTopology: true
  };

  type ActionMongoose<T> = () => Promise<T>

const connect = <T>(action: ActionMongoose<T>) => {

    return new Promise<iResult<T>>(async (resolve, reject) => {

        try {
            
            await mongoose.connect('mongodb://localhost/chords', options)
            console.log('mongoose connect')
            const result = await action()
            resolve({ error: null, result })

        } catch (error) {
            console.log('mongoose error ' + error)
            resolve({ error })
        }
        finally {
            //db.disconnect()
        }
    })
}

export default connect