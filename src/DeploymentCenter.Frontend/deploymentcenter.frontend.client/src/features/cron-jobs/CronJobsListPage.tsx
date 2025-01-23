import { useParams } from "react-router-dom";
import { useAppRouting } from "../../shared/hooks/navigation";
import { Cluster } from "../../shared/models/cluster";
import useCronJobsDataService from "./services/cron-jobs-data-service";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { ResourceRowModel, ResourcesFactory } from "../../shared/components/resources-list/resource-row-model";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { CronJobIcon } from "../../assets/icons";

type Props = {
  cluster: Cluster;
};

export function CronJobsListPage(props: Props) {
  const navigation = useAppRouting();
  const { namespace } = useParams();
  const dataService = useCronJobsDataService(props.cluster);

  if (namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getCronJobs(namespace);
    return response.map(
      (x) =>
      ({
        clusterName: props.cluster.name,
        name: x.name,
        namespace: namespace,
        icon: CronJobIcon,
        clickHandler: () =>
          navigation.cronJobPage(props.cluster.name, namespace, x.name),
      } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey={`CronJobsList-${props.cluster.name}-${namespace}`}
      resourceText="Cron Jobs"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new cron job",
        clickHandler: () => navigation.setupDeployment(props.cluster.name),
      }}
    />
  );
}