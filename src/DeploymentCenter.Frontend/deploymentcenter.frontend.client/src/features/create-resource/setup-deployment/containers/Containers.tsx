import { IconButton, Typography } from "@mui/material";
import { SetupContainer } from "./SetupContainer";
import {
  Container,
  getDefaultContainer,
} from "../../../deployment-page/models/container";
import AddIcon from "@mui/icons-material/Add";

export function Containers(props: {
  containers: Container[];
  onContainersChange: (containers: Container[]) => void;
}) {
  return (
    <div>
      <Typography variant="h6">Containers</Typography>
      <div className="flex flex-row">
        {props.containers.map((container, index) => (
          <SetupContainer
            key={`${index}-${container.name}-${container.image}`}
            container={container}
            handleContainerChange={(container) => {
              const newContainers = [...props.containers];
              newContainers[index] = container;

              props.onContainersChange(newContainers);
            }}
            handleDelete={() => {
              const newContainers = [...props.containers];
              newContainers.splice(index, 1);

              props.onContainersChange(newContainers);
            }}
          />
        ))}

        <IconButton
          size="small"
          onClick={() => {
            props.onContainersChange([
              ...props.containers,
              getDefaultContainer(),
            ]);
          }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
