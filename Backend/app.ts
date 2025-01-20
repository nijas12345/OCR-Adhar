import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import router from "./Routes/route";

const app = express();
dotenv.config();

app.use(cors({
    origin:["https://ocr-adhar.vercel.app/","http://localhost:5173"],
    credentials:true
}))
app.use('/',router)
const port = process.env.PORT || 8000;
  
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
