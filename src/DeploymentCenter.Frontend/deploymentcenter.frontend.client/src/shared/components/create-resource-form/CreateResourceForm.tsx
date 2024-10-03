import { clearLocalStorageItem } from "../../helpers/local-storage-helper";
import { Button, Typography } from "@mui/material";

export function CreateResourceForm(props: {
  resourceTitle: string;
  storageKey: string;
  isValid: boolean;
  onSubmit: () => void;
  resetForm: () => void;
  children: React.ReactNode;
}) {
  function submit() {
    props.onSubmit();
    clearLocalStorageItem(props.storageKey);
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
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
