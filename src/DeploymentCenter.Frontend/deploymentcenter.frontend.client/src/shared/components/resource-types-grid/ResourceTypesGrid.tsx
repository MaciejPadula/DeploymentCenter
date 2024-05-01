import { Unstable_Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, NamespaceIcon, SvcIcon } from "../../../assets/icons";
import { configuration } from "../../services/configuration-service";
import { useAppRouting } from "../../hooks/navigation";

function GridBox(props: { children: React.ReactNode }) {
  return (
    <Grid sm={4} xs={6}>
      {props.children}
    </Grid>
  );
}

export function ResourceTypesGrid() {
  const navigation = useAppRouting();
  const config = configuration.value;

  return (
    <Grid container spacing={2}>
      <GridBox>
        <ResourceTypeBox
          icon={DeployIcon}
          text="Deployments"
          navigate={() => navigation.deploymentList(config.cluster, config.namespace)}
        />
      </GridBox>
      <GridBox>
        <ResourceTypeBox
          icon={SvcIcon}
          text="Load Balancers"
          navigate={() => navigation.loadBalancerList(config.cluster, config.namespace)}
        />
      </GridBox>
      <GridBox>
        <ResourceTypeBox
          icon={CronJobIcon}
          text="Cron Jobs"
          navigate={() => navigation.cronJobsList(config.cluster, config.namespace)}
        />
      </GridBox>
      <GridBox>
        <ResourceTypeBox
          icon={NamespaceIcon}
          text="Namespaces"
          navigate={() => navigation.namespacesList(config.cluster)}
        />
      </GridBox>
    </Grid>
  );
}
