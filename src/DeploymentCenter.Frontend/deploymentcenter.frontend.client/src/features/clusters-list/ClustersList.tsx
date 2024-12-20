import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddClusterDialog } from "./AddClusterDialog";
import {
  configuration,
  deleteCluster,
} from "../../shared/services/configuration-service";
import { DeleteResource } from "../../shared/components/delete-resource/DeleteResource";

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
            <DeleteResource resourceName={cluster.name} onDelete={() => handleClusterDeleted(cluster.name)}>
              <IconButton edge="end">
                <DeleteIcon className="text-red-700" /> 
              </IconButton>
            </DeleteResource>
          }
        >
          <ListItemText primary={cluster.name} secondary={cluster.apiUrl} />
        </ListItem>
      ))}
      <AddClusterDialog />
    </List>
  );
}
