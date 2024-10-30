import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
} from "@mui/material";
import { InputVariant } from "../../helpers/material-config";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  defaultValue: number;
  onChange: (value: number) => void;
  error?: boolean;
  helperText?: string;
  className?: string;
  min?: number;
  max?: number;
};

export function PlusMinusInput(props: Props) {
  const [value, setValue] = useState<number>(props.defaultValue);

  useEffect(() => {
    if (value !== props.defaultValue) {
      props.onChange(value);
    }
  }, [props, value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(e.target.value);
    const valueToSet = isNaN(parsedValue) ? 0 : parsedValue;
    setValue(valueToSet);
  }

  function handleMinus() {
    if (props.min !== undefined && value <= props.min) {
      return;
    }
    setValue(value - 1);
  }

  function handlePlus() {
    if (props.max !== undefined && value >= props.max) {
      return;
    }
    setValue(value + 1);
  }

  return (
    <div className="flex items-center justify-center">
      <FormControl variant={InputVariant} className={props.className} error={props.error}>
        <InputLabel>{props.label}</InputLabel>
        <Input
          // defaultValue={props.defaultValue}
          value={value}
          onChange={handleChange}
          // onBlur={handleBlur}
          startAdornment={
            <IconButton onClick={() => handleMinus()}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          }
          endAdornment={
            <IconButton onClick={() => handlePlus()}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          }
        />
        {props.error && (
          <FormHelperText>{props?.helperText ?? ""}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
