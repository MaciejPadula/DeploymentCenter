import { Grid2 as Grid, TextField } from "@mui/material";
import { UpdaterFunction } from "../../../../shared/helpers/function-helpers";
import { Cluster } from "../../../../shared/models/cluster";
import { ValidationResult } from "../../../../shared/models/validation-result";
import { VolumeData } from "../models/volume-data";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { useState } from "react";

type Props = {
  cluster: Cluster;
  value: VolumeData;
  updater: UpdaterFunction<VolumeData>;
  validationResults: Map<string, ValidationResult>;
};

export function VolumeForm(props: Props) {
  const volumeNameError = props.validationResults.get("volumeName");
  const [volumeNameTouched, setVolumeNameTouched] = useState(false);
  const volumePathError = props.validationResults.get("volumePath");
  const [volumePathTouched, setVolumePathTouched] = useState(false);
  const capacityInKibiBytesError = props.validationResults.get(
    "capacityInKibiBytes"
  );
  const [capacityInKibiBytesTouched, setCapacityInKibiBytesTouched] =
    useState(false);

  function isError(result: ValidationResult | undefined) {
    return result?.isValid === false;
  }

  function setVolumeName(name: string) {
    props.updater((data) => (data.volumeName = name));
    setVolumeNameTouched(true);
  }

  function setVolumePath(path: string) {
    props.updater((data) => (data.volumePath = path));
    setVolumePathTouched(true);
  }

  function setCapacityInKibiBytes(capacity: string) {
    props.updater((data) => (data.capacityInKibiBytes = Number(capacity)));
    setCapacityInKibiBytesTouched(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Volune Name"
            defaultValue={props.value.volumeName}
            onBlur={(e) => setVolumeName(e.target.value)}
            error={volumeNameTouched && isError(volumeNameError)}
            helperText={
              volumeNameTouched ? volumeNameError?.message : undefined
            }
          />
        </Grid>

        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Host Path"
            defaultValue={props.value.volumePath}
            onBlur={(e) => setVolumePath(e.target.value)}
            error={volumePathTouched && isError(volumePathError)}
            helperText={
              volumePathTouched ? volumePathError?.message : undefined
            }
          />
        </Grid>

        <Grid size={{ sm: 4, xs: 12 }}>
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Capacity [KiB]"
            defaultValue={props.value.capacityInKibiBytes}
            onBlur={(e) => setCapacityInKibiBytes(e.target.value)}
            error={
              capacityInKibiBytesTouched && isError(capacityInKibiBytesError)
            }
            helperText={
              capacityInKibiBytesTouched
                ? capacityInKibiBytesError?.message
                : undefined
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
