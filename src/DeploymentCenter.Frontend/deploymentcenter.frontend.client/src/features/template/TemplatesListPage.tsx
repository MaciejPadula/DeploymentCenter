import { ResourceRowModel, ResourcesFactory } from "../../shared/components/resources-list/resource-row-model";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { Cluster } from "../../shared/models/cluster";
import { useTemplatesDataService } from "./services/templates-data-service";
import { DeployIcon, SvcIcon, TemplateIcon, VolumeIcon } from "../../assets/icons";
import { Icon, Tooltip } from "@mui/material";
import { ResourceType } from "./models/template-details";
import { useAppRouting } from "../../shared/hooks/navigation";

type Props = {
  cluster: Cluster;
};

interface TemplateResourceDetails {
  type: ResourceType;
  tooltip: string;
  icon: string;
}

function TemplateResourceTypeIcon(props: { resource: TemplateResourceDetails }) {
  return (
    <Tooltip key={props.resource.type} title={props.resource.tooltip}>
      <Icon>
        <img src={props.resource.icon} />
      </Icon>
    </Tooltip>
  )
}


export function TemplatesListPage(props: Props) {
  const dataService = useTemplatesDataService(props.cluster);
  const navigation = useAppRouting();

  function mapTemplateResource(resourceType: ResourceType): TemplateResourceDetails {
    switch (resourceType) {
      case ResourceType.Deployment:
        return { type: resourceType, tooltip: "Deployment", icon: DeployIcon };
      case ResourceType.LoadBalancer:
        return { type: resourceType, tooltip: "Load Balancer", icon: SvcIcon };
      case ResourceType.Volume:
        return { type: resourceType, tooltip: "Volume", icon: VolumeIcon };
      default:
        return { type: resourceType, tooltip: "Unknown", icon: "" };
    }
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getTemplates();
    return response.map(
      (x) =>
      ({
        clusterName: props.cluster.name,
        name: x.name,
        icon: TemplateIcon,
        secondaryText: (
          <span className="flex flex-row space-x-2 items-center">
            {
              x.resourceTypes.map(mapTemplateResource).map(x => <TemplateResourceTypeIcon resource={x} />)
            }
          </span>
        ),
        clickHandler: () => { navigation.navigateToUrl(`/${props.cluster.name}/templates/${x.name}/apply`) }
      } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey={`TemplatesListPage-${props.cluster.name}`}
      resourceText="Templates"
      resourcesFactory={factory}
    />
  );
}