
import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

/** 
 * Unified Page Title: Calibri, bold, 1-2 sizes larger than default text, soft gray. 
 * No overrides allowed from outside (unless adding margin). 
 */
export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`font-calibri font-bold text-2xl md:text-3xl text-gray-700 text-center mb-4 ${className}`}
    >
      {children}
    </h1>
  );
}
