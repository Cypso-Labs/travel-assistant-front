import React from "react";
import { HighlightedTextProps } from "./types";

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  color,
}) => {
  return <span style={{ color }}>{text}</span>;
};
