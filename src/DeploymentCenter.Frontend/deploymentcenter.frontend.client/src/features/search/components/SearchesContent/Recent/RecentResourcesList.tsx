import { CronJobIcon, DeployIcon, SvcIcon } from "../../../../../assets/icons";
import { lastElements } from "../../../../../shared/helpers/array-helpers";
import { useAppRouting } from "../../../../../shared/hooks/navigation";
import { configuration } from "../../../../../shared/services/configuration-service";
import { SearchResourceType } from "../../../models/search-resource";
import { SearchIconsList } from "../../List/SearchIconsList";

type Props = {
  recentResourceTypes: SearchResourceType[];
}

export function RecentResorcesList(props: Props) {
  const navigation = useAppRouting();
  const config = configuration.value;

  function getIcon(service: SearchResourceType): string {
    switch (service) {
      case SearchResourceType.Deployment:
        return DeployIcon;
      case SearchResourceType.CronJob:
        return CronJobIcon;
      case SearchResourceType.LoadBalancer:
        return SvcIcon;
      default:
        return SvcIcon;
    }
  }

  function getResourceName(service: SearchResourceType): string {
    switch (service) {
      case SearchResourceType.Deployment:
        return "Deployments";
      case SearchResourceType.CronJob:
        return "Cron Jobs";
      case SearchResourceType.LoadBalancer:
        return "Load Balancers";
      default:
        return "Unknown";
    }
  }

  function getResourceAction(service: SearchResourceType) {
    switch (service) {
      case SearchResourceType.Deployment:
        navigation.deploymentList(config.cluster, config.namespace);
        break;
      case SearchResourceType.CronJob:
        navigation.cronJobsList(config.cluster, config.namespace);
        break;
      case SearchResourceType.LoadBalancer:
        return navigation.loadBalancerList(config.cluster, config.namespace);
        break;
    }
  }

  const services = lastElements<SearchResourceType>(props.recentResourceTypes, 4).reverse().map(service => {
    return {
      text: getResourceName(service),
      image: getIcon(service),
      onClick: () => getResourceAction(service)
    }
  });

  return <SearchIconsList header="Recent services" headerLine={true} items={services} />;
}