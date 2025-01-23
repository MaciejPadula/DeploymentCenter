import { useEffect, useRef } from "react";
import { Cluster } from "../../shared/models/cluster";
import { useSearchService } from "./service/search-service";
import { useQuery } from "@tanstack/react-query";
import { FormControl, Input, InputLabel } from "@mui/material";
import { SearchResults } from "./components/SearchResults";
import { useDebounceInput } from "../../shared/hooks/debounce";
import { useAppRouting } from "../../shared/hooks/navigation";
import { InputVariant } from "../../shared/helpers/material-config";
import SearchIcon from '@mui/icons-material/Search';
import { useLocalStorage } from "../../shared/hooks/local-storage";
import { lastElements } from "../../shared/helpers/array-helpers";

type Props = {
  cluster: Cluster;
}

export function SearchResourcesInput(props: Props) {
  const service = useSearchService(props.cluster);
  const navigation = useAppRouting();
  const { value: showResults, setValue: setShowResults } = useDebounceInput(false, 100);
  const { value, setValue } = useDebounceInput<string>("");
  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { value: recentSearches, setValue: setRecentSearches } = useLocalStorage<string[]>('recentSearches', []);

  function setLastSearches(search: string) {
    const oldPart = recentSearches.filter(x => x !== search);
    setRecentSearches(lastElements([...oldPart, search], 10));
  }

  const { data: queryResult, isLoading, refetch } = useQuery({
    queryKey: ["search", value, props.cluster.name],
    queryFn: async () => {
      if (value.length === 0) {
        return { resources: [] };
      }

      const response = await service.search(value);
      setLastSearches(value);
      return response;
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function setInput(val: string) {
    setValue(val);
    if (inputRef.current) {
      inputRef.current.value = val;
    }
  }

  return (
    <div className="w-full relative py-2">
      <FormControl
        className="w-full"
        variant={InputVariant}
      >
        <InputLabel>Search</InputLabel>
        <Input
          inputRef={inputRef}
          className="w-full"
          onChange={e => setValue(e.target.value)}
          autoComplete={'off'}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          endAdornment={<div className="p-2"><SearchIcon /></div>}
        />
      </FormControl>

      {
        showResults && <SearchResults
          query={value}
          resources={queryResult?.resources ?? []}
          recentSearches={recentSearches}
          isLoading={isLoading}
          cluster={props.cluster}
          width={parentRef.current?.clientWidth}
          onResourceClicked={(resource) => {
            setInput('');
            navigation.navigateToUrl(resource.url);
          }}
          onRecentSearchClicked={async (search) => {
            setInput(search);
            focusInput();
          }}
          onRemoveSearchClicked={async (search) => {
            setRecentSearches(recentSearches.filter(x => x !== search));
            focusInput();
          }}
        />
      }

    </div>
  );
}