import multer from "multer";
import jwt from "jsonwebtoken";

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

export var upload = multer({
  storage: storage,
}).single("photo");

export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};



export const isAuthenticated = (req, res, next) => {

  // Ambil token dari cookie atau header
  const token = req.cookies.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      // Jika token kadaluwarsa, coba refresh token
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({ message: 'Unauthorized: Refresh token not provided' });
        }

        // Verifikasi refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            return res.status(401).json({ message: 'Unauthorized: Invalid refresh token' });
          }

          // Jika refresh token valid, buat token baru dan kirimkan sebagai cookie
          const newToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
          res.cookie('token', newToken, { maxAge: 900000, httpOnly: true });
          next();
        });
      } else {
        // Token tidak valid
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    } else {
      // Token valid, lanjutkan
      req.userId = decoded.userId;
      next();
    }
  });
};


// Fungsi middleware untuk memeriksa otentikasi menggunakan session


// Middleware untuk memeriksa token JWT


// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//   });
// }

