import { UpdaterFunction } from "../../../../shared/helpers/function-helpers";
import { Cluster } from "../../../../shared/models/cluster";
import { ValidationResult } from "../../../../shared/models/validation-result";
import { VolumeData } from "../models/volume-data";

type Props = {
  cluster: Cluster;
  value: VolumeData;
  updater: UpdaterFunction<VolumeData>;
  validationResults: Map<string, ValidationResult>;
};

export function VolumeForm(props: Props) {
  return <></>;
}
