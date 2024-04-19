import { Unstable_Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, SvcIcon } from "../../../assets/icons";
import { useConfigurationContext } from "../../contexts/context-helpers";

export function ResourceTypesGrid() {
  const { configuration } = useConfigurationContext();

  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={DeployIcon}
          text="Deployments"
          url={`/${configuration.cluster}/${configuration.namespace}/deployments`}
        />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={SvcIcon}
          text="Load Balancers"
          url={`/${configuration.cluster}/${configuration.namespace}/load-balancers`}
        />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={CronJobIcon}
          text="Cron Jobs"
          url={`/${configuration.cluster}/${configuration.namespace}/cron-jobs`}
        />
      </Grid>
    </Grid>
  );
}
