import { Unstable_Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, SvcIcon } from "../../../assets/icons";
import { useNamespaceContext } from "../../contexts/namespace-context-helpers";

export function ResourceTypesGrid() {
  const { namespace } = useNamespaceContext();

  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={DeployIcon}
          text="Deployments"
          url={`/${namespace}/deployments`}
        />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={SvcIcon}
          text="Load Balancers"
          url={`/${namespace}/load-balancers`}
        />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox
          icon={CronJobIcon}
          text="Cron Jobs"
          url={`${namespace}/cron-jobs`}
        />
      </Grid>
    </Grid>
  );
}
