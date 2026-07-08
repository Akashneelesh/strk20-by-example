import React from "react"

interface Props {
  size: number
  className?: string
  fill: string
}

// Shield with a keyhole - privacy mark for STRK20 by Example
const Strk20: React.FC<Props> = ({ size, className = "", fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={fill}
    >
      <path
        opacity={0.8}
        d="M12 1.5 3.75 4.875v6.113c0 5.006 3.52 9.68 8.25 10.887 4.73-1.208 8.25-5.881 8.25-10.887V4.875L12 1.5z"
      />
      <path
        fill="var(--background-color, #fff)"
        d="M12 7.125a2.25 2.25 0 0 0-1.125 4.198v3.302a1.125 1.125 0 0 0 2.25 0v-3.302A2.25 2.25 0 0 0 12 7.125z"
      />
    </svg>
  )
}

export default Strk20
