import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { InputVariant } from "../../helpers/material-config";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  requiredConfirmationText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

export function ConfirmationDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const disabled = props.requiredConfirmationText !== undefined && value !== props.requiredConfirmationText;

  function handleSave() {
    props.onConfirm();
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{props.children}</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <Typography>
            {props.description}
            {props.requiredConfirmationText && <b>{props.requiredConfirmationText}</b>}
          </Typography>

          {
            props.requiredConfirmationText &&
            <TextField
              label="Resource Name"
              variant={InputVariant}
              onChange={(e) => setValue(e.target.value)}
            />
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave} disabled={disabled}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}