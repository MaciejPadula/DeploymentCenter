import { Cluster } from "../../shared/models/cluster";
import { SelectNamespaceDialog } from "../../shared/components/select-connection-settings-dialog/SelectConnectionSettings";
import { SearchResourcesInput } from "../../features/search/SearchResourcesInput";
import { AppLogo } from "./AppLogo";

export function NavbarContentMobile(props: { cluster: Cluster | undefined }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <AppLogo />
        <SelectNamespaceDialog />
      </div>
      {props.cluster && <SearchResourcesInput cluster={props.cluster} />}
    </div>
  );
}