import { useMutation } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

import './AnalyzeDialogContent.css';
import { Cluster } from "../../../../shared/models/cluster";
import useDeploymentPageDataService from "../../deployment-page-data-service";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { ErrorBadge } from "../../../../shared/components/error/error-badge/ErrorBadge";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

const markdownPlaceholder = `
## Deployment Assistant

There will be a lot of information here.
`;

export function AnalyzeDialogContent(props: Props) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const [question, setQuestion] = useState<string>('');
  const { mutateAsync, data, error, isPending } = useMutation({
    mutationFn: async () =>
      await dataService.analyzeDeployment(
        props.namespace,
        props.deploymentName,
        question
      )
  });

  return <>
    <div className="flex items-center flex-col w-full">
      <div className="flex flex-row w-full">
        <TextField
          className="w-full"
          variant={InputVariant}
          label="Question (optional)"
          onChange={(e) => setQuestion(e.target.value)}
          multiline
        />
        <Button onClick={() => mutateAsync()} variant="contained">Ask</Button>
      </div>
      {isPending && <CircularProgress size={60} />}
      {error && <ErrorBadge>{error.message}</ErrorBadge>}
    </div>
    <div className="overflow-y-auto" style={{ maxHeight: '40dvh' }}>
      {!isPending && <Markdown className={'w-full text-wrap markdown-container'}>{data?.result ?? markdownPlaceholder}</Markdown>}
    </div>
  </>
}