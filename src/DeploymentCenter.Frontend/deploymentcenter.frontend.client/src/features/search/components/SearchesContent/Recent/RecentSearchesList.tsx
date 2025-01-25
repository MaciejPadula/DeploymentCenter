import { IconButton } from "@mui/material";
import { lastElements } from "../../../../../shared/helpers/array-helpers";
import ScheduleIcon from '@mui/icons-material/Schedule';
import CloseIcon from '@mui/icons-material/Close';
import { SearchList } from "../../List/SearchList";

type Props = {
  recentSearches: string[];
  onSearchClicked?: (search: string) => void;
  onRemoveSearchClicked?: (search: string) => void;
}

export function RecentSearchesList(props: Props) {
  const searches = lastElements<string>(props.recentSearches, 5).reverse().map(search => {
    return {
      name: search,
      icon: <ScheduleIcon />,
      action: (
        <IconButton onClick={() => props.onRemoveSearchClicked?.(search)}>
          <CloseIcon />
        </IconButton>
      ),
      onClick: () => props.onSearchClicked?.(search)
    }
  });

  return <SearchList header="Search history" items={searches} />;
}