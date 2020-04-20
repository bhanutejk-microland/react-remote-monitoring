import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";

interface UIButtonProps {
  disabled: boolean;
  btnType: string;
  icon?: any | null;
  clicked?: () => void;
  width?: string | null
}

const UIButton: FunctionComponent<UIButtonProps> = ({
  disabled,
  btnType,
  icon,
  clicked,
  children,
  width
}) => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color={
        btnType === "primary"
          ? "primary"
          : btnType === "secondary"
            ? "secondary"
            : "default"
      }
      startIcon={icon || null}
      onClick={clicked}
      style={{width: `${width}`}}
    >
      {children}
    </Button>
  );
};

export default UIButton;
