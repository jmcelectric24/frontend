'use client';

import React from 'react';

interface OverlayProps {
  onClick: () => void;
}

const LTAnalysisOverlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={onClick}></div>
  );
};

export default LTAnalysisOverlay;