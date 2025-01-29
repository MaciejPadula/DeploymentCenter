import { IconButton, Paper, Tooltip } from "@mui/material";
import useCronJobsDataService from "../../../services/cron-jobs-data-service";
import { Cluster } from "../../../../../shared/models/cluster";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Props = {
  cronJobName: string;
  namespace: string;
  cluster: Cluster;
};

export function CronJobToolbar(props: Props) {
  const cronJobService = useCronJobsDataService(props.cluster);

  async function runJob() {
    await cronJobService.runJob(
      props.namespace,
      props.cronJobName
    );
  }

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      <div>
        <Tooltip title={"Run Job"}>
          <IconButton onClick={runJob}>
            <PlayArrowIcon className="text-green-400" />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
}