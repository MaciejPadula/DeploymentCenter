import { TextField } from "@mui/material";
import { FocusEvent } from "react";
import { Container } from "../../deployment-page/models/container";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { KeyValueListControl } from "../../../../shared/components/key-value-list-control/KeyValueListControl";

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

      <KeyValueListControl
        defaultValue={props.container.environmentVariables}
        onChange={(envVars) =>
          props.onContainerChange({
            ...props.container,
            environmentVariables: envVars,
          })
        }
      />
    </>
  );
}
