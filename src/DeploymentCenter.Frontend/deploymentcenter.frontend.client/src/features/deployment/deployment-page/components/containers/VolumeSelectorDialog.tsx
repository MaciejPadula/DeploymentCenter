import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Cluster } from "../../../../../shared/models/cluster";
import { useDialog } from "../../../../../shared/hooks/dialog";
import useVolumesDataService from "../../../../volumes-list/volumes-data-service";
import useDeploymentsDataService from "../../../service/deployments-data-service";
import { ErrorBadge } from "../../../../../shared/components/error/error-badge/ErrorBadge";
import { InputVariant } from "../../../../../shared/helpers/material-config";

type Props = {
  cluster: Cluster;
  namespace: string;
  deploymentName: string;
  containerName: string;
}

export function VolumeSelectorDialog(props: Props) {
  const dialog = useDialog();
  const dataService = useVolumesDataService(props.cluster);
  const deploymentService = useDeploymentsDataService(props.cluster);
  const [volumeName, setVolumeName] = useState<string>('');
  const [mountPath, setMountPath] = useState<string>('');

  const disabled = !volumeName || !mountPath

  const { data, isPending, isFetching } = useQuery({
    queryKey: [`Volumes-${props.cluster.name}`],
    queryFn: () =>
      dataService.getVolumes(),
  });
  const { mutateAsync, error: mutateError } = useMutation({
    mutationFn: () => deploymentService.connectToVolume(
      props.namespace,
      props.deploymentName,
      volumeName,
      props.containerName,
      mountPath
    ),
  });

  async function handleSubmit() {
    await mutateAsync();
    dialog.handleClose();
  }

  const isLoading = isPending || isFetching || data == undefined;

  return <>
    <Button onClick={dialog.handleClickOpen}>Connect To Volume</Button>
    <Dialog open={dialog.open} onClose={dialog.handleClose}>
      <DialogTitle>Select Volume to Connect</DialogTitle>
      <DialogContent className="w-full !px-8 !py-4 flex flex-col gap-4" style={{ minWidth: '600px' }}>
        {mutateError && <ErrorBadge>{mutateError.message}</ErrorBadge>}
        {!isLoading && <FormControl
          className="w-full"
          variant={InputVariant}
        >
          <InputLabel>Volume</InputLabel>
          <Select defaultValue={''} onChange={(e) => setVolumeName(e.target.value as string)}>
            {
              data.map((volume) => (
                <MenuItem key={volume.name} value={volume.name}>{volume.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>}
        <TextField
          className="w-full"
          variant={InputVariant}
          label="Mount Path"
          onBlur={(e) => setMountPath(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.handleClose}>Close</Button>
        <Button
          onClick={handleSubmit}
          variant={'contained'}
          disabled={disabled}
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  </>
}