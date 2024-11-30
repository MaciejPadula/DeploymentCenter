import { useEffect } from "react";
import { useFormService } from "../../libs/forms/form-service";
import { CreateResourceForm } from "../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../shared/hooks/navigation";
import {
  LoadBalancerData,
  getEmptyLoadBalancerData,
} from "./models/load-balancer-data";
import { Cluster } from "../../shared/models/cluster";
import { setupLoadBalancerValidationDefinition } from "./validators/create-service-definition";
import { LoadBalancerForm } from "./components/LoadBalancerForm";
import useLoadBalancerFormDataService from "./services/load-balancer-form-data-service";

type Props = {
  cluster: Cluster;
};

export function CreateLoadBalancerPage(props: Props) {
  const storageKey = "loadBalancerData";
  const formDatService = useLoadBalancerFormDataService(props.cluster);
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

  async function submit() {
    await formDatService?.createLoadBalancer(currentValue);
    navigation.loadBalancerPage(props.cluster.name, currentValue.namespace, currentValue.name);
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
