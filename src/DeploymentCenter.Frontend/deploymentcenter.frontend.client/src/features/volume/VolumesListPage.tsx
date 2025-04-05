import { Cluster } from "../../shared/models/cluster";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { VolumeIcon } from "../../assets/icons";
import { ResourceRowModel, ResourcesFactory } from "../../shared/components/resources-list/resource-row-model";
import { useAppRouting } from "../../shared/hooks/navigation";
import useVolumesDataService from "./services/volumes-data-service";

type Props = {
  cluster: Cluster;
}

export function VolumesListPage(props: Props) {
  const dataService = useVolumesDataService(props.cluster);
  const navigation = useAppRouting();

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getVolumes();
    return response.map(
      (x) =>
      ({
        clusterName: props.cluster.name,
        name: x.name,
        icon: VolumeIcon,
        secondaryText: <span>{`${props.cluster.name} - ${x.path}`}</span>
      } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey={`Volumes-${props.cluster.name}`}
      resourceText="Volumes"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new volume",
        clickHandler: () => navigation.setupVolume(props.cluster.name),
      }}
    />
  );
}