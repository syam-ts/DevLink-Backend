import express from 'express';


const router = express.Router();


router.post('/signup', (req, res) => {
    try{

     const {username, password, mobile, email} = req.body;

    } catch(err: any) {
        console.error('ERROR: ',err.message);
    }
})


