import React from "react";

export const UserIcon = (props) => {
  return (
    <svg
      width="1.05em"
      height="1.05em"
      role="presentation"
      focusable="false"
      ariaHidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="6" r="4" fill="#71717a" />
      <path
        d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
        fill="#71717a"
      />
    </svg>
  );
};
