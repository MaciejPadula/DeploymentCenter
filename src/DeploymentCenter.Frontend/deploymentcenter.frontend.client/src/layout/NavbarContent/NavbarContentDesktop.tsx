import { Grid2 as Grid } from "@mui/material";
import { Cluster } from "../../shared/models/cluster";
import { SearchResourcesInput } from "../../features/search/SearchResourcesInput";
import { SelectNamespaceDialog } from "../../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { AppLogo } from "./AppLogo";

export function NavbarContentDesktop(props: { cluster: Cluster | undefined }) {
  return (
    <Grid container className="w-full">
      <Grid className="self-center pr-8">
        <AppLogo />
      </Grid>


      <Grid className={'self-center'} size="grow">
        {props.cluster && <SearchResourcesInput cluster={props.cluster} />}
      </Grid>

      <Grid className="self-center pl-8">
        <SelectNamespaceDialog />
      </Grid>
    </Grid>
  );
}