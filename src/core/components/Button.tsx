import { type ButtonHTMLAttributes, type FC } from "react";
import "./Button.css"; // Подключаем стили

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`hub-button hub-button-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
};