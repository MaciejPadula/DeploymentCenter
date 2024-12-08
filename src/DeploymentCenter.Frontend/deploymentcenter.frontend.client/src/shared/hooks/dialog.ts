import { useState } from "react";

export function useDialog() {
  const [open, setOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return {
    open,
    handleClickOpen,
    handleClose
  }
}