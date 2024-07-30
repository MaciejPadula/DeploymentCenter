import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import useApplicationFormDataService from "./form-data-service";
import { SetupService } from "./setup-service/SetupService";
import { ServiceData, getEmptyServiceData } from "./setup-service/service-data";

export function CreateService() {
  const apiUrl = selectedClusterApiUrl.value;
  const formDatService = useApplicationFormDataService(apiUrl);
  const navigation = useAppRouting();

  async function submit(data: ServiceData) {
    await formDatService.createLoadBalancer(data);
    navigation.mainPage();
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Service"
      storageKey="serviceData"
      defaultValueFactory={getEmptyServiceData}
      onSubmit={submit}
      childrenFactory={(defaultValue, updater) => {
        return <SetupService value={defaultValue} updater={updater} />;
      }}
    ></CreateResourceForm>
  );
}
