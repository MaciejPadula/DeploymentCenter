import { FormHelperText, IconButton, Typography } from "@mui/material";
import { ChipListItem } from "./ChipListItem";
import AddIcon from "@mui/icons-material/Add";
import { Setter } from "../../helpers/function-helpers";

type Props<T> = {
  dialogTitle: string;
  label: string;
  value: T[];
  toString: (value: T) => string;
  getEmptyValue: () => T;
  onChange: (value: T[]) => void;
  dialogContentFactory: (value: T, setter: Setter<T>) => JSX.Element;
  error?: boolean;
  helperText?: string;
};

export function ChipListControl<T>(props: Props<T>) {
  function addEmptyValue() {
    props.onChange([...props.value, props.getEmptyValue()]);
  }

  function onChange(index: number, value: T) {
    const newValue = [...props.value];
    newValue[index] = value;
    props.onChange(newValue);
  }

  function onDelete(index: number) {
    const newValue = [...props.value];
    newValue.splice(index, 1);
    props.onChange(newValue);
  }

  return (
    <div>
      <Typography variant="h6">{props.label}</Typography>
      {props.error && (
        <FormHelperText error={true}>{props.helperText}</FormHelperText>
      )}
      {props.value.map((ipAddress, index) => (
        <ChipListItem
          dialogTitle={props.dialogTitle}
          key={props.toString(ipAddress)}
          value={ipAddress}
          toString={props.toString}
          dialogContentFactory={props.dialogContentFactory}
          onChange={(value) => onChange(index, value)}
          onDelete={() => onDelete(index)}
        />
      ))}
      <IconButton size="small" onClick={() => addEmptyValue()}>
        <AddIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}
