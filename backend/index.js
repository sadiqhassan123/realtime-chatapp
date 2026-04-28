import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket/socket.js"

const port=process.env.PORT || 5000
import dns from "dns"
dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])

const allowedOrigins = [
  'http://localhost:5173',
  'https://real-time-chat-ngph4g48y-sadiqhassan123s-projects.vercel.app',
  process.env.FRONTEND_URL
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log("server started")
})