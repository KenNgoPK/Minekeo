"use client";
import React from "react";

export default function WaveDivider({
  height = 140,
  fill = "#151515",   // màu của section phía dưới
  shadow = false,     // tắt bóng cho clean
  className = "",
}) {
  return (
    <>
      <svg
        className={`absolute bottom-0 left-0 w-full pointer-events-none ${className}`}
        style={{ height, filter: shadow ? "drop-shadow(0 -10px 20px rgba(0,0,0,.2))" : undefined }}
        viewBox="0 0 1366 134"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill={fill}
          d="M0,91.94C43.71,59.18,114.51,16.29,207.47,3.82c6.79-0.91,32.2-3.96,66.16-3.42
             c107.54,1.74,148.6,36.78,252.32,50.55c34.39,4.57,60.71,5.41,78.43,5.96
             c42.7,1.34,62.27-1.19,67.62-1.92
             c32.33-4.43,52.86-13.09,65-17
             c55.04-17.72,92.95,11.78,189,35
             c44.78,10.83,82.19,14.22,157,21
             c0,0,136.88,12.41,195.62-26.42
             c0.33-0.22,3.48-2.33,7.91-4.91
             c4.28-2.49,9.99-5.54,16.95-8.53
             C1328,43.62,1350.63,41.3,1366,41
             c0,31,0,62,0,93
             c-455.33,0-910.67,0-1366,0
             C0,119.98,0,105.96,0,91.94z"
        />
      </svg>
      {/* Spacer để chừa chỗ cho sóng, không đè lên section dưới */}
      <div style={{ height }} aria-hidden="true" />
    </>
  );
}
