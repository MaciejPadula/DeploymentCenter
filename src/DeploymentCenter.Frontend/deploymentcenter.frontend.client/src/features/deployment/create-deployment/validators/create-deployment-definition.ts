import { containersValidator } from "./containers-validator";
import { DeploymentData } from "../models/deployment-data";
import { requiredValidator } from "../../../../shared/validators/required-validator";
import { ValidatorBuilder } from "../../../../libs/forms/validator-builder";
import { AddValidatorFunction } from "../../../../libs/forms/form-service";
import { textValidator } from "../../../../shared/validators/text-validator";
import { kubernetesNameValidator } from "../../../../shared/validators/kubernetes-name-validator";
import { numberValidator } from "../../../../shared/validators/number-validator";
import { greaterThanValidator } from "../../../../shared/validators/greater-than-validator";

export function setupDeploymentValidationDefinition(
  addValidator: AddValidatorFunction<DeploymentData>
) {
  addValidator(
    "applicationName",
    new ValidatorBuilder<DeploymentData>()
      .withValidation((data) => requiredValidator(data.applicationName))
      .withValidation((data) => textValidator(data.applicationName))
      .withValidation((data) => kubernetesNameValidator(data.applicationName))
      .build()
  );

  addValidator(
    "namespace",
    new ValidatorBuilder<DeploymentData>()
      .withValidation((data) => requiredValidator(data.namespace))
      .build()
  );

  addValidator(
    "name",
    new ValidatorBuilder<DeploymentData>()
      .withValidation((data) => requiredValidator(data.name))
      .withValidation((data) => textValidator(data.name))
      .withValidation((data) => kubernetesNameValidator(data.name))
      .build()
  );

  addValidator(
    "replicas",
    new ValidatorBuilder<DeploymentData>()
      .withValidation((data) => requiredValidator(data.replicas))
      .withValidation((data) => numberValidator(data.replicas))
      .withValidation((data) => greaterThanValidator(data.replicas ?? 0, -1))
      .build()
  );

  addValidator("containers", containersValidator);
}
