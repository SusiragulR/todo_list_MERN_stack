const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const itemRoutes = require('./routes/itemRoutes')
const cors = require('cors')
const MONGO_URI = "mongodb+srv://SusiragulR:admin@todo.0rqdozl.mongodb.net/?retryWrites=true&w=majority&appName=ToDo";
const PORT = 4000;

//middleware
app.use(express.json())
app.use(cors())

const mongoConnect = async() =>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log('mongoose connected')
    } catch (error) {
        console.log(error.message)
    }
    
    app.listen(PORT,()=>{
        console.log('on port: '+ PORT)
    })
}

(async()=>mongoConnect())();

app.use('/api/items',itemRoutes)