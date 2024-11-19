// import React, { useState, useEffect, useRef } from "react";
// import particlesConfig from "./particlesConfig";

// const App = () => {
//   const [selectedOption, setSelectedOption] = useState(""); // Webcam or Drag and Drop
//   const [selectedImage, setSelectedImage] = useState(null); // Selected image
//   const [result, setResult] = useState(null); // Classification result
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const particlesJS = window.particlesJS;
//     particlesJS("particles-js", particlesConfig);
//   }, []);

//   // Webcam Stream
//   useEffect(() => {
//     if (selectedOption === "webcam" && videoRef.current) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => {
//           console.error("Error accessing webcam:", err);
//         });
//     }
//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [selectedOption]);

//   // Convert DataURI to File
//   function dataURItoFile(dataURI, tempFileName) {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new File([ab], tempFileName, { type: mimeString });
//   }

//   // Handle Drag-and-Drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handle File Upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   // Capture Image from Webcam
//   const captureImage = () => {
//     if (canvasRef.current && videoRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       canvasRef.current.width = videoRef.current.videoWidth;
//       canvasRef.current.height = videoRef.current.videoHeight;
//       context.drawImage(videoRef.current, 0, 0);
//       const dataUrl = canvasRef.current.toDataURL("image/png");
//       const file = dataURItoFile(dataUrl, "captured_image.png");
//       setSelectedImage(file);
//     }
//   };

//   // Classify Image
//   const handleClassify = async () => {
//     if (!selectedImage) {
//       alert("Please upload or capture an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedImage);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setResult(result);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (err) {
//       console.error("Error during classification:", err);
//       alert("An error occurred while connecting to the server.");
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50 flex items-center justify-center">
//       {/* Particle Background */}
//       <div id="particles-js" className="absolute inset-0"></div>

//       {/* Card Container */}
//       <div className="relative bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-md text-center border border-gray-300 z-10">
//         {/* Title */}
//         <h1 className="text-2xl font-bold uppercase tracking-wide mb-6">
//           Introducing <span className="text-black">FruitNet</span>
//         </h1>

//         {/* Option Selector */}
//         <select
//           className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
//           onChange={(e) => {
//             setSelectedOption(e.target.value);
//             setSelectedImage(null);
//             setResult(null);
//           }}
//           value={selectedOption}
//         >
//           <option value="">Select an option to classify fruits</option>
//           <option value="dragdrop">Drag and Drop</option>
//           <option value="webcam">Use Webcam</option>
//         </select>

//         {/* Drag-and-Drop Section */}
//         {selectedOption === "dragdrop" && (
//           <div
//             className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50 mb-4"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//           >
//             {selectedImage ? (
//               <div className="text-gray-600 text-sm mb-4">
//                 <p>
//                   Selected File: <b>{selectedImage.name}</b>
//                 </p>
//                 <img
//                   src={URL.createObjectURL(selectedImage)}
//                   alt="Preview"
//                   className="mx-auto w-32 h-32 object-contain border rounded"
//                 />
//               </div>
//             ) : (
//               <p className="text-gray-600 mb-4 text-sm">
//                 Drag and drop an image here, or click below to upload.
//               </p>
//             )}
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg"
//             >
//               Select an Image
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>
//         )}

//         {/* Webcam Section */}
//         {selectedOption === "webcam" && (
//           <div className="mb-4">
//             <video
//               ref={videoRef}
//               autoPlay
//               className="w-full h-64 object-cover rounded-lg mb-4"
//             ></video>
//             <button
//               onClick={captureImage}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg"
//             >
//               Capture Image
//             </button>
//             {selectedImage && (
//               <div className="mt-4">
//                 <p className="text-gray-600 text-sm">Captured Image:</p>
//                 <img
//                   src={URL.createObjectURL(selectedImage)}
//                   alt="Preview"
//                   className="mx-auto w-32 h-32 object-contain border rounded"
//                 />
//               </div>
//             )}
//             <canvas ref={canvasRef} className="hidden"></canvas>
//           </div>
//         )}

//         {/* Classify Button */}
//         <button
//           onClick={handleClassify}
//           className="bg-black text-white text-sm py-2 px-6 rounded-lg hover:bg-gray-800"
//         >
//           Classify
//         </button>

//         {/* Display Result */}
//         {result && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold">Result:</h3>
//             <p>
//               I think it’s a <b>{result.label}</b> with{" "}
//               <b>{result.percentage}%</b> confidence.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;









// import React, { useState, useRef, useEffect } from "react";
// import particlesConfig from "./particlesConfig";
// import TitleComponent from "./components/TitleComponent";
// import OptionSelector from "./components/OptionSelector";
// import DragAndDropComponent from "./components/DragAndDropComponent";
// import WebcamComponent from "./components/WebcamComponent";
// import ClassifyButton from "./components/ClassifyButton";
// import ResultComponent from "./components/ResultComponent";

// const App = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const particlesJS = window.particlesJS;
//     particlesJS("particles-js", particlesConfig);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-50 flex items-center justify-center">
//       {/* Particle Background */}
//       <div id="particles-js" className="absolute inset-0"></div>

//       {/* Main Container */}
//       <div className="relative bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-md text-center border border-gray-300 z-10">
//         {/* Title */}
//         <TitleComponent />

//         {/* Option Selector */}
//         <OptionSelector
//           selectedOption={selectedOption}
//           setSelectedOption={setSelectedOption}
//           setSelectedImage={setSelectedImage}
//           setResult={setResult}
//         />

//         {/* Drag-and-Drop Section */}
//         {selectedOption === "dragdrop" && (
//           <DragAndDropComponent
//             selectedImage={selectedImage}
//             setSelectedImage={setSelectedImage}
//           />
//         )}

//         {/* Webcam Section */}
//         {selectedOption === "webcam" && (
//           <WebcamComponent
//             videoRef={videoRef}
//             canvasRef={canvasRef}
//             setSelectedImage={setSelectedImage}
//           />
//         )}

//         {/* Classify Button */}
//         <ClassifyButton
//           selectedImage={selectedImage}
//           setResult={setResult}
//         />

//         {/* Display Result */}
//         {result && <ResultComponent result={result} />}
//       </div>
//     </div>
//   );
// };

// export default App;







import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import InventoryPage from "./pages/InventoryPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/inventory" replace />
            ) : (
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setUserType={setUserType}
              />
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard userType={userType} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Inventory Page Route */}
        <Route
          path="/inventory"
          element={
            isAuthenticated ? (
              <InventoryPage userType={userType} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
