import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Setter } from "../../helpers/function-helpers";

type Props<T> = {
  dialogTitle: string;
  value: T;
  toString: (value: T) => string;
  onChange: (value: T) => void;
  onDelete: () => void;
  dialogContentFactory: (value: T, setter: Setter<T>) => JSX.Element;
};

export function ChipListItem<T>(props: Props<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<T>(props.value);

  function valueSetter(value: T) {
    setValue(value);
  }

  function handleClickOpen() {
    setValue(props.value);
    setOpen(true);
  }

  function handleSave() {
    props.onChange(value);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Chip
        label={props.toString(props.value)}
        onDelete={props.onDelete}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          {props.dialogContentFactory(value, valueSetter)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
