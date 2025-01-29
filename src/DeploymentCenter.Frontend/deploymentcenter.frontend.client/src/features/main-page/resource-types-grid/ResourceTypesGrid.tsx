import { Grid2 as Grid } from "@mui/material";
import { ResourceTypeBox } from "./ResourceTypeBox";
import { CronJobIcon, DeployIcon, NamespaceIcon, SvcIcon, TemplateIcon, VolumeIcon } from "../../../assets/icons";
import { configuration } from "../../../shared/services/configuration-service";
import { useAppRouting } from "../../../shared/hooks/navigation";

function GridBox(props: { children: React.ReactNode }) {
  return (
    <Grid size={{sm: 4, xs: 6}}>
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
      <GridBox>
        <ResourceTypeBox
          icon={VolumeIcon}
          text="Volumes"
          navigate={() => navigation.volumesList(config.cluster, config.namespace)}
        />
      </GridBox>
      <GridBox>
        <ResourceTypeBox
          icon={TemplateIcon}
          text="Templates"
          navigate={() => navigation.templatesList(config.cluster)}
        />
      </GridBox>
    </Grid>
  );
}
