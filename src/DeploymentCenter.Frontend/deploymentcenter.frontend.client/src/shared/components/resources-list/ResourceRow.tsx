import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { ResourceRowModel } from "./resource-row-model";

export function ResourceRow(props: { row: ResourceRowModel }) {
  return (
    <ListItem divider={true}>
      <ListItemButton onClick={() => props.row.clickHandler()}>
        <ListItemIcon>
          <Icon className="!w-10 !h-10">
            <img className="w-full h-full" src={props.row.icon} />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={props.row.name} />
      </ListItemButton>
    </ListItem>
  );
}
