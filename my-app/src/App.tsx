import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';

import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ParsedData = {
  aadhaarNumber: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  pincode: string;
};

export default function App(): JSX.Element {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [parsedData,setParsedData] = useState<ParsedData|null>(null)
  const [frontImageUrl,setFrontImageUrl] = useState<string>("")
  const [backImageUrl,setBackImageUrl] = useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFrontImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type (only images allowed)
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }

      // Validate file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size should not exceed 5MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFrontImage(file);
      setFrontImageUrl(imageUrl)

    }
  };
  const handleImageBackChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setBackImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
    
      // Validate file type (only images allowed)
      if (!file.type.startsWith("image/")) {
        toast.error("PLease upload a valid image file")
        return;
      }
    
      // Validate file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size should not exceed 5MB.");
        return;
      }
      

      setBackImage(file)
      const imageUrl = URL.createObjectURL(file)
      setBackImageUrl(imageUrl) 
    }    
  };

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParsedData(null)
    handleImageChange(e, setFrontImage);
  };

  const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParsedData(null)
    handleImageBackChange(e, setBackImage);
  };

  const handleParseAadhar:()=>void = async() =>{
     if(!frontImage || !backImage){
      toast.error("Please upload both Frontend and Backend Aadhar images")
      return 
     }
     try {
      if (frontImage !== null && backImage!==null) {
        const formData = new FormData();
        formData.append("frontImage", frontImage); 
        formData.append("backImage", backImage);
        setIsLoading(true)
        
        const response = await axiosInstance.post("/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if(response.status == 200){
          setParsedData(response.data.data)
          setIsLoading(false)
        }

        toast.success("Aadhaar parsed successfully!");  
      }

    
    } catch (error:any) {
      if (error.response) {
        setIsLoading(false)
        toast.error(`Error: ${error.response.data.error}`);
      }
    }
  }
  const axiosInstance = axios.create({
    baseURL: "https://ocr-adhar-1.onrender.com",
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
    {/* Aadhaar Photo and Parsed Data */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Aadhaar Photos */}
      <div className="space-y-6">
        {/* Aadhaar Front */}
        <div className="p-4 space-y-4 border rounded-lg shadow-sm">
  <h2 className="text-lg font-medium text-gray-700">Aadhaar Front</h2>
  <div className="relative aspect-[1.6/1] bg-gray-100 rounded-lg overflow-hidden">
    {frontImage ? (
      <div className="relative w-full h-full">
        {/* Display the uploaded image */}
        <img
          src={frontImageUrl}
          alt="Aadhaar Front"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* "X" Button to remove the image */}
        <button
          type="button"
          onClick={() => setFrontImage(null)} // Reset the image
          className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600"
        >
          X
        </button>
      </div>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => frontInputRef.current?.click()}
          className="gap-2 flex items-center text-gray-600 hover:text-gray-800"
        >
          <Camera className="w-5 h-5" />
          Press to capture/upload
        </button>
        <input
          ref={frontInputRef}
          type="file"
          accept="image/*"
          onChange={handleFrontImageChange}
          className="hidden"
        />
      </div>
    )}
  </div>
</div>

  
        {/* Aadhaar Back */}
        <div className="p-4 space-y-4 border rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-700">Aadhaar Back</h2>
          <div className="relative aspect-[1.6/1] bg-gray-100 rounded-lg overflow-hidden">
  {backImage ? (
    <div className="relative w-full h-full">
      {/* Display the uploaded image */}
      <img
        src={backImageUrl}
        alt="Aadhaar Back"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* "X" Button to remove the image */}
      <button
        type="button"
        onClick={() => setBackImage(null)} // Reset the image
        className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600"
      >
        X
      </button>
    </div>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        type="button"
        onClick={() => backInputRef.current?.click()}
        className="gap-2 flex items-center text-gray-600 hover:text-gray-800"
      >
        <Camera className="w-5 h-5" />
        Press to capture/upload
      </button>
      <input
        ref={backInputRef}
        type="file"
        accept="image/*"
        onChange={handleBackImageChange}
        className="hidden"
      />
    </div>
  )}
</div>

        </div>
      </div>
  
      {/* Parsed Data */}
      <div className="p-6 border rounded-lg shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Parsed Data</h2>
  {parsedData ? (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500">Aadhaar Number</label>
          <div className="font-medium">{parsedData?.aadhaarNumber || "N/A"}</div>
        </div>
        <div>
          <label className="text-sm text-gray-500">Name on Aadhaar</label>
          <div className="font-medium">{parsedData?.name || "N/A"}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500">Date of Birth</label>
          <div className="font-medium">{parsedData?.dob || "N/A"}</div>
        </div>
        <div>
          <label className="text-sm text-gray-500">Gender</label>
          <div className="font-medium">{parsedData?.gender || "N/A"}</div>
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500">Address</label>
        <div className="font-medium">{parsedData?.address || "N/A"}</div>
      </div>
      <div>
        <label className="text-sm text-gray-500">Pincode</label>
        <div className="font-medium">{parsedData?.pincode || "N/A"}</div>
      </div>
    </div>
  ) : (
    <div className="text-gray-500">No data available. Please upload and parse Aadhaar.</div>
  )}
</div>

    </div>
  
    {/* Parse Aadhaar Button */}
    {isLoading?(<>
      <button onClick={handleParseAadhar} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg text-lg">
      PARSING...
    </button>
    </>):(
       <button onClick={handleParseAadhar} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg text-lg">
       PARSE AADHAAR
     </button>
    )}
   
    <ToastContainer />
  </div>
  
  );
}
