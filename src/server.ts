import express from "express";
import cors from "cors";
import router from "./router";
import db from "./config/db";

//Conectar base de datos y crear funcion asyncrona

async function conectDb() {
    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log("Conexion a base de daatos exitosa");

    } catch (error) {
        console.log(error);
        console.log("Se registro un error en la conexion")
    }
}
conectDb()

const server = express();

// CORS: solo se permite el origen del frontend (Vite usa 5173 por defecto)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((o) => o.trim());

server.use(
    cors({
        origin: (origin, callback) => {
            // sin origin = herramientas como Postman/curl
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Origen no permitido por CORS"));
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    })
);

server.use(express.json());
server.use("/api", router);
export default server;
