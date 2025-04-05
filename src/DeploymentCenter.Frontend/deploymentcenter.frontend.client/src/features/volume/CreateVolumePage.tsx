import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { useAppRouting } from "../../shared/hooks/navigation";
import { Cluster } from "../../shared/models/cluster";
import { getEmptyVolumeData, VolumeData } from "./create-volume/models/volume-data";
import { setupVolumeValidationDefinition } from "./create-volume/validators/create-volume-definition";
import useVolumesDataService from "./services/volumes-data-service";
import { AxiosError } from "axios";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { VolumeForm } from "./create-volume/components/VolumeForm";

type Props = {
  cluster: Cluster;
};

export function CreateVolumePage(props: Props) {
    const storageKey = "volumeData";
    const formDataService = useVolumesDataService(props.cluster);
    const navigation = useAppRouting();
    const {
      currentValue,
      revalidate,
      addValidator,
      updateData,
      resetData,
      isValid,
      validationResult,
    } = useFormService<VolumeData>(storageKey, getEmptyVolumeData);
  
    useEffect(() => {
      setupVolumeValidationDefinition(addValidator);
      revalidate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    function mapError(error: AxiosError): Error {
      const errorCode: number = (error.response?.data as { code: number })?.code;
  
      if (errorCode == 1) {
        return new Error("Duplicate volume name");
      }
  
      if (errorCode == 2) {
        return new Error("Replicas count must be greater than 0");
      }
  
      return new Error('');
    }
  
    function handleErrors(error: unknown) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
  
        if (axiosError.response?.status === 400) {
          throw mapError(axiosError);
        }
  
        throw new Error('');
      }
  
      throw error;
    }
  
    async function submit() {
      try {
        await formDataService.createVolume(currentValue);
        navigation.volumesList(props.cluster.name);
      } catch (error) {
        handleErrors(error);
      }
    }
  
    function reset() {
      resetData();
      navigation.reloadPage();
    }
  
    return (
      <CreateResourceForm
        resourceTitle="Creating Volume"
        storageKey={storageKey}
        onSubmit={submit}
        isValid={isValid}
        resetForm={reset}
      >
        <VolumeForm
          cluster={props.cluster}
          value={currentValue}
          updater={updateData}
          validationResults={validationResult}
        />
      </CreateResourceForm>
    );
}