import { Icon, IconButton } from "@mui/material";
import { deleteRecentlyVisitedPage, getRecentlyVisitedPages } from "../../../../../shared/services/recently-visited-service";
import { SearchList } from "../../List/SearchList";
import { useAppRouting } from "../../../../../shared/hooks/navigation";
import CloseIcon from '@mui/icons-material/Close';

export function RecentResorcesList() {
  const navigation = useAppRouting();
  const response = getRecentlyVisitedPages();

  const resources = response.map(x => {
    return {
      name: x.title,
      icon: <Icon><img src={x.icon} /></Icon>,
      onClick: () => navigation.navigateToUrl(x.url),
      action: (
        <IconButton onClick={() => deleteRecentlyVisitedPage(x.title)}>
          <CloseIcon />
        </IconButton>
      )
    }
  });

  return <SearchList header={"Recent resources"} headerLine={true} divider={false} items={resources} />;
}