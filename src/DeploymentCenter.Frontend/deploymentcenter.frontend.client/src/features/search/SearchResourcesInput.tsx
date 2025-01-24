import { useRef } from "react";
import { Cluster } from "../../shared/models/cluster";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { SearchPanel } from "./components/SearchPanel";
import { useDebounceInput } from "../../shared/hooks/debounce";
import { useAppRouting } from "../../shared/hooks/navigation";
import SearchIcon from '@mui/icons-material/Search';
import { useLocalStorage } from "../../shared/hooks/local-storage";
import { lastElements } from "../../shared/helpers/array-helpers";

type Props = {
  cluster: Cluster;
}

export function SearchResourcesInput(props: Props) {
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
      <FormControl className="w-full">
        <InputLabel>Search</InputLabel>
        <OutlinedInput
          inputRef={inputRef}
          className="w-full"
          label="Search"
          onChange={e => setValue(e.target.value)}
          autoComplete={'off'}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          endAdornment={<div className="p-2"><SearchIcon /></div>}
        />
      </FormControl>

      {
        showResults && <SearchPanel
          query={value}
          recentSearches={recentSearches}
          cluster={props.cluster}
          width={parentRef.current?.clientWidth}
          onSearchExecuted={query => setLastSearches(query)}
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