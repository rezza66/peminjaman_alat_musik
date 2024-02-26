import express from "express";
import { upload } from "../middlewares.js";
import {
  createMusicalInstrument,
  editMusicalInstrument,
  getMusicalInstrument,
  orderMusicalById,
  deleteMusicalInstrument,
  updateMusicalInstrument,
} from "../controllers/musicalinstrumentController.js";

const router = express.Router();

router.get("/home", getMusicalInstrument);
router.get("/about");

router.get("/createmusicalinstrument", (req, res) => {
  res.render("createMusicalAdmin", { title: "Add Musical" });
});
router.post("/createmusicalinstrument", upload, createMusicalInstrument);

router.get("/editmusicalinstrument/:id", editMusicalInstrument);
router.post("/updatemusicalinstrument/:id", upload, updateMusicalInstrument);

router.get("/pesanan/:id", orderMusicalById);
router.get("/deletemusicalinstrument/:id", deleteMusicalInstrument);

export default router;
