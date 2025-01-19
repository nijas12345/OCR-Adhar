import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import router from "./Routes/route";

dotenv.config();
const app = express();

app.use(cors({
    origin:["http://localhost:5173","https://ocr-adhar-e0ua4gdoh-nijas-mas-projects.vercel.app/"]
}))
app.use('/',router)
const port = process.env.PORT || 8000;
  
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
