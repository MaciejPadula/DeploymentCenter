import { useEffect, useState } from "react";
import { DoubleInput } from "../double-input/DoubleInput";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteResource } from "../delete-resource/DeleteResource";

type Props<TKey, TValue> = {
  defaultValue: { key: TKey; value: TValue }[];
  onChange?: (value: { key: TKey; value: TValue }[]) => void;
};

export function KeyValueListControl<TKey, TValue>(props: Props<TKey, TValue>) {
  const [keyValuePairs, setKeyValuePairs] = useState(props.defaultValue);

  function addEmptyKeyValue() {
    setKeyValuePairs([
      ...keyValuePairs,
      { key: "" as TKey, value: "" as TValue },
    ]);
  }

  function updateKey(oldKeykey: TKey, newKey: TKey) {
    const updated = keyValuePairs.map((pair) => {
      if (pair.key === oldKeykey) {
        return { key: newKey, value: pair.value };
      }
      return pair;
    });
    setKeyValuePairs(updated);
  }

  function updateValue(key: TKey, value: TValue) {
    const updated = keyValuePairs.map((pair) => {
      if (pair.key === key) {
        return { key, value };
      }
      return pair;
    });
    setKeyValuePairs(updated);
  }

  function removeByKey(key: TKey) {
    const updated = keyValuePairs.filter((pair) => pair.key !== key);
    setKeyValuePairs(updated);
  }

  useEffect(() => {
    if (keyValuePairs != props.defaultValue) {
      props.onChange?.(keyValuePairs);
    }
  }, [keyValuePairs, props]);

  return (
    <div className="w-full flex gap-4 flex-col">
      {keyValuePairs.map((pair, index) => (
        <div className="flex items-center">
          <DoubleInput
            key={`${index}_${pair.key}`}
            defaultFirstValue={pair.key}
            defaultSecondValue={pair.value}
            onFirstChange={(key) => updateKey(pair.key, key)}
            onSecondChange={(value) => updateValue(pair.key, value)}
          />
          <DeleteResource
            resourceName={pair.key as string}
            onDelete={() => removeByKey(pair.key)}
          >
            <IconButton size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </DeleteResource>
        </div>
      ))}
      <div>
        <IconButton size="small" onClick={() => addEmptyKeyValue()}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
