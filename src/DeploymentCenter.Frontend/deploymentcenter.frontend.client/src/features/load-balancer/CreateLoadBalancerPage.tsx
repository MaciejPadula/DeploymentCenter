import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import {
  LoadBalancerData,
  getEmptyLoadBalancerData,
} from "./create-load-balancer/models/load-balancer-data";
import { Cluster } from "../../shared/models/cluster";
import { setupLoadBalancerValidationDefinition } from "./create-load-balancer/validators/create-service-definition";
import { LoadBalancerForm } from "./create-load-balancer/components/LoadBalancerForm";
import { AxiosError } from "axios";
import useLoadBalancersDataService from "./services/load-balancers-data-service";

type Props = {
  cluster: Cluster;
};

export function CreateLoadBalancerPage(props: Props) {
  const storageKey = "loadBalancerData";
  const formDatService = useLoadBalancersDataService(props.cluster);
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
    setupLoadBalancerValidationDefinition(addValidator);
    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mapError(error: AxiosError): Error {
    const errorCode: number = (error.response?.data as { code: number })?.code;

    if (errorCode == 1) {
      return new Error("Duplicate load balancer name");
    }

    if (errorCode == 2) {
      return new Error("Ports are required");
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
      await formDatService.createLoadBalancer(currentValue);
      navigation.loadBalancerPage(props.cluster.name, currentValue.namespace, currentValue.name);
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <CreateResourceForm
      resourceTitle="Creating Load Balancer"
      storageKey={storageKey}
      onSubmit={submit}
      isValid={isValid}
      resetForm={resetData}
    >
      <LoadBalancerForm
        cluster={props.cluster}
        value={currentValue}
        updater={updateData}
        validationResults={validationResult}
      />
    </CreateResourceForm>
  );
}
