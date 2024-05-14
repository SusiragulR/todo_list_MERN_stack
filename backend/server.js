const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const itemRoutes = require('./routes/itemRoutes')
const cors = require('cors')

const MONGO_URL = "mongodb+srv://SusiragulR:admin@todo.0rqdozl.mongodb.net/?retryWrites=true&w=majority&appName=ToDo";

//middleware
app.use((req, res, next)=>{
    console.log('path:'+req.path+' method:'+ req.method)
    next()
})

app.use(express.json())
app.use(cors())

const mongoConnect = async() =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log('mongoose connected')
    } catch (error) {
        console.log(error.message)
    }
    
    app.listen(4000,()=>{
        console.log('on port: 4000')
    })
}

(async()=>mongoConnect())();

app.use('/api/items',itemRoutes)