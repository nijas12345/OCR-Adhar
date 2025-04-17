import { Request, Response } from "express";
import { v1 as vision } from '@google-cloud/vision';
import path from 'path';
import { extractAadhaarDetails } from "../config/ocrDetails";

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, "..", 'google-cloud-credentials.json'),
});

export const parseAadhaarData = async (req: Request, res: Response) => {
  try {
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files.frontImage && files.backImage) {

      const frontImageBuffer = files.frontImage[0].buffer;
      const backImageBuffer = files.backImage[0].buffer;

      const [frontResult] = await client.textDetection(frontImageBuffer);
      const [backResult] = await client.textDetection(backImageBuffer);
      console.log(frontResult);
      
      const frontText = frontResult.textAnnotations?.[0]?.description || 'No text detected';
      const backText = backResult.textAnnotations?.[0]?.description || 'No text detected';

      const aadhaarNumberRegex = /\b\d{4} \d{4} \d{4}\b/;
      
      if (!frontText.toLowerCase().includes('government of india')) {
          res.status(400).json({
            error: 'Please Upload correct Aadhar front Image.',
          });
          return;
        }

      const frontAadhaarMatch = frontText.match(aadhaarNumberRegex);
      if (!frontAadhaarMatch) {
         res.status(400).json({
          error: 'No valid Aadhaar number found in the front image.',
        });
        return
      }
      const frontAadhaarNumber = frontAadhaarMatch[0];

      // Validate Back Image Text
      if (!backText.toLowerCase().includes('unique identification authority of india')) {
         res.status(400).json({
          error: 'Please upload the exact backside of aadhar".',
        });
        return
      }
      const extractedDetails = extractAadhaarDetails(frontText, backText);
                  res.json({
                      success: true,
                      data: extractedDetails
                  });
    } else {
       res.status(400).json({ error: 'Both front and back images are required.' });
    } 
  } catch (err) {
    console.error('Error handling Aadhaar upload:', err);
     res.status(500).json({ error: 'Internal server error.' });
     return 
  }
}