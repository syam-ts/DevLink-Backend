import express from 'express'; 
import { connectDB } from './infrastructure/database/db'
import routes from './infrastructure/http/routes'
import cookieparser from 'cookie-parser';
require('dotenv').config();
import cors from 'cors';

const app = express(); 

app.use(express.json());
app.use(cookieparser())
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use('/', routes);

const PORT: number = 3000; // process.env.PORT
(async () => {
    await connectDB();

   
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})();
 


 
