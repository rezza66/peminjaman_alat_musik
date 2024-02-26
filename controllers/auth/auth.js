// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../utils/db.js";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt.js";
import { hashToken } from "../../utils/hashToken.js";
import {
    findRefreshTokenById,
  addRefreshTokenToWhitelist,
    deleteRefreshToken,
  //   revokedTokens,
} from "../../controllers/auth/auth.service.js";

// export const Register = async (req, res, next) => {
  
//   const { username, email, password, role, photo } = req.body;
  
//   try {
//     if (!email || !password) {
//       res.status(400);
//       throw new Error("You must provide an email and a password");
//     }

//     const existingUser = await db.user.findUnique({ where: { email } });
//     if (existingUser) {
//       res.status(400);
//       throw new Error("Email already in use.");
//     }

//     const hashedPassword = bcrypt.hashSync(password, 12);

//     const user = await db.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//         role,
//         photo: req.file.filename,
//       },
//     });

//     const jti = uuidv4();
//     const { accessToken, refreshToken } = generateTokens(user, jti);
//     await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
//     // res.header('authorization', `Bearer ${accessToken}`);
//     // console.log({accessToken, refreshToken});
//     // res.render('register', { accessToken, refreshToken });
//     // res.redirect("/login");
//     res.render('dashboardAdmin', { accessToken });
//   } catch (error) {
//     next(error);
//   }
// };

// export const Login = async (req, res, next) => {
//   const { email, password, role } = req.body;
//   try {
//     if (!email || !password) {
//       res.status(400);
//       throw new Error("You must provide an email and a password");
//     }

//     const existingUser = await db.user.findUnique({ where: { email } });
//     if (!existingUser) {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }

//     const validPassword = await bcrypt.compare(password, existingUser.password);
//     if (!validPassword) {
//       res.status(401);
//       throw new Error("Invalid login credentials.");
//     }

//     const jti = uuidv4();
//     const { accessToken, refreshToken } = generateTokens(existingUser, jti);
//     await addRefreshTokenToWhitelist({
//       jti,
//       refreshToken,
//       userId: existingUser.id,
//     });
    
//     res.render('dashboardAdmin', { accessToken, refreshToken });
//   } catch (error) {
//     next(error);
//   }
// };

export const Register = async (req, res, next) => {
  const { username, email, password, role, photo } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send("You must provide an email and a password");
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send("Email already in use.");
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        photo: req.file.filename,
      },
    });

    // Redirect to login page
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};


export const Login = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
      if (!email || !password) {
          return res.status(400).send("You must provide an email and a password");
      }

      const existingUser = await db.user.findUnique({ where: { email } });
      if (!existingUser) {
          return res.status(401).send("Invalid email or password");
      }

      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) {
          return res.status(401).send("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      // await addRefreshTokenToWhitelist({
      //     jti,
      //     refreshToken,
      //     userId: existingUser.id,
      // });
      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
      // res.cookie('token', accessToken, { httpOnly: true });
      // res.cookie('refreshToken', refreshToken, { httpOnly: true });
      // res.json({accessToken, refreshToken})
      // console.log(req.session)
      return res.redirect('/dashboard');

  } catch (error) {
      next(error);
  }
};

// export const refreshToken = async (req, res, next) => {
//   try {
//       const refreshToken = req.cookies.refreshToken;
//       if (!refreshToken) {
//           res.status(400);
//           throw new Error('Missing refresh token.');
//       }
//       const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//       const savedRefreshToken = await findRefreshTokenById(payload.jti);

//       if (!savedRefreshToken || savedRefreshToken.revoked === true) {
//           res.status(401);
//           throw new Error('Unauthorized');
//       }

//       const hashedToken = hashToken(refreshToken);
//       if (hashedToken !== savedRefreshToken.hashedToken) {
//           res.status(401);
//           throw new Error('Unauthorized');
//       }

//       const user = await findUserById(payload.userId);
//       if (!user) {
//           res.status(401);
//           throw new Error('Unauthorized');
//       }

//       await deleteRefreshToken(savedRefreshToken.id);
//       const jti = uuidv4();
//       const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
//       await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

//       res.json({
//           accessToken,
//           refreshToken: newRefreshToken
//       });
//   } catch (error) {
//       next(error)
//   }
// }
