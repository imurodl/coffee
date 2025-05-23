import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

// 1-ENTRANCE
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["https://imurodl.github.io"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// 2-SESSIONS
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), // sessionlarni hosil qilishda ishlatiladigan kod
    cookie: {
      maxAge: 1000 * 3600 * 1, // 1h // session qancha vaqt amal qilishi
    },
    store: store, // mongodb which collection
    resave: true, // true => session time from last entered, false => session time from authentification process
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// 3-VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-ROUTERS
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router); // SPA: REACT

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
