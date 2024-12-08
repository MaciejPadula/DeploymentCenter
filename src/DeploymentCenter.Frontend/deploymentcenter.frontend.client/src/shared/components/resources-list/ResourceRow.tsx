import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { ResourceRowModel } from "./resource-row-model";

export function ResourceRow(props: { row: ResourceRowModel }) {
  function handleClick() {
    if (props.row?.clickHandler) {
      props.row.clickHandler();
    }
  }

  const secondaryText = props.row.secondaryText ??
    (props.row.clusterName && props.row.namespace
      ? `/${props.row.clusterName}/${props.row.namespace}`
      : '');

  return (
    <ListItem divider={true} secondaryAction={props.row.action}>
      <ListItemButton onClick={() => handleClick()}>
        <ListItemIcon>
          <Icon className="!w-10 !h-10">
            <img className="w-full h-full" src={props.row.icon} />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={props.row.name} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}
