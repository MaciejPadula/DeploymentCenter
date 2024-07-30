import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Cluster } from "../../models/cluster";
import Edit from "@mui/icons-material/Edit";
import { InputVariant } from "../../helpers/material-config";
import { useState } from "react";
import { useAppRouting } from "../../hooks/navigation";

export function SelectClusters(props: {
  defaultCluster: string;
  clusters: Cluster[];
  onClusterChanged: (namespace: string) => void;
  onClusterEdit?: () => void;
}) {
  const navigation = useAppRouting();
  const [cluster, setCluster] = useState<string>(props.defaultCluster);

  function handleNamespaceChange(cluster: string) {
    props.onClusterChanged(cluster);
    setCluster(cluster);
  }

  function editClusters() {
    if (props.onClusterEdit) {
      props.onClusterEdit();
    }

    navigation.clustersConfiguration();
  }

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <FormControl variant={InputVariant} className="w-full">
        <InputLabel>Clusters</InputLabel>
        <Select
          value={cluster}
          onChange={(e) => handleNamespaceChange(e.target.value)}
        >
          {props.clusters.map((x) => (
            <MenuItem key={x.name} value={x.name}>
              {`${x.name} - ${x.apiUrl}`}
            </MenuItem>
          ))}
          <MenuItem onClick={editClusters} className="flex items-center gap-2">
            <Edit />
            Edit Clusters
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
