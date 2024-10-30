import { useState } from "react";
import { Cluster } from "../../../shared/models/cluster";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PlusMinusInput } from "../../../shared/components/plus-minus-input/PlusMinusInput";

type Props = {
  deploymentName: string;
  namespace: string;
  cluster: Cluster;
  replicasCount: number;
  onChange: (value: number) => void;
};

export function ScaleDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(props.replicasCount);

  function handleClickOpen() {
    setValue(props.replicasCount);
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
      <Button onClick={() => handleClickOpen()}>Scale Deployment</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Scale Deployment</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <PlusMinusInput
            label={"Replicas"}
            defaultValue={value}
            onChange={(value) => setValue(value)}
            min={1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
