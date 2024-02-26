import db from "../../utils/db.js";
import fs from "fs";

// export const getUser = async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const user = await db.user.findUnique({
//       where: {
//         username,
//       },
//     });

//     if (!user) {
//       return res.status(404).render('error', { error: 'User not found' });
//     }

//     return res.status(200).render('user', { user });
//   } catch (error) {
//     next(error);
//   }
// };


export const getUser = async (req, res, next) => {
  try {
    const { username } = req.query; // Menggunakan req.query untuk mendapatkan nilai dari parameter query

    if (!username) {
      // Jika parameter username tidak ada, render tampilan error.ejs
      return res.status(400).render('error', { error: 'Username is required' });
    }

    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      // Jika pengguna tidak ditemukan, render tampilan error.ejs
      return res.status(404).render('error', { error: 'User not found' });
    }

    // Render tampilan user.ejs dengan data pengguna
    return res.status(200).render('costumersAdmin', { data: user });
  } catch (error) {
    // Tangani kesalahan dengan menampilkan tampilan error.ejs atau respons kesalahan JSON
    console.error('Error in getUser:', error);

    // Render tampilan error.ejs
    return res.status(500).render('error', { error: 'Internal Server Error' });

    // Atau kirim respons kesalahan JSON
    // return next(error);
  }
};


export const getAllUser = async (req, res, next) => {
  try {
    const user = await db.user.findMany({
      include: {
        loans : true
      }
    });

    res.status(200).render("dashboardAdmin", {
      success: true,
      title: "Dashboard",
      users: user,
    })
    // res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// export const createUser = async (req, res, next) => {
//   const { username, email, password, role, photo } = req.body;
//   try {
//     const createUser = await db.user.create({
//       data: {
//         username,
//         email,
//         password,
//         role,
//         photo,
//       },
//     });
//     res.status(200).json(createUser);
//   } catch (error) {
//     next(error);
//   }
// };

// export const editUser = async(req, res, next) => {
//   try {
//     let id = req.params.id;
//     const user = await db.user.findUnique({
//       where: {id}
//     });

//     if(!user) {
//       return res.status(404).send("musical not found");
//     }
//     res.status(200).render("updateUser", {
//       success: true,
//       data: user
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const updateUser = async (req, res, next) => {
//   const id = req.params.id;
//   const { username, email, password, role, photo } = req.body;
//   let newImage = "";
//   try {
//     if (req.file) {
//       newImage = req.file.filename;
//       if (req.body.old_image) {
//         fs.unlinkSync("./uploads/" + req.body.old_image);
//       }
//     } else {
//       newImage = req.body.old_image;
//     }

//     const updateUser = await db.user.update({
//       where: { id },
//       data: {
//         username,
//         email,
//         password,
//         role,
//         photo: newImage
//       },
//     });
//     res.redirect("/users")
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.user.findUnique({
      where: {id}
    });

    if (user.photo != "") {
      fs.unlinkSync("./uploads/" + user.photo);
    }

    await db.user.delete({
      where: { id },
    });

    
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};
