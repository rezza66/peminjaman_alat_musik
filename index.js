import express from "express";
import dotenv from 'dotenv';
import musicalinstrumentRoute from './routes/musicalinstrumentRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import dashboard from './routes/dashboard.js';
import * as middlewares from './middlewares.js';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import session from "express-session";
// import bodyParser from "body-parser";
// import helmet from 'helmet';
// import crypto from 'crypto';


dotenv.config()

var app = express();
const port = process.env.PORT || 8000
app.use(session({
  secret: process.env.JWT_ACCESS_SECRET, // Ganti 'secret-key' dengan kunci rahasia yang kuat
  resave: false,
  saveUninitialized: false,
}));
app.use(morgan('dev'));
// app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(middlewares.isAuthenticated);


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'D:\\project\\peminjaman_alat_musik\\views\\pages')

app.use(express.static("public"));
app.use(express.static("uploads"));


app.use(musicalinstrumentRoute)
app.use(authRoute)
app.use(userRoute)
app.use(dashboard)

app.use(middlewares.errorHandler);
// app.use(middlewares.notFound);

app.listen(port, ()=> {
  console.log('server up and running on port', port);
});