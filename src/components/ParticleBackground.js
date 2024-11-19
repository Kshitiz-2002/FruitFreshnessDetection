import React, { useEffect } from "react";
import particlesConfig from "../particlesConfig";

const ParticleBackground = () => {
  useEffect(() => {
    const particlesJS = window.particlesJS;
    particlesJS("particles-js", particlesConfig);
  }, []);

  return <div id="particles-js" className="absolute inset-0"></div>;
};

export default ParticleBackground;
