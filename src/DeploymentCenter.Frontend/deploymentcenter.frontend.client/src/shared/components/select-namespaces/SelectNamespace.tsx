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
import { useEffect, useState } from "react";
import { InputVariant } from "../../helpers/material-config";

export function SelectNamespace(props: {
  defaultNamespace: string;
  apiUrl: string;
  onNamespaceChanged: (namespace: string) => void;
  error?: boolean;
  helperText?: string;
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
            value={namespace}
            onChange={(e) => handleNamespaceChange(e.target.value)}
          >
            {data.map((x) => (
              <MenuItem key={x.name} value={x.name}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
          {props.error && (
            <FormHelperText>{props?.helperText ?? ""}</FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
}
