import Lottie from "react-lottie-player";
import React from "react";
import construction from "../assets/underConstruction.json";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <div className="w-1/3 h-1/3">
        <Lottie play loop animationData={construction} />
      </div>
    </div>
  );
};

export default UnderConstruction;
