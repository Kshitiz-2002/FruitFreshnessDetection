import React from "react";

const ResultComponent = ({ result }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Result:</h3>
    <p>
      I think it’s a <b>{result.label}</b> with{" "}
      <b>{result.percentage}%</b> confidence.
    </p>
  </div>
);

export default ResultComponent;
