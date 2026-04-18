import { type ButtonHTMLAttributes, type FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const getBackgroundColor = () => {
    if (variant === "secondary") return "#6c757d";
    if (variant === "danger") return "#dc3545";
    return "#0d6efd";
  };

  return (
    <button
      style={{
        backgroundColor: getBackgroundColor(),
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        opacity: props.disabled ? 0.6 : 1,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
