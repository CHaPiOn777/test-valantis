import React from "react";



export const Arrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 10L4.5 6h7L8 10z" fill="#000"></path>
    </svg>
  );
};
