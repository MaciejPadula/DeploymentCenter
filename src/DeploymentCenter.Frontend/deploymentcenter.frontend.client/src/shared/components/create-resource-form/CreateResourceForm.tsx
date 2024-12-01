import { clearLocalStorageItem } from "../../helpers/local-storage-helper";
import { Button, Typography } from "@mui/material";
import { ErrorBadge } from "../error/error-badge/ErrorBadge";
import { useMutation } from "@tanstack/react-query";

export function CreateResourceForm(props: {
  resourceTitle: string;
  storageKey: string;
  isValid: boolean;
  onSubmit: () => Promise<void>;
  resetForm: () => void;
  children: React.ReactNode;
}) {
  async function submit() {
    await props.onSubmit();
    clearLocalStorageItem(props.storageKey);
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
          disabled={!props.isValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
