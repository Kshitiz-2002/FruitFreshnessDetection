import React from "react";

const ClassifyButton = ({ selectedImage, setResult }) => {
  const handleClassify = async () => {
    if (!selectedImage) {
      alert("Please upload or capture an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setResult(result);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error("Error during classification:", err);
      alert("An error occurred while connecting to the server.");
    }
  };

  return (
    <button
      onClick={handleClassify}
      className="bg-black text-white text-sm py-2 px-6 rounded-lg hover:bg-gray-800"
    >
      Classify
    </button>
  );
};

export default ClassifyButton;
