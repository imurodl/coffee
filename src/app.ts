import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

// Allowed browser origins for credentialed requests.
const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ??
  "https://amaya.uz,https://www.amaya.uz,http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  credentials: true,
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow non-browser clients (no Origin header) and whitelisted origins.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
};

// 1-ENTRANCE
const app = express();
const isProd = process.env.NODE_ENV === "production";
app.set("trust proxy", 1); // behind nginx: needed for secure cookies

app.use(
  helmet({
    // The EJS admin panel uses inline scripts; allow cross-origin so the
    // storefront on amaya.uz can load images served from /uploads.
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Throttle authentication endpoints against brute-force.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { code: 429, message: "Too many attempts, try again later." },
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// 2-SESSIONS
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6h, matches the JWT AUTH_TIMER
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

// 3-VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-ROUTERS
app.use("/member/login", authLimiter);
app.use("/member/signup", authLimiter);
app.use("/admin/login", authLimiter);
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router); // SPA: REACT

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
  },
});

let summaryClient = 0;
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connection & total: [${summaryClient}]`);

  socket.on("disconnect", () => {
    summaryClient--;
    console.log(`Disconnection & total: [${summaryClient}]`);
  });
});

export default server;
