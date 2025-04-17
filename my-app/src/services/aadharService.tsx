import axiosInstance from "../axios/axios";


export const parseAadhar = async (frontImage: File, backImage: File) => {
  
    const formData = new FormData();
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);

    const response = await axiosInstance.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data; // Return parsed data
};


