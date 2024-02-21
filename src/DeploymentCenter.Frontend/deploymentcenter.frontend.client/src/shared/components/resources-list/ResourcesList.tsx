import { useQuery } from "@tanstack/react-query";

export function ResourcesList(props: { resourceText: string, resourcesFactory: () => Promise<string[]> }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['resourceLoader'],
    queryFn: props.resourcesFactory
  });

  if (isPending || isFetching || data == undefined) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>Error</div>
  }

  return (
    <div>
      <h1>{props.resourceText}</h1>
      {data.map(resource => <div key={resource}>{resource}</div>)}
    </div>
  );
}