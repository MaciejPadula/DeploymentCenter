import { useQuery } from "@tanstack/react-query";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useSelectNamespaceDataService } from "./select-namespace-data-service";
import { useEffect, useMemo, useState } from "react";
import { InputVariant } from "../../helpers/material-config";
import { Cluster } from "../../models/cluster";
import Edit from "@mui/icons-material/Edit";
import { useAppRouting } from "../../hooks/navigation";

type Props = {
  defaultNamespace: string;
  cluster: Cluster;
  onNamespaceChanged: (namespace: string) => void;
  onNamespacesEdit?: () => void;
  error?: boolean;
  helperText?: string;
};

export function SelectNamespace(props: Props) {
  const navigation = useAppRouting();
  const dataService = useSelectNamespaceDataService(props.cluster);
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["namespaceLoader", props.cluster.name],
    queryFn: async () => await dataService.getNamespaces(),
  });
  const [namespace, setNamespace] = useState<string>(props.defaultNamespace);

  const isLoading = isPending || isFetching || data == undefined;

  const namespaceExists = useMemo(() => {
    return data && data.filter((x) => x.name == namespace).length > 0;
  }, [data, namespace]);

  useEffect(() => {
    refetch();
  }, [props.cluster, refetch]);

  useEffect(() => {
    if (data && !namespaceExists) {
      props.onNamespaceChanged('');
    }
  }, [data, namespaceExists, props]);

  if (error) {
    return <div>Error</div>;
  }

  function onNamespaceEdit() {
    if (props.onNamespacesEdit) {
      props.onNamespacesEdit();
    }

    navigation.namespacesList(props.cluster.name);
  }

  function handleNamespaceChange(namespace: string) {
    props.onNamespaceChanged(namespace);
    setNamespace(namespace);
  }

  return (
    <div className="w-full">
      {isLoading && (
        <>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </>
      )}
      {!isLoading && (
        <FormControl
          className="w-full"
          variant={InputVariant}
          error={props.error}
        >
          <InputLabel>Namespace</InputLabel>
          <Select
            value={namespaceExists ? namespace : ''}
            onChange={(e) => handleNamespaceChange(e.target.value)}
          >
            {data.map((x) => (
              <MenuItem key={x.name} value={x.name}>
                {x.name}
              </MenuItem>
            ))}
            <MenuItem onClick={onNamespaceEdit} className="flex items-center gap-2">
              <Edit />
              Edit Namespaces
            </MenuItem>
          </Select>
          {props.error && (
            <FormHelperText>{props?.helperText ?? ""}</FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
}
