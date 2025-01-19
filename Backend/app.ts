import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import router from "./Routes/route";

dotenv.config();
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/',router)

  
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
