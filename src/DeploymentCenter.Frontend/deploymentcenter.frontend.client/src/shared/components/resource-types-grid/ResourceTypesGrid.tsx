import { Unstable_Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, SvcIcon } from "../../../assets/icons";
import { useContext } from "react";
import { NamespaceContext } from "../../contexts/NamespaceContext";

export function ResourceTypesGrid() {
  const namespaceContext = useContext(NamespaceContext);

  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={DeployIcon} text="Deployments" url={`/${namespaceContext}/deployments`} />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={SvcIcon} text="Load Balancers" url={`/${namespaceContext}/load-balancers`} />
      </Grid>
      <Grid sm={4} xs={6}>
        <ResourceTypeBox icon={CronJobIcon} text="Cron Jobs" url={`${namespaceContext}/cron-jobs`} />
      </Grid>
    </Grid>
  );
}
