import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Frontend from "./components/aadharFront";
import Backend from "./components/aadharBack";
import { ParsedData } from "./types/parsedData";
import ParsedAadhaarData from "./components/parsedAadharData";
import { parseAadhar } from "./services/aadharService"; 
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setFrontImage(file);
      setFrontImageUrl(imageUrl);
    }
  };

  const handleImageBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setBackImage(file);
      setBackImageUrl(imageUrl);
    }
  };

  const handleParseAadhar = async () => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both Frontend and Backend Aadhaar images.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await parseAadhar(frontImage, backImage);
      setParsedData(data);
      toast.success("Aadhaar parsed successfully!");
    } catch (error:unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Frontend
            frontImage={frontImage}
            frontImageUrl={frontImageUrl}
            setFrontImage={setFrontImage}
            handleImageChange={handleImageChange}
          />
          <Backend
            backImage={backImage}
            backImageUrl={backImageUrl}
            setBackImage={setBackImage}
            handleImageBackChange={handleImageBackChange}
          />
        </div>

        <div>
          <ParsedAadhaarData parsedData={parsedData} />
        </div>
      </div>

      <button
        onClick={handleParseAadhar}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full"
      >
        {isLoading ? "Parsing..." : "Parse Aadhaar"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default App;
