import mongoose = require('mongoose')

const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4,
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }

  type ActionMongoose<T> = () => Promise<T>

  const connect = async <T>(action: ActionMongoose<T>) => {
  
    try {
              
        await mongoose.connect('mongodb://localhost/chords', options)
        console.log('mongoose connect')
        const result = await action()
        return { error: null, result }

    } catch (error) {
        console.log('mongoose error ' + error)
        return { error }
    }
}

export default connect