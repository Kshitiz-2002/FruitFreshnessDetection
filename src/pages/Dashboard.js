import React, { useRef, useState } from "react";
import TitleComponent from "../components/TitleComponent";
import ParticleBackground from "../components/ParticleBackground";
import OptionSelector from "../components/OptionSelector";
import DragAndDropComponent from "../components/DragAndDropComponent";
import WebcamComponent from "../components/WebcamComponent";
import ClassifyButton from "../components/ClassifyButton";
import ResultComponent from "../components/ResultComponent";
import { Link } from "react-router-dom";

const Dashboard = ({ userType }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  // Move useRef outside conditional rendering
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Particle Background */}
      <ParticleBackground />
      <div id="particles-js" className="absolute inset-0"></div>

      {/* Main Container */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-md text-center border border-gray-300 z-10">
        {/* Title */}
        <TitleComponent />
      
        {/* Option Selector */}
        <OptionSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setSelectedImage={setSelectedImage}
          setResult={setResult}
        />

        {/* Drag-and-Drop Section */}
        {selectedOption === "dragdrop" && (
          <DragAndDropComponent
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}

        {/* Webcam Section */}
        {selectedOption === "webcam" && (
          <WebcamComponent
            videoRef={videoRef}
            canvasRef={canvasRef}
            setSelectedImage={setSelectedImage}
          />
        )}

        {/* Classify Button */}
        <ClassifyButton selectedImage={selectedImage} setResult={setResult} />

        {/* Display Result */}
        {result && <ResultComponent result={result} />}
      </div>
    </div>
  );
};

export default Dashboard;
