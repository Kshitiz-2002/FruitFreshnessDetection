import React, { useEffect, useState } from "react";

const WebcamComponent = ({ videoRef, canvasRef, setSelectedImage }) => {
  const [capturedPreview, setCapturedPreview] = useState(null); // State to store the captured image preview

  // Start webcam when the component mounts
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        alert("Unable to access webcam. Please check your permissions.");
      }
    };

    startWebcam();

    // Stop the webcam when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef]);

  // Helper function: Convert DataURI to File
  const dataURItoFile = (dataURI, fileName) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: mimeString });
  };

  // Capture image from the webcam feed
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // Convert canvas data to image file
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const file = dataURItoFile(dataUrl, "captured_image.png");
      setSelectedImage(file);
      setCapturedPreview(dataUrl); // Set the preview URL for the captured image
    }
  };

  return (
    <div className="mb-4">
      {/* Webcam Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-64 object-cover rounded-lg mb-4"
      ></video>

      {/* Capture Button */}
      <button
        onClick={captureImage}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg"
      >
        Capture Image
      </button>

      {/* Captured Image Preview */}
      {capturedPreview && (
        <div className="mt-4">
          <p className="text-gray-600 text-sm mb-2">Captured Image Preview:</p>
          <img
            src={capturedPreview}
            alt="Captured Preview"
            className="mx-auto w-32 h-32 object-contain border rounded"
          />
        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default WebcamComponent;
