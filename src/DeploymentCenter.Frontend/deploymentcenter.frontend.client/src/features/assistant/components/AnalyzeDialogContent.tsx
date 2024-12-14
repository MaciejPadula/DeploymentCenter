import { useState } from "react";
import { Cluster } from "../../../shared/models/cluster";
import { useMutation } from "@tanstack/react-query";
import { Button, CircularProgress, TextField } from "@mui/material";
import { InputVariant } from "../../../shared/helpers/material-config";
import { ErrorBadge } from "../../../shared/components/error/error-badge/ErrorBadge";
import Markdown from "react-markdown";

type Props = {
  cluster: Cluster;
  analyzeQuery: (question: string) => Promise<string | null>;
};

export function AnalyzeDialogContent(props: Props) {
  const [question, setQuestion] = useState<string>("");
  const { mutateAsync, data, error, isPending } = useMutation({
    mutationFn: async () => await props.analyzeQuery(question),
  });

  const disabled = isPending;

  return (
    <>
      <div className="flex items-center flex-col w-full">
        <div className="flex flex-row w-full">
          {error && <ErrorBadge>{error.message}</ErrorBadge>}
          <TextField
            className="w-full"
            variant={InputVariant}
            label="Question"
            onChange={(e) => setQuestion(e.target.value)}
            multiline
            disabled={disabled}
          />
          <Button
            onClick={() => mutateAsync()}
            variant="contained"
            disabled={disabled}
          >
            Ask
          </Button>
        </div>
        {isPending && (
          <div className={"flex items-center justify-center p-20"}>
            <CircularProgress size={60} />
          </div>
        )}
      </div>
      <div className="overflow-y-auto">
        {!isPending && (
          <Markdown className={"w-full text-wrap markdown-container"}>
            {data}
          </Markdown>
        )}
      </div>
    </>
  );
}
