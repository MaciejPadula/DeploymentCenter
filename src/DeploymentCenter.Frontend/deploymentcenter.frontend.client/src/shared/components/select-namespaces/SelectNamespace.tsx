import { useQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelectNamespaceDataService } from "./select-namespace-data-service";

export function SelectNamespace(props: {
  namespace: string;
  onNamespaceChanged: (namespace: string) => void;
}) {
  const dataService = useSelectNamespaceDataService();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["namespaceLoader"],
    queryFn: async () => await dataService.getNamespaces(),
  });

  const isLoading = isPending || isFetching || data == undefined;

  if (error) {
    return <div>Error</div>;
  }

  function handleNamespaceChange(namespace: string) {
    props.onNamespaceChanged(namespace);
  }

  return (
    <div className="p-4">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <FormControl variant="standard">
          <InputLabel>Namespace</InputLabel>
          <Select
            value={props.namespace}
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
