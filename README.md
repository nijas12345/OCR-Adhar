# OCR-Adhar
# Aadhar OCR

## 📌 Project Overview
This project is an **Aadhar OCR (Optical Character Recognition)** system that extracts text information from an **Aadhar card image**. The system processes the uploaded image, detects the relevant text fields, and converts them into structured data using **Google Vision API**.

## 🚀 Features
- Extracts **Name, DOB, Gender, Aadhar Number** from the image.
- Uses **Google Vision API** for text recognition.
- Preprocesses images to improve text extraction accuracy.
- Supports multiple input formats like **JPEG, PNG, and PDF**.
- Outputs data in **JSON or structured text format**.

## 🛠️ Tech Stack
- **Frontend**: TypeScript, React.js
- **Backend**: Node.js, Express.js, TypeScript
- **OCR Engine**: Google Vision API

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/aadhar-ocr.git
cd aadhar-ocr
```

### 2️⃣ Backend Setup (Node.js + Express + Google Vision API)
```bash
cd backend
npm install
```
Set up your **Google Cloud Vision API Key** and store it securely.
Run the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup (TypeScript + React.js)
```bash
cd frontend
npm install
npm start
```

## 🏗️ How It Works
1. User uploads an **Aadhar card image**.
2. The backend processes the image using **Google Vision API** and extracts text.
3. The extracted data is cleaned and formatted into JSON.
4. The frontend displays the **Name, DOB, Gender, and Aadhar Number**.

## 🔍 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `http://localhost:5173` | Frontend application running |
| POST | `/` | Uploads an image for OCR processing |

## 📌 Future Enhancements
- Improve accuracy using **AI-based post-processing techniques**.
- Add **Aadhar card validation & masking** (hide part of the number for security).
- Build a **Mobile App** using React Native for scanning.

## 🤝 Contribution
Feel free to **fork** this repository, create new features, or improve accuracy! Create a pull request with a detailed explanation.

## 📜 License
This project is licensed under the MIT License.

---
**🚀 Ready to extract Aadhar details with OCR? Start now!**


