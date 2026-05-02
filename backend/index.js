// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dns from "dns";

// import connectDb from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js";
// import messageRouter from "./routes/message.routes.js";
// import { app, server } from "./socket/socket.js";

// // ✅ DNS fix (optional but ok)
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

// // ✅ PORT (important for Render)
// const PORT = process.env.PORT || 5000;

// // ✅ Allowed origins (clean + correct)
// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL // set this in Render
// ];

// // ✅ CORS setup (fixed)
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // ✅ Middlewares
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/message", messageRouter);

// // ✅ Start server
// server.listen(PORT, async () => {
//   await connectDb();
//   console.log(`🚀 Server running on port ${PORT}`);
// });







import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "dns";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

// ✅ DNS fix (optional but ok)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 5000;

// ✅ 🔥 FIXED CORS (simple & working)
app.use(cors({
  origin: "https://realtime-chatapp-ntlm.onrender.com",
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// ✅ Start server
server.listen(PORT, async () => {
  await connectDb();
  console.log(`🚀 Server running on port ${PORT}`);
});