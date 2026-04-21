import type { FC } from "react";
import "./Spinner.css"; 

export const Spinner: FC = () => {
  return (
    <div className="hub-spinner-container">
      <div className="hub-spinner"></div>
    </div>
  );
};