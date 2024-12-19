import { Cluster } from "../../shared/models/cluster";
import { useParams } from "react-router-dom";
import { TemplateForm } from "./components/TemplateForm";

type Props = {
  cluster: Cluster;
}

export function ApplyTemplatePage(props: Props) {
  const { templateName } = useParams();

  if (!templateName) {
    return <div>Template name is required</div>;
  }

  return <TemplateForm cluster={props.cluster} templateName={templateName} />;
}