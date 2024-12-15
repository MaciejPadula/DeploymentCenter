import { AddValidatorFunction } from "../../../../libs/forms/form-service";
import { ValidatorBuilder } from "../../../../libs/forms/validator-builder";
import { kubernetesNameValidator } from "../../../../shared/validators/kubernetes-name-validator";
import { requiredValidator } from "../../../../shared/validators/required-validator";
import { textValidator } from "../../../../shared/validators/text-validator";
import { LoadBalancerData } from "../models/load-balancer-data";

export function setupLoadBalancerValidationDefinition(
  addValidator: AddValidatorFunction<LoadBalancerData>
) {
  addValidator(
    "applicationName",
    new ValidatorBuilder<LoadBalancerData>()
      .withValidation((data) => requiredValidator(data.applicationName))
      .withValidation((data) => textValidator(data.applicationName))
      .withValidation((data) => kubernetesNameValidator(data.applicationName))
      .build()
  );

  addValidator(
    "namespace",
    new ValidatorBuilder<LoadBalancerData>()
      .withValidation((data) => requiredValidator(data.namespace))
      .build()
  );

  addValidator(
    "name",
    new ValidatorBuilder<LoadBalancerData>()
      .withValidation((data) => requiredValidator(data.name))
      .withValidation((data) => textValidator(data.name))
      .withValidation((data) => kubernetesNameValidator(data.name))
      .build()
  );
}
