import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Cluster } from "../../models/cluster";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export function SelectClusters(props: {
  cluster: string;
  clusters: Cluster[];
  onClusterChanged: (namespace: string) => void;
}) {
  const navigate = useNavigate();

  function handleNamespaceChange(cluster: string) {
    props.onClusterChanged(cluster);
  }

  function editClusters() {
    navigate('/clusters-configuration');
    navigate(0);
  }

  return (
    <div className="w-full flex flex-row items-end justify-center">
      <FormControl variant="standard" className="w-full">
        <InputLabel>Clusters</InputLabel>
        <Select
          value={props.cluster}
          onChange={(e) => handleNamespaceChange(e.target.value)}
        >
          {props.clusters.map((x) => (
            <MenuItem key={x.name} value={x.name}>
              {`${x.name} - ${x.apiUrl}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton edge="end" onClick={editClusters}>
        <Edit />
      </IconButton>
    </div>
  );
}
