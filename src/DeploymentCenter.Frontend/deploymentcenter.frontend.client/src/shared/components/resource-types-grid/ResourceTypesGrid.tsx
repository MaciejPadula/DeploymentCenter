import { Unstable_Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, SvcIcon } from "../../../assets/icons";

export function ResourceTypesGrid() {
  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={DeployIcon} text="Deployments" url="/deployments" />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={SvcIcon} text="Load Balancers" url="/load-balancers" />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={CronJobIcon} text="Cron Jobs" url="/cron-jobs" />
      </Grid>
    </Grid>
  );
}
