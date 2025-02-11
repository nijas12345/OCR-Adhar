import express from "express";
import { upload } from '../config/multer';
import {parseAadhaarData} from '../Controllers/controller'

const router = express.Router();

router.post('/', upload.fields([
  { name: 'frontImage', maxCount: 1 },
  { name: 'backImage', maxCount: 1 }
]), parseAadhaarData);

export default router;
