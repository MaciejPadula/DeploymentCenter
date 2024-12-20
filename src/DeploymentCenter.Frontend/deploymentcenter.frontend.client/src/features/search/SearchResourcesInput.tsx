import { useEffect, useRef, useState } from "react";
import { Cluster } from "../../shared/models/cluster";
import { useSearchService } from "./service/search-service";
import { useQuery } from "@tanstack/react-query";
import { FormControl, Input, InputLabel } from "@mui/material";
import { SearchResults } from "./components/SearchResults";
import { useDebounceInput } from "../../shared/hooks/debounce";
import { useAppRouting } from "../../shared/hooks/navigation";
import { InputVariant } from "../../shared/helpers/material-config";
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  cluster: Cluster;
}

export function SearchResourcesInput(props: Props) {
  const service = useSearchService(props.cluster);
  const navigation = useAppRouting();
  const [showResults, setShowResults] = useState(false);
  const { value, setValue } = useDebounceInput<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: queryResult, isLoading, refetch } = useQuery({
    queryKey: ["search", value],
    queryFn: async () => {
      if (value.length === 0) {
        return { resources: [] };
      }

      return await service.search(value);
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="w-full relative py-2">
      <FormControl
        className="w-full"
        variant={InputVariant}
      >
        <InputLabel>Search</InputLabel>
        <Input
          ref={inputRef}
          className="w-full"
          onChange={e => setValue(e.target.value)}
          autoComplete={'off'}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          endAdornment={<div className="p-2"><SearchIcon /></div>}
        />
      </FormControl>

      <SearchResults
        isParentFocused={showResults}
        resources={queryResult?.resources ?? []}
        isLoading={isLoading}
        cluster={props.cluster}
        width={inputRef.current?.clientWidth}
        onResourceClicked={(resource) => {
          setShowResults(false);
          navigation.navigateToUrl(resource.url);
        }}
      />
    </div>
  );
}