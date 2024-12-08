import { Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Cluster } from "../../../../shared/models/cluster";
import { Container } from "../../models/container";
import { VolumeSelectorDialog } from "./VolumeSelectorDialog";
import { VolumeIcon } from "../../../../assets/icons";

type Props = {
  cluster: Cluster;
  namespace: string;
  deploymentName: string;
  container: Container;
}

export function ContainerVolumesList(props: Props) {
  return <>
    <VolumeSelectorDialog
      containerName={props.container.name}
      cluster={props.cluster}
      namespace={props.namespace}
      deploymentName={props.deploymentName}
    />
    <List>
      {
        props.container.volumes.map((x) => (
          <ListItem divider={true} key={x.name}>
            <ListItemButton>
              <ListItemIcon>
                <Icon className="!w-10 !h-10">
                  <img className="w-full h-full" src={VolumeIcon} />
                </Icon>
              </ListItemIcon>
              <ListItemText primary={x.name} secondary={x.mountPath} />
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  </>
}