import { Cluster } from "../../../../../shared/models/cluster";
import { ResourceToolbar } from "../../../../../shared/components/toolbar/ResourceToolbar";
import { ConfirmCronJobRunDialog } from "./ConfirmCronJobRunDialog";

type Props = {
  cronJobName: string;
  namespace: string;
  cluster: Cluster;
};

export function CronJobToolbar(props: Props) {
  return (
    <ResourceToolbar>
      <ConfirmCronJobRunDialog
        cronJobName={props.cronJobName}
        namespace={props.namespace}
        cluster={props.cluster}
      />
    </ResourceToolbar>
  );
}