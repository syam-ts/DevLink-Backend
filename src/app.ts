import express from 'express'; 
import { connectDB } from './infrastructure/database/db'
import { SignupController } from './infrastructure/http/controllers/userCtrl'
require('dotenv').config();

const app = express(); 
app.use(express.json());
const PORT: number = 3000; // process.env.PORT

// app.post('/signup', SignupController());

(async () => {
    await connectDB();

    app.post('/signup', SignupController());
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})();


app.get('/about', (req, res) => {
    res.send('About Page')
})


 
