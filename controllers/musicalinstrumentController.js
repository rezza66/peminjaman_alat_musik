import db from "../utils/db.js";
import fs from "fs";

export const getMusicalInstrument = async (req, res, next) => {
  try {
    const response = await db.musicalInstrument.findMany({});

    res.status(200).render("index", {
      success: true,
      title: "Home Page",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createMusicalInstrument = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    await db.musicalInstrument.create({
      data: {
        name,
        description,
        photo: req.file.filename,
      },
    });
    res.status(201).redirect("/products");
  } catch (error) {
    next(error);
  }
};

// edit an musical
export const editMusicalInstrument = async (req, res, next) => {
  try {
    let id = req.params.id;
    const musical = await db.musicalInstrument.findUnique({
      where: { id },
    });

    if (!musical) {
      return res.status(404).send("musical not found");
    }
    res.status(200).render("updateMusical", {
      success: true,
      title: "Update Musical",
      data: musical,
    });
  } catch (error) {
    next(error);
  }
};

// update musical
export const updateMusicalInstrument = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    let newImage = "";

    if (req.file) {
      newImage = req.file.filename;
      if (req.body.old_image) {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      }
    } else {
      newImage = req.body.old_image;
    }

    await db.musicalInstrument.update({
      where: { id },
      data: {
        name,
        description,
        photo: newImage,
      },
    });
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
};

export const deleteMusicalInstrument = async (req, res, next) => {
  try {
    const id = req.params.id;
    const musical = await db.musicalInstrument.findUnique({
      where: {
        id,
      },
    });

    if (musical.photo != "") {
      fs.unlinkSync("./uploads/" + musical.photo);
    }

    await db.musicalInstrument.delete({
      where: { id },
    });
    res.redirect("/products");
  } catch (error) {
    console.error(error)
    next(error);
  }
};

// order musical
export const orderMusicalById = async (req, res, next) => {
  try {
    let id = req.params.id;
    const musical = await db.musicalInstrument.findUnique({
      where: {
        id,
      },
    });

    res.status(200).render("pesananMusical", {
      success: true,
      title: "Pesanan Musical",
      data: musical,
    });
  } catch (error) {
    next(error);
  }
};
