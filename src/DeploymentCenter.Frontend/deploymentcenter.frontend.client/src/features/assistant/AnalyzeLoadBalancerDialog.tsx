import { Cluster } from "../../shared/models/cluster";
import { AnalyzeDrawer } from "./components/AnalyzeDrawer";
import useAssistantService from "./services/assistant-service";

type Props = {
  cluster: Cluster;
  namespace: string;
  loadBalancerName: string;
};

export function AnalyzeLoadBalancerDialog(props: Props) {
  const dataService = useAssistantService(props.cluster);

  async function analyzeLoadBalancer(question: string) {
    return await dataService.analyzeLoadBalancer(
      props.namespace,
      props.loadBalancerName,
      question
    );
  }

  return (
    <AnalyzeDrawer
      chatName={`${props.cluster.name}-${props.namespace}-${props.loadBalancerName}-loadBalancer-assistant`}
      cluster={props.cluster}
      analyzeQuery={analyzeLoadBalancer}
      title={"Load Balancer Assistant"}
      tooltip={"Analyze Load Balancer"}
    />
  );
}
