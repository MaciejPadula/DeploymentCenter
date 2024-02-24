import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { ResourceRowModel } from "./resource-row-model";

export function ResourceRow(props: { row: ResourceRowModel }) {
  return (
    <ListItem>
      <ListItemButton onClick={() => props.row.clickHandler()}>
        <ListItemIcon>
          {props.row.icon}
        </ListItemIcon>
        <ListItemText primary={props.row.name} />
      </ListItemButton>
    </ListItem>
  );
}
