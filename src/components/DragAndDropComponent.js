import React from "react";

const DragAndDropComponent = ({ selectedImage, setSelectedImage }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50 mb-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {selectedImage ? (
        <div className="text-gray-600 text-sm mb-4">
          <p>
            Selected File: <b>{selectedImage.name}</b>
          </p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="mx-auto w-32 h-32 object-contain border rounded"
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-4 text-sm">
          Drag and drop an image here, or click below to upload.
        </p>
      )}
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg"
      >
        Select an Image
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DragAndDropComponent;
