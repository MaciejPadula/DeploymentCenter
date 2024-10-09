import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import { selectedCluster } from "../../shared/services/configuration-service";
import useApplicationFormDataService from "./form-data-service";
import { SetupLoadBalancer } from "./setup-load-balancer/SetupLoadBalancer";
import {
  LoadBalancerData,
  getEmptyLoadBalancerData,
} from "./setup-load-balancer/load-balancer-data";
import { ValidatorBuilder } from "../../libs/forms/validator-builder";
import { requiredValidator } from "../../shared/validators/required-validator";
import { kubernetesNameValidator } from "./validators/kubernetes-name-validator";
import { textValidator } from "../../shared/validators/text-validator";

export function CreateLoadBalancer() {
  const storageKey = "loadBalancerData";
  const cluster = selectedCluster.value;
  const formDatService = useApplicationFormDataService(cluster);
  const navigation = useAppRouting();
  const {
    currentValue,
    updateData,
    resetData,
    isValid,
    validationResult,
    addValidator,
    revalidate,
  } = useFormService<LoadBalancerData>(storageKey, getEmptyLoadBalancerData);

  useEffect(() => {
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

    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit() {
    await formDatService.createLoadBalancer(currentValue);
    navigation.mainPage();
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Load Balancer"
      storageKey={storageKey}
      onSubmit={submit}
      isValid={isValid}
      resetForm={resetData}
    >
      <SetupLoadBalancer
        value={currentValue}
        updater={updateData}
        validationResults={validationResult}
      />
    </CreateResourceForm>
  );
}
