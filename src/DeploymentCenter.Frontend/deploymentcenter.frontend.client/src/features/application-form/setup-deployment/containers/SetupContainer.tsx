import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Container } from "../../../deployment-page/models/container";
import { useRef, useState } from "react";
import { InputVariant } from "../../../../shared/helpers/material-config";
import AddIcon from "@mui/icons-material/Add";
import { SetupEnvVariable } from "./SetupEnvVariable";
import { EnvironmentVariable } from "../../../deployment-page/models/environment-variable";

export function SetupContainer(props: {
  container: Container;
  handleContainerChange: (container: Container) => void;
  handleDelete: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [envVariables, setEnvVariables] = useState<EnvironmentVariable[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleClickOpen() {
    setEnvVariables(props.container.environmentVariables);
    setOpen(true);
  }

  function handleSave() {
    props.handleContainerChange({
      name: nameRef?.current?.value ?? "",
      image: imageRef?.current?.value ?? "",
      environmentVariables: envVariables,
      ports: [],
    });
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
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
            variant={InputVariant}
            defaultValue={props.container.name}
            inputRef={nameRef}
          />
          <TextField
            label="Image"
            variant={InputVariant}
            defaultValue={props.container.image}
            inputRef={imageRef}
          />

          {envVariables.map((envVar, index) => (
            <SetupEnvVariable
              key={`${index}_${envVar.key}`}
              environmentVariable={envVar}
            />
          ))}

          <IconButton
            size="small"
            onClick={() => setEnvVariables(old => [...old, { key: "", value: "" }])}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
