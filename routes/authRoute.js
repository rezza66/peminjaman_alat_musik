import express from 'express';
import {upload} from '../middlewares.js';
import { Login, Register,  } from '../controllers/auth/auth.js';

const router = express.Router()


router.get('/register', (req, res)=> {
    res.render("register", {title: "register"})
});
router.post('/sign', upload, Register);

router.get('/login', (req, res)=> {
    res.render("login", {title: "login"})
});

router.post('/login', Login);

// router.post('/refreshtoken', refreshToken);


export default router;