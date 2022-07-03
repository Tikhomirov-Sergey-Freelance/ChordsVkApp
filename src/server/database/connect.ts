import mongoose = require('mongoose')

const options = {
    autoIndex: true,
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4,
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
  }

const connect = async () => {

    try {

        await mongoose.connect('mongodb://localhost/chords', options)

        console.log('Подключение к базе данных прошло успешно')
        return true

    } catch (error) {
        console.error(`Ошибка при подключении к базеданных. ${error}`)
        throw error
    }
}

export default connect