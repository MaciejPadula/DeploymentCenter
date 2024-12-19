import { clearLocalStorageItem } from "../../helpers/local-storage-helper";
import { Button, CircularProgress, Typography } from "@mui/material";
import { ErrorBadge } from "../error/error-badge/ErrorBadge";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function CreateResourceForm(props: {
  resourceTitle: string;
  storageKey?: string;
  isValid: boolean;
  onSubmit: () => Promise<void>;
  resetForm: () => void;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function submit() {
    try {
      setIsLoading(true);
      await props.onSubmit();
      if (props.storageKey) {
        clearLocalStorageItem(props.storageKey);
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  const { mutateAsync, isError, error } = useMutation<void, Error>({
    mutationFn: submit,
  });

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      {isError && error.message.length > 0 && <ErrorBadge>{error.message}</ErrorBadge>}
      <Typography variant="h6">{props.resourceTitle}</Typography>
      {props.children}
      <div className="flex justify-end">
        <Button onClick={props.resetForm}>Reset</Button>
        <Button
          variant="contained"
          onClick={() => mutateAsync()}
          disabled={!props.isValid || isLoading}
        >
          { isLoading && <CircularProgress size={20} className="mr-2" /> }
          <span>
            Submit
          </span>
        </Button>
      </div>
    </div>
  );
}
