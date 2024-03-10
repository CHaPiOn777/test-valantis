import React from 'react';

interface Props {
  fillDefault?: string;
  strokeDefault?: string;
  fillHovered?: string;
  strokeHovered?: string;
  size?: number;
}

export const SearchIcon: React.FC<Props> = ({
  strokeDefault,
  strokeHovered,
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={strokeDefault || strokeHovered}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9999 21L16.6499 16.65"
        stroke={strokeDefault || strokeHovered}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
