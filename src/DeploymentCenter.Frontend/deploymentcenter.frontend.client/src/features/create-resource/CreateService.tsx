import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import useApplicationFormDataService from "./form-data-service";
import { SetupService } from "./setup-service/SetupService";
import { ServiceData, getEmptyServiceData } from "./setup-service/service-data";

export function CreateService() {
  const storageKey = "deploymentData";
  const apiUrl = selectedClusterApiUrl.value;
  const formDatService = useApplicationFormDataService(apiUrl);
  const navigation = useAppRouting();
  const { currentValue, updateData, resetData, isValid } = useFormService<ServiceData>(
    storageKey,
    getEmptyServiceData
  );

  async function submit() {
    await formDatService.createLoadBalancer(currentValue);
    navigation.mainPage();
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Service"
      storageKey={storageKey}
      onSubmit={submit}
      isValid={isValid}
      resetForm={resetData}
    >
      <SetupService value={currentValue} updater={updateData} />
    </CreateResourceForm>
  );
}
