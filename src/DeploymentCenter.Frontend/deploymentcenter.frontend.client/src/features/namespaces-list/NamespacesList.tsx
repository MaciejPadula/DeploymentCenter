import { useSelectNamespaceDataService } from "../../shared/components/select-namespaces/select-namespace-data-service";
import { ResourceRowModel, ResourcesFactory } from "../../shared/components/resources-list/resource-row-model";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { NamespaceIcon } from "../../assets/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { InputVariant } from "../../shared/helpers/material-config";
import { useQuery } from "@tanstack/react-query";
import { DeleteResource } from "../../shared/components/delete-resource/DeleteResource";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cluster } from "../../shared/models/cluster";

type Props = {
  cluster: Cluster;
}

export function NamespacesList(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [namespaceName, setNamespaceName] = useState<string>('');
  const dataService = useSelectNamespaceDataService(props.cluster);

  const factory: ResourcesFactory = async () => {
    const response = await dataService?.getNamespaces();
    return response?.map(
      (x) =>
      ({
        name: x.name,
        icon: NamespaceIcon,
        action:
          <DeleteResource
            resourceName={x.name}
            onDelete={() => removeNamespace(x.name)}
          >
            <IconButton>
              <DeleteIcon className="text-red-700" />
            </IconButton>
          </DeleteResource>
      } as ResourceRowModel)
    ) ?? [];
  };

  const { refetch } = useQuery({
    queryKey: [`NamespacesLoader_${props.cluster.name}`],
    queryFn: factory
  });

  async function removeNamespace(name: string) {
    await dataService?.removeNamespace(name);
    await refetch();
  }

  const disabled = useMemo(() => {
    return namespaceName.length === 0;
  }, [namespaceName]);

  async function createNamespace() {
    await dataService.createNamespace(namespaceName);
    await refetch();
  }

  function openDialog() {
    setOpen(true);
  }

  function handleSave() {
    createNamespace();
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return <>
    <ResourcesList
      resourceKey={`Namespaces-${props.cluster.name}`}
      resourceText="Namespaces"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new namespace",
        clickHandler: () => openDialog(),
      }}
    />
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter your new namespace name</DialogTitle>
      <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <TextField
            label="Namespace Name"
            variant={InputVariant}
            onBlur={(v) => setNamespaceName(v.currentTarget.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handleSave} disabled={disabled}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}