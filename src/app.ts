import express from 'express'; 
import { connectDB } from './infrastructure/database/db'
import routes from './infrastructure/http/routes'
import cookieparser from 'cookie-parser';
require('dotenv').config();
import cors from 'cors';

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(cookieparser())
app.use('/', routes);

const PORT: number = 3000; // process.env.PORT
(async () => {
    await connectDB();

   
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})();
 


 
