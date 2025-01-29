import { useParams } from "react-router-dom";
import { Cluster } from "../../shared/models/cluster";
import { useEffect, useState } from "react";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { CronJobIcon } from "../../assets/icons";
import { getCronJobUrl } from "../../shared/services/routing-service";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { PodsList } from "../pods/components/PodsList";
import useCronJobsDataService from "./services/cron-jobs-data-service";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import { ResourceSummaryFactory, ResourceSummaryModel } from "../../shared/components/resource-page/resource-summary-model";
import { CronJobToolbar } from "./cron-job-page/components/toolbar/CronJobToolbar";

type Props = {
  cluster: Cluster;
};

export function CronJobPage(props: Props) {
  const { cronJobName, namespace } = useParams();
  const dataService = useCronJobsDataService(props.cluster);
  const [areDetailsLoaded, setAreDetailsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (cronJobName === undefined || namespace === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      props.cluster.name,
      cronJobName,
      namespace,
      CronJobIcon,
      getCronJobUrl(props.cluster.name, namespace, cronJobName)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cronJobName === undefined || namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getCronJobDetails(
      namespace,
      cronJobName
    );
    const properties = new Map<string, string>();
    properties.set("Name", summary.name);
    properties.set("Cluster", `${props.cluster.name}:${props.cluster.apiUrl}`);
    properties.set("Namespace", summary.namespace);

    return {
      resourceTitle: "Deployment",
      icon: CronJobIcon,
      properties: properties,
    } as ResourceSummaryModel;
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <CronJobToolbar cronJobName={cronJobName} namespace={namespace} cluster={props.cluster} />
      <ResourceSummary
        resourceSummaryKey={`CronJob-${namespace}-${cronJobName}`}
        resourceSummaryFactory={factory}
        onPageLoaded={() => setAreDetailsLoaded(true)}
        onPageError={() => setAreDetailsLoaded(false)}
      />
      {areDetailsLoaded && (
        <>
          <PodsList
            cluster={props.cluster}
            namePrefix={cronJobName}
            namespace={namespace}
          />
        </>
      )}

    </div>
  );
}