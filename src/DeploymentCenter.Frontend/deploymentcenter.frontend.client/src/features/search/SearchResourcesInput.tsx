import { useEffect, useRef, useState } from "react";
import { Cluster } from "../../shared/models/cluster";
import { useSearchService } from "./service/search-service";
import { useQuery } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { SearchResults } from "./components/SearchResults";
import { useDebounceInput } from "../../shared/hooks/debounce";
import { useAppRouting } from "../../shared/hooks/navigation";

type Props = {
  cluster: Cluster;
}

export function SearchResourcesInput(props: Props) {
  const service = useSearchService(props.cluster);
  const navigation = useAppRouting();
  const [showResults, setShowResults] = useState(false);
  const { value, setValue } = useDebounceInput<string>("");
  const parentRef = useRef<HTMLInputElement>(null);
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
    <div className="w-full relative">
      <TextField
        ref={parentRef}
        className="w-full"
        onChange={e => setValue(e.target.value)}
        onFocus={() => setShowResults(true)}
        placeholder="Search resources"
        autoComplete={'off'}
      />
      {
        showResults && (
          <SearchResults
            resources={queryResult?.resources ?? []}
            isLoading={isLoading}
            cluster={props.cluster}
            width={parentRef.current?.clientWidth}
            onResourceClicked={(resource) => {
              setShowResults(false);
              navigation.navigateToUrl(resource.url);
            }}
          />
        )
      }

    </div>
  );
}