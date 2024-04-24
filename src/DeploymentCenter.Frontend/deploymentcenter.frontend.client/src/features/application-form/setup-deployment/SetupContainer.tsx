import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Container } from "../../deployment-page/models/container";
import { useState } from "react";

export function SetupContainer(props: {
  container: Container;
  handleContainerChange: (container: Container) => void;
  handleDelete: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function updateContainerName(name: string) {
    props.handleContainerChange({
      ...props.container,
      name,
    });
  }

  function updateContainerImage(image: string) {
    props.handleContainerChange({
      ...props.container,
      image,
    });
  }

  const textToDisplay =
    props.container.name?.length > 0
      ? props.container.name
      : "Unnamed container";

  return (
    <>
      <Chip
        onClick={handleClickOpen}
        label={textToDisplay}
        onDelete={props.handleDelete}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Setup container settings</DialogTitle>
        <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
          <TextField
            label="Name"
            variant="standard"
            defaultValue={props.container.name}
            onBlur={(e) => updateContainerName(e.currentTarget.value)}
          />
          <TextField
            label="Image"
            variant="standard"
            defaultValue={props.container.image}
            onBlur={(e) => updateContainerImage(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
