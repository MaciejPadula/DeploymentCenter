import { TextField } from "@mui/material";
import { InputVariant } from "../../helpers/material-config";

export function DoubleInput<TFirst, TSecond>(props: {
  defaultFirstValue: TFirst;
  defaultSecondValue: TSecond;
  onFirstChange: (first: TFirst) => void;
  onSecondChange: (second: TSecond) => void;
}) {
  function handleFirstChange(key: TFirst) {
    props.onFirstChange(key);
  }

  function handleSecondChange(value: TSecond) {
    props.onSecondChange(value);
  }

  return (
    <div>
      <TextField
        label="Key"
        variant={InputVariant}
        defaultValue={props.defaultFirstValue}
        onChange={(e) => handleFirstChange(e.target.value as TFirst)}
      />

      <TextField
        label="Value"
        variant={InputVariant}
        defaultValue={props.defaultSecondValue}
        onChange={(e) => handleSecondChange(e.target.value as TSecond)}
      />
    </div>
  );
}
