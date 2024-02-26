import db from "../../utils/db.js";

export const getProduct = async (req, res, next) => {
    try {
      const response = await db.musicalInstrument.findMany({});
  
      res.status(200).render("productAdmin", {
        success: true,
        title: "products",
        data: response,
      });
      
    } catch (error) {
      next(error);
    }
  };