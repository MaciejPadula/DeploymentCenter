import { DeployIcon } from "../../../assets/icons";
import { ResourceSummaryModel } from "../../../shared/components/resource-page/resource-summary-model";
import { Cluster } from "../../../shared/models/cluster";
import { DeploymentDetails } from "./deployment-details";


export function createSummary(summary: DeploymentDetails,cluster: Cluster): ResourceSummaryModel {
  const properties = new Map<string, string>();
  properties.set("Name", summary.deploymentName);
  properties.set("Cluster", `${cluster.name}:${cluster.apiUrl}`);
  properties.set("Namespace", summary.namespace);
  properties.set("Application", summary.applicationName);
  properties.set("Replicas", summary.allReplicas.toString());

  return {
    resourceTitle: "Deployment",
    icon: DeployIcon,
    properties: properties,
  } as ResourceSummaryModel;
}