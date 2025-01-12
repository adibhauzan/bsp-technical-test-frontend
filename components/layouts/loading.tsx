import React from "react";

const Loading = () => {
  return (
    <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#4361ee"
        height="64"
        width="64"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 330 330"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          id="XMLID_28_"
          d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 10; 0 -10; 0 5; 0 -5; 0 0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        <path
          xmlns="http://www.w3.org/2000/svg"
          id="XMLID_30_"
          d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 15; 0 -10; 0 10; 0 -5; 0 0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        <path
          xmlns="http://www.w3.org/2000/svg"
          id="XMLID_71_"
          d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -10; 0 10; 0 -5; 0 5; 0 0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
