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
import { InputVariant } from "../../helpers/material-config";

export function SelectClusters(props: {
  cluster: string;
  clusters: Cluster[];
  onClusterChanged: (namespace: string) => void;
  onClusterEdit?: () => void;
}) {
  const navigate = useNavigate();

  function handleNamespaceChange(cluster: string) {
    props.onClusterChanged(cluster);
  }

  function editClusters() {
    navigate('/clusters-configuration');

    if (props.onClusterEdit){
      props.onClusterEdit();
    }
  }

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <FormControl variant={InputVariant} className="w-full">
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
      <IconButton onClick={editClusters}>
        <Edit />
      </IconButton>
    </div>
  );
}
