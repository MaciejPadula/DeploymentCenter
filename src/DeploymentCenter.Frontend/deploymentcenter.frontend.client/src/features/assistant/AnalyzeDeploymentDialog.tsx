import { Cluster } from "../../shared/models/cluster";
import { AnalyzeDialog } from "./components/AnalyzeDialog";
import useAssistantService from "./services/assistant-service";

type Props = {
  cluster: Cluster;
  namespace: string;
  deploymentName: string;
};

export function AnalyzeDeploymentDialog(props: Props) {
  const dataService = useAssistantService(props.cluster);

  async function analyzeDeployment(question: string) {
    return await dataService.analyzeDeployment(
      props.namespace,
      props.deploymentName,
      question
    );
  }

  return (
    <AnalyzeDialog
      cluster={props.cluster}
      analyzeQuery={analyzeDeployment}
      title={"Deployment Assistant"}
      tooltip={"Analyze Deployment"}
    />
  );
}
