import express from 'express';
import mongoose from 'mongoose'

const connectDB = async () => {
       await mongoose.connect('mongodb+srv://syamnandhu3:AUZcKAsIJHM5phLC@cluster0.ukj87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')  
}


connectDB()
.then(() => {
    console.log('db connected');

    app.listen(3000, () => {
        console.log('server running on port 3000')
    })
})
.catch((err) => console.log(err))
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

