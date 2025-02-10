import { useParams } from "react-router-dom";
import { Cluster } from "../../shared/models/cluster";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { PodsCharts } from "./components/PodsCharts";

type Props = {
  cluster: Cluster;
};

export function MetricsPage(props: Props) {
  const { namespace } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState<string | undefined>(undefined);

  if (!namespace) {
    return <NotFound />;
  }

  function updateFilter(item: string) {
    if (item === filter) {
      item = "";
    }

    if (inputRef.current) {
      inputRef.current.value = item;
      setFilter(item);
    }
  }

  return (
    <div className="flex flex-col w-full p-4">
      <TextField
        label="Filter"
        inputRef={inputRef}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <PodsCharts
          cluster={props.cluster}
          namespace={namespace}
          filter={filter}
          onItemClicked={(item) => updateFilter(item)}
          height={500}
        />
      </div>
    </div>
  );
}
