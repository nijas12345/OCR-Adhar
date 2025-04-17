import React from "react";
import { ParsedData } from "../types/parsedData"; // Make sure this path is correct

interface ParsedAadhaarDataProps {
  parsedData: ParsedData | null;
}

const ParsedAadhaarData: React.FC<ParsedAadhaarDataProps> = ({ parsedData }) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm" style={{ height: "653px" }}>
      <h2 className="text-xl font-semibold mb-4">Parsed Aadhaar Data</h2>
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
        <p>No parsed data yet.</p>
      )}
    </div>
  );
};

export default ParsedAadhaarData;
