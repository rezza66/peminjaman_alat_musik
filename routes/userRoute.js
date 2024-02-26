import express from 'express';
import { getUser, deleteUser } from '../controllers/users/users.js';

const router = express.Router();

router.get('/getUser', getUser);
// router.get('/users', getAllUser);

// router.get("/createuser", (req, res) => {
//     res.render("createCostumerAdmin", { title: "Add User" });
//   });
// router.post('/user', createUser);

router.get('/deleteuser/:id', deleteUser);

export default router;