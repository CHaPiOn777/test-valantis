import React from 'react';

interface Props {
  fillDefault?: string;
  strokeDefault?: string;
  fillHovered?: string;
  strokeHovered?: string;
}

export const CloseIcon: React.FC<Props> = ({
  strokeDefault,
  strokeHovered,
}) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5L5 19"
        stroke={strokeDefault || strokeHovered}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L19 19"
        stroke={strokeDefault || strokeHovered}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
