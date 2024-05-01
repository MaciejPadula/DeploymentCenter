import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddClusterDialog } from "./AddClusterDialog";
import {
  configuration,
  deleteCluster,
} from "../../shared/services/configuration-service";

export function ClustersList() {
  function handleClusterDeleted(clusterName: string) {
    deleteCluster(clusterName);
  }

  return (
    <List className="w-full">
      {configuration.value.clusters.map((cluster) => (
        <ListItem
          key={cluster.name}
          divider={true}
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => handleClusterDeleted(cluster.name)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={cluster.name} secondary={cluster.apiUrl} />
        </ListItem>
      ))}
      <AddClusterDialog />
    </List>
  );
}
