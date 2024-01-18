import React, { ReactNode, ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "default", type = "button", ...rest } = props;
  const buttonClass = cn(styles.button, {
    [styles[variant]]: variant,
  });

  return (
    <button className={buttonClass} type={type} {...rest}>
      {children}
    </button>
  );
};
