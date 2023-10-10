"use client";

import { Button, ButtonProps } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface ButtonWithIconProps extends ButtonProps {
  label: string;
  onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);

  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: LucideIcon;
}

const ButtonWithIcon = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  variant: variant = "default",
}: ButtonWithIconProps) => {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        w-full
        gap-3
        transition
        disabled:cursor-not-allowed
        disabled:opacity-70
        `}
    >
      {Icon && <Icon size={18} />}
      {label}
    </Button>
  );
};

export default ButtonWithIcon;
