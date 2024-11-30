import { useState } from "react";
import { clearLocalStorageItem } from "../../helpers/local-storage-helper";
import { Button, Typography } from "@mui/material";
import { ErrorBadge } from "../error/error-badge/ErrorBadge";

export function CreateResourceForm(props: {
  resourceTitle: string;
  storageKey: string;
  isValid: boolean;
  onSubmit: () => Promise<void>;
  resetForm: () => void;
  children: React.ReactNode;
}) {
  const [currentError, setCurrentError] = useState<string | null>(null);

  async function submit() {
    try {
      await props.onSubmit();
      clearLocalStorageItem(props.storageKey);
    } catch (error) {
      if (error instanceof Error) {
        setCurrentError("Internal Server Error");
        return;
      }
    }
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      {currentError && <ErrorBadge>{currentError}</ErrorBadge>}
      <Typography variant="h6">{props.resourceTitle}</Typography>
      {props.children}
      <div className="flex justify-end">
        <Button onClick={props.resetForm}>
          Reset
        </Button>
        <Button variant="contained" onClick={submit} disabled={!props.isValid}>
          Submit
        </Button>
      </div>
    </div>
  );
}
