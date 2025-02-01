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
    <div className="flex flex-col sm:flex-row w-full sm:gap-2">
      <TextField
        label="Key"
        className="flex-grow"
        variant={InputVariant}
        defaultValue={props.defaultFirstValue}
        onBlur={(e) => handleFirstChange(e.target.value as TFirst)}
      />

      <TextField
        label="Value"
        className="flex-grow"
        variant={InputVariant}
        defaultValue={props.defaultSecondValue}
        onBlur={(e) => handleSecondChange(e.target.value as TSecond)}
      />
    </div>
  );
}
