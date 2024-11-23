import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import useApplicationFormDataService from "./form-data-service";
import { SetupDeployment } from "./setup-deployment/SetupDeployment";
import {
  DeploymentData,
  getEmptyDeploymentData,
} from "./setup-deployment/deployment-data";
import { containersValidator } from "./setup-deployment/validators/containers-validator";
import { ValidatorBuilder } from "../../libs/forms/validator-builder";
import { requiredValidator } from "../../shared/validators/required-validator";
import { kubernetesNameValidator } from "./validators/kubernetes-name-validator";
import { textValidator } from "../../shared/validators/text-validator";
import { greaterThanValidator } from "../../shared/validators/greater-than-validator";
import { numberValidator } from "../../shared/validators/number-validator";
import { Cluster } from "../../shared/models/cluster";

type Props = {
  cluster: Cluster;
};

export function CreateDeployment(props: Props) {
  const storageKey = "deploymentData";
  const formDataService = useApplicationFormDataService(props.cluster);
  const navigation = useAppRouting();
  const {
    currentValue,
    revalidate,
    addValidator,
    updateData,
    resetData,
    isValid,
    validationResult,
  } = useFormService<DeploymentData>(storageKey, getEmptyDeploymentData);

  useEffect(() => {
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
        .withValidation((data) => greaterThanValidator(data.replicas ?? 0, 0))
        .build()
    );

    addValidator("containers", containersValidator);

    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit() {
    await formDataService?.createDeployment(currentValue);
    navigation.deploymentPage(props.cluster.name, currentValue.namespace, currentValue.name);
  }

  function reset() {
    resetData();
    navigation.reloadPage();
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Deployment"
      storageKey={storageKey}
      onSubmit={submit}
      isValid={isValid}
      resetForm={reset}
    >
      <SetupDeployment
        cluster={props.cluster}
        value={currentValue}
        updater={updateData}
        validationResults={validationResult}
      />
    </CreateResourceForm>
  );
}
