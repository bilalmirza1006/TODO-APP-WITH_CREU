import React from "react";
import { Button } from "@mui/material";
function ButtonWraper(props) {
  const { children, onClick, sx } = props;
  return (
    <>
      <Button sx={sx} onClick={onClick}>
        {children}
      </Button>
    </>
  );
}

export default ButtonWraper;
