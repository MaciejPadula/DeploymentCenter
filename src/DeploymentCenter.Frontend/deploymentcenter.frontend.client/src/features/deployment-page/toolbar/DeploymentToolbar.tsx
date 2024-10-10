import { IconButton, Paper } from "@mui/material";
import { DeleteResource } from "../../../shared/components/delete-resource/DeleteResource";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type Props = {
  deploymentName: string;
};

export function DeploymentToolbar(props: Props) {
  function deleteDeployment() {
    console.log("delete deployment");
  }

  function restartDeployment() {
    console.log("restart deployment");
  }

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      <DeleteResource
        resourceName={props.deploymentName}
        onDelete={deleteDeployment}
      >
        <IconButton>
          <DeleteIcon className="text-red-700" />
        </IconButton>
      </DeleteResource>

      <div>
        <IconButton onClick={restartDeployment}>
          <RestartAltIcon className="text-yellow-400" />
        </IconButton>
      </div>
    </Paper>
  );
}
