import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./Routes/route";

const app = express();
dotenv.config();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = process.env.CORS_ORIGINS?.split(',');

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/',router)
const PORT = 8000;
  
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
