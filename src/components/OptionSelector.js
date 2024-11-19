import React from "react";

const OptionSelector = ({
  selectedOption,
  setSelectedOption,
  setSelectedImage,
  setResult,
}) => (
  <select
    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
    onChange={(e) => {
      setSelectedOption(e.target.value);
      setSelectedImage(null);
      setResult(null);
    }}
    value={selectedOption}
  >
    <option value="">Select an option to classify fruits</option>
    <option value="dragdrop">Drag and Drop</option>
    <option value="webcam">Use Webcam</option>
  </select>
);

export default OptionSelector;
