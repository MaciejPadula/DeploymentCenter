import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddClusterDialog } from "./AddClusterDialog";

export function ClustersList() {
  const { configuration, setConfiguration } = useConfigurationContext();

  function handleClusterDeleted(clusterName: string) {
    setConfiguration({
      ...configuration,
      clusters: configuration.clusters.filter((x) => x.name !== clusterName),
    });
  }

  return (
    <List className="w-full">
      {configuration.clusters.map((cluster) => (
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
