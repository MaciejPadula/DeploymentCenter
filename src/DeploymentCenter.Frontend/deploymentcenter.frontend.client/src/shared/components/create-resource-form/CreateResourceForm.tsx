import { effect, signal } from "@preact/signals-react";
import {
  clearLocalStorageItem,
  getFromLocalStorage,
  setInLocalStorage,
} from "../../helpers/local-storage-helper";
import { copyObject } from "../../helpers/object-helper";
import { Button, Typography } from "@mui/material";

export function CreateResourceForm<T>(props: {
  resourceTitle: string;
  storageKey: string;
  defaultValueFactory: () => T;
  onSubmit: (value: T) => void;
  childrenFactory: (
    value: T,
    updater: (updaterCallback: (data: T) => void) => void
  ) => React.ReactNode;
}) {
  const currentValue = signal<T>(
    getFromLocalStorage<T>(props.storageKey, props.defaultValueFactory())
  );

  effect(() => {
    setInLocalStorage(props.storageKey, currentValue.value);
  });

  function updateData(updater: (data: T) => void) {
    const newData = copyObject(currentValue.value);
    updater(newData);
    currentValue.value = newData;
  }

  function submit() {
    props.onSubmit(currentValue.value);
    clearLocalStorageItem(props.storageKey);
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Typography variant="h6">{props.resourceTitle}</Typography>
      {props.childrenFactory(currentValue.value, updateData)}
      <Button variant="contained" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
