import { AddValidatorFunction } from "../../../../libs/forms/form-service";
import { ValidatorBuilder } from "../../../../libs/forms/validator-builder";
import { greaterThanValidator } from "../../../../shared/validators/greater-than-validator";
import { kubernetesNameValidator } from "../../../../shared/validators/kubernetes-name-validator";
import { numberValidator } from "../../../../shared/validators/number-validator";
import { requiredValidator } from "../../../../shared/validators/required-validator";
import { textValidator } from "../../../../shared/validators/text-validator";
import { VolumeData } from "../models/volume-data";

export function setupVolumeValidationDefinition(
  addValidator: AddValidatorFunction<VolumeData>
) {
  addValidator(
    "volumeName",
    new ValidatorBuilder<VolumeData>()
      .withValidation((data) => requiredValidator(data.volumeName))
      .withValidation((data) => textValidator(data.volumeName))
      .withValidation((data) => kubernetesNameValidator(data.volumeName))
      .build()
  );

  addValidator(
    "volumePath",
    new ValidatorBuilder<VolumeData>()
      .withValidation((data) => requiredValidator(data.volumePath))
      .build()
  );

  addValidator(
    "capacityInKibiBytes",
    new ValidatorBuilder<VolumeData>()
      .withValidation((data) => requiredValidator(data.capacityInKibiBytes))
      .withValidation((data) => numberValidator(data.capacityInKibiBytes))
      .withValidation((data) =>
        greaterThanValidator(data.capacityInKibiBytes ?? 0, 0)
      )
      .build()
  );
}
