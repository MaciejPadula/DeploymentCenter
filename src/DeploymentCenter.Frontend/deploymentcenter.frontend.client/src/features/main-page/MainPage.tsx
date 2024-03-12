import { useNavigate } from "react-router-dom";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { getRecentlyVisitedPages } from "../../shared/services/recently-visited-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { ResourceTypesGrid } from "../../shared/components/resource-types-grid/ResourceTypesGrid";
import { Typography } from "@mui/material";

export function MainPage() {
  const navigate = useNavigate();

  const factory: ResourcesFactory = async () => {
    const response = getRecentlyVisitedPages();
    return response.map(
      (x) =>
        ({
          name: x.title,
          namespace: x.namespace,
          icon: x.icon,
          clickHandler: () => navigate(x.url),
        } as ResourceRowModel)
    );
  };

  return (
    <div className="w-full flex flex-col">
      <ResourcesList
        resourceText="Recently Visited Resources"
        resourcesFactory={factory}
      />
      <div className="flex flex-col p-4">
        <Typography variant="h5">All Resources</Typography>
        <ResourceTypesGrid />
      </div>
    </div>
  );
}
