import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelectNamespaceDataService } from "./select-namespace-data-service";
import { useEffect, useState } from "react";
import { InputVariant } from "../../helpers/material-config";

export function SelectNamespace(props: {
  defaultNamespace: string;
  apiUrl: string;
  onNamespaceChanged: (namespace: string) => void;
}) {
  const dataService = useSelectNamespaceDataService(props.apiUrl);
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["namespaceLoader"],
    queryFn: async () => await dataService.getNamespaces(),
  });
  const [namespace, setNamespace] = useState<string>(props.defaultNamespace);

  const isLoading = isPending || isFetching || data == undefined;

  useEffect(() => {
    refetch();
  }, [props.apiUrl, refetch]);

  if (error) {
    return <div>Error</div>;
  }

  function handleNamespaceChange(namespace: string) {
    props.onNamespaceChanged(namespace);
    setNamespace(namespace);
  }

  return (
    <div className="w-full">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <FormControl className="w-full" variant={InputVariant}>
          <InputLabel>Namespace</InputLabel>
          <Select
            value={namespace}
            onChange={(e) => handleNamespaceChange(e.target.value)}
          >
            {data.map((x) => (
              <MenuItem key={x.name} value={x.name}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
