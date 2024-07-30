import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import useApplicationFormDataService from "./form-data-service";
import { SetupDeployment } from "./setup-deployment/SetupDeployment";
import { DeploymentData, getEmptyDeploymentData } from "./setup-deployment/deployment-data";

export function CreateDeployment() {
  const apiUrl = selectedClusterApiUrl.value;
  const formDatService = useApplicationFormDataService(apiUrl);
  const navigation = useAppRouting();

  async function submit(deploymentData: DeploymentData) {
    await formDatService.createDeployment(deploymentData);
    navigation.mainPage();
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Deployment"
      storageKey="deploymentData"
      defaultValueFactory={getEmptyDeploymentData}
      onSubmit={submit}
      childrenFactory={(defaultValue, updater) => {
        return <SetupDeployment value={defaultValue} updater={updater} />;
      }}
    ></CreateResourceForm>
  );
}
