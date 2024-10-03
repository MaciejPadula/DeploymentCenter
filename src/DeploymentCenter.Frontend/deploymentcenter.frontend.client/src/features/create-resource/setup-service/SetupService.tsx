import { SelectNamespace } from "../../../shared/components/select-namespaces/SelectNamespace";
import { InputVariant } from "../../../shared/helpers/material-config";
import { selectedClusterApiUrl } from "../../../shared/services/configuration-service";
import { UpdaterFunction } from "../shared";
import { ServiceData } from "./service-data";
import { Unstable_Grid2 as Grid, TextField } from "@mui/material";

export function SetupService(props: {
  value: ServiceData;
  updater: UpdaterFunction<ServiceData>;
}) {
  const apiUrl = selectedClusterApiUrl.value;

  if (apiUrl === undefined) {
    return <div>Error</div>;
  }
  
  function setApplicationName(name: string) {
    props.updater((data) => (data.applicationName = name));
  }

  function setNamespace(namespace: string) {
    props.updater((data) => (data.namespace = namespace));
  }

  function setName(name: string) {
    props.updater((data) => (data.name = name));
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Application Name"
            defaultValue={props.value.applicationName}
            onBlur={(e) => setApplicationName(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <SelectNamespace
            defaultNamespace={props.value.namespace}
            apiUrl={apiUrl}
            onNamespaceChanged={setNamespace}
          />
        </Grid>

        <Grid sm={4} xs={12}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Deployment Name"
            defaultValue={props.value.name}
            onBlur={(e) => setName(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}
