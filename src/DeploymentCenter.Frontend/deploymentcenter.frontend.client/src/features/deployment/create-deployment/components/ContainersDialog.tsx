import { IconButton, TextField } from "@mui/material";
import { FocusEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "../../deployment-page/models/container";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { DoubleInput } from "../../../../shared/components/double-input/DoubleInput";

type Props = {
  container: Container;
  onContainerChange: (container: Container) => void;
};

export function ContainersDialog(props: Props) {
  function setContainerName(event: FocusEvent<HTMLInputElement>) {
    props.onContainerChange({
      ...props.container,
      name: event.target.value,
    });
  }

  function setContainerImage(event: FocusEvent<HTMLInputElement>) {
    props.onContainerChange({
      ...props.container,
      image: event.target.value,
    });
  }

  function handleEnvVarKeyChange(index: number, key: string) {
    const newEnvVariables = [...props.container.environmentVariables];
    newEnvVariables[index].key = key;

    props.onContainerChange({
      ...props.container,
      environmentVariables: newEnvVariables,
    });
  }

  function handleEnvVarValueChange(index: number, value: string) {
    const newEnvVariables = [...props.container.environmentVariables];
    newEnvVariables[index].value = value;
    props.onContainerChange({
      ...props.container,
      environmentVariables: newEnvVariables,
    });
  }

  function addEnvVariable() {
    const newEnvVariables = [...props.container.environmentVariables];
    newEnvVariables.push({ key: "", value: "" });

    props.onContainerChange({
      ...props.container,
      environmentVariables: newEnvVariables,
    });
  }

  return (
    <>
      <TextField
        label="Name"
        variant={InputVariant}
        defaultValue={props.container.name}
        onBlur={setContainerName}
      />
      <TextField
        label="Image"
        variant={InputVariant}
        defaultValue={props.container.image}
        onBlur={setContainerImage}
      />

      {props.container.environmentVariables.map((envVar, index) => (
        <DoubleInput
          key={`${index}_${envVar.key}`}
          defaultFirstValue={envVar.key}
          defaultSecondValue={envVar.value}
          onFirstChange={(key) => handleEnvVarKeyChange(index, key)}
          onSecondChange={(value) => handleEnvVarValueChange(index, value)}
        />
      ))}

      <div>
        <IconButton size="small" onClick={() => addEnvVariable()}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
}
