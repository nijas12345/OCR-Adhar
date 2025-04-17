// frontend.tsx
import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface FrontendProps {
  frontImage: File | null;
  frontImageUrl: string;
  setFrontImage: React.Dispatch<React.SetStateAction<File | null>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Fixed signature here
}

const Frontend: React.FC<FrontendProps> = ({
  frontImage,
  frontImageUrl,
  setFrontImage,
  handleImageChange,
}) => {
  const frontInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-700">Aadhaar Front</h2>
      <div className="relative aspect-[1.6/1] bg-gray-100 rounded-lg overflow-hidden">
        {frontImage ? (
          <div className="relative w-full h-full">
            <img
              src={frontImageUrl}
              alt="Aadhaar Front"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setFrontImage(null)}
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
              onChange={handleImageChange} 
              
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Frontend;
