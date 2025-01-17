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
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    })
  );
app.use('/', routes);


const PORT: number = process.env.PORT as any || 3000;
(async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})();
 


 
