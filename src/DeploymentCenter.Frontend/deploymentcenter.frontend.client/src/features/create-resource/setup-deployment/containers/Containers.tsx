import { FormHelperText, IconButton, Typography } from "@mui/material";
import { SetupContainer } from "./SetupContainer";
import {
  Container,
  getDefaultContainer,
} from "../../../deployment-page/models/container";
import AddIcon from "@mui/icons-material/Add";

export function Containers(props: {
  containers: Container[];
  onContainersChange: (containers: Container[]) => void;
  error?: boolean;
  helperText?: string;
}) {

  function addEmptyContainer() {
    props.onContainersChange([
      ...props.containers,
      getDefaultContainer(),
    ]);
  }

  function modifyContainer(index: number, container: Container) {
    const newContainers = [...props.containers];
    newContainers[index] = container;

    props.onContainersChange(newContainers);
  }

  function deleteContainer(index: number) {
    const newContainers = [...props.containers];
    newContainers.splice(index, 1);

    props.onContainersChange(newContainers);
  }

  return (
    <div>
      <Typography variant="h6">Containers</Typography>
      {props.error && <FormHelperText error={true}>{props.helperText}</FormHelperText>}
      <div className="flex flex-row">
        {props.containers.map((container, index) => (
          <SetupContainer
            key={`${index}-${container.name}-${container.image}`}
            container={container}
            handleContainerChange={(container) => modifyContainer(index, container)}
            handleDelete={() => deleteContainer(index)}
          />
        ))}

        <IconButton
          size="small"
          onClick={() => addEmptyContainer()}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
