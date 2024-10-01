function SidebarToggle({ rotate }) {
  return (
    <svg
      style={{ rotate }}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_105_1866)">
        <path
          d="M18 3.00098L18 21.001M12 3.00098L12 21.001M6 3.00098L6 21.001"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>

      <defs>
        <clipPath id="clip0_105_1866">
          <rect
            fill="white"
            height="24"
            transform="translate(0 0.000976562)"
            width="24"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SidebarToggle;
