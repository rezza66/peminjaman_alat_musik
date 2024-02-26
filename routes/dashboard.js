import express from "express";
import { getLoanData } from "../controllers/dashboardAdmin/dashboard.js";
import { getProduct } from "../controllers/dashboardAdmin/products.js";
import { isAuthenticated } from "../middlewares.js";
import { getAllUser } from "../controllers/users/users.js";

const router = express.Router();

router.get('/dashboard', isAuthenticated, getAllUser, async (req, res) => {
    try {
        // Menggunakan data pengguna yang ditempatkan di res.locals
        const users = res.locals.users;
    
        // Merender template dashboardAdmin dan meneruskan data pengguna ke dalamnya
        res.status(200).render("dashboardAdmin", {
          success: true,
          title: "Dashboard",
          users: users,
        });
      } catch (error) {
        // Menangani kesalahan jika terjadi
        res.status(500).send('Internal Server Error');
      } 
});
router.get('/chart-data', isAuthenticated, getLoanData);

router.get('/products', isAuthenticated, getProduct);

export default router