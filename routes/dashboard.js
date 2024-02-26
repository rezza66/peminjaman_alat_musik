import express from "express";
import { getLoanData } from "../controllers/dashboardAdmin/dashboard.js";
import { getProduct } from "../controllers/dashboardAdmin/products.js";
import { isAuthenticated } from "../middlewares.js";
import { getAllUser } from "../controllers/users/users.js";

const router = express.Router();

router.get('/dashboard', isAuthenticated, getAllUser, async (req, res) => {
    // console.log(req.session);
    res.render('dashboardAdmin', { accessToken: req.session.accessToken }); 
});
router.get('/chart-data', isAuthenticated, getLoanData);

router.get('/products', isAuthenticated, getProduct);

export default router