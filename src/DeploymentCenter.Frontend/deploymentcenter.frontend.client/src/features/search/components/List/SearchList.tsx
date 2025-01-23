import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ReactNode } from "react";

import "./SearchList.scss";

interface SearchListItemDefinition {
  name: string;
  icon: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
}

type Props = {
  header?: string;
  divider?: boolean;
  items: SearchListItemDefinition[];
}

export function SearchList(props: Props) {
  return (
    <List>
      {props.header && <Typography>{props.header}</Typography>}
      {
        props.items.map(definition => (
          <ListItem
            key={definition.name}
            className="!p-0"
            secondaryAction={definition.action}
            divider={props.divider}
          >
            <ListItemButton className="!py-0.5 !px-0.5" onClick={() => definition.onClick?.()}>
              <ListItemIcon className="!pr-2 !min-w-0">
                {definition.icon}
              </ListItemIcon>
              <ListItemText primary={definition.name} className="!p-0" />
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  );
}