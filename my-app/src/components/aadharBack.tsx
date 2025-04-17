// backend.tsx
import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface BackendProps {
  backImage: File | null;
  backImageUrl: string;
  setBackImage: React.Dispatch<React.SetStateAction<File | null>>;
  handleImageBackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Fixed the signature here
}

const Backend: React.FC<BackendProps> = ({
  backImage,
  backImageUrl,
  setBackImage,
  handleImageBackChange,
}) => {
  const backInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-700">Aadhaar Back</h2>
      <div className="relative aspect-[1.6/1] bg-gray-100 rounded-lg overflow-hidden">
        {backImage ? (
          <div className="relative w-full h-full">
            <img
              src={backImageUrl}
              alt="Aadhaar Back"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setBackImage(null)}
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
              onChange={handleImageBackChange}  // No need to pass setBackImage here
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Backend;
