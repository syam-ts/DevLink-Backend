import express from 'express'; 
import { connectDB } from './infrastructure/database/db'
import routes from './infrastructure/http/routes'
require('dotenv').config();

const app = express(); 

app.use(express.json());
app.use('/', routes)

const PORT: number = 3000; // process.env.PORT
(async () => {
    await connectDB();

   
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})();
 


 
