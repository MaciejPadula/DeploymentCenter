import { IconButton, Tooltip } from "@mui/material";
import { ConfirmationDialog } from "../../../../../shared/components/confirmation-dialog/ConfirmationDialog";
import { Cluster } from "../../../../../shared/models/cluster";
import useCronJobsDataService from "../../../services/cron-jobs-data-service";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Props = {
  cronJobName: string;
  namespace: string;
  cluster: Cluster;
};

export function ConfirmCronJobRunDialog(props: Props) {
  const cronJobService = useCronJobsDataService(props.cluster);

  async function runJob() {
    await cronJobService.runJob(
      props.namespace,
      props.cronJobName
    );
  }

  return (
    <ConfirmationDialog
      title="Run Job"
      description="Are you sure you want to run this job?"
      onConfirm={runJob}
    >
      <Tooltip title={"Run Job"}>
        <IconButton>
          <PlayArrowIcon className="text-green-400" />
        </IconButton>
      </Tooltip>
    </ConfirmationDialog>
  );
}