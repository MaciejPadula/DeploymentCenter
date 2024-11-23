import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { InputVariant } from "../../helpers/material-config";

type Props = {
  resourceName: string;
  onDelete: () => void;
  children: React.ReactNode;
};

export function DeleteResource(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const disabled = useMemo(
    () => value !== props.resourceName,
    [props.resourceName, value]
  );

  function handleSave() {
    props.onDelete();
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{props.children}</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <Typography>
            You are trying to delete resource. To confirm, type{" "}
            <b>{props.resourceName}</b>
          </Typography>

          <TextField
            label="Resource Name"
            variant={InputVariant}
            onChange={(e) => setValue(e.target.value)}
          />
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
