import { useEffect, useState } from "react";

export function ResourcesList() {
  const [resources, setResources] = useState<string[]>([]);

  useEffect(() => {
    setResources(["resource 1", "resource 2", "resource 3"]);
  }, []);

  return (
    <div>
      <h1>ResourcesList</h1>
      {resources.map(resource => <div key={resource}>{resource}</div>)}
    </div>
  );
}