import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import {
  DeploymentData,
  getEmptyDeploymentData,
} from "./models/deployment-data";
import { Cluster } from "../../shared/models/cluster";
import { DeploymentForm } from "./components/DeploymentForm";
import { setupDeploymentValidationDefinition } from "./validators/create-deployment-definition";
import useDeploymentFormDataService from "./services/deployment-form-data-service";

type Props = {
  cluster: Cluster;
};

export function CreateDeploymentPage(props: Props) {
  const storageKey = "deploymentData";
  const formDataService = useDeploymentFormDataService(props.cluster);
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
    setupDeploymentValidationDefinition(addValidator);
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
      <DeploymentForm
        cluster={props.cluster}
        value={currentValue}
        updater={updateData}
        validationResults={validationResult}
      />
    </CreateResourceForm>
  );
}
