import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "../models/container";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { InputVariant } from "../../../shared/helpers/material-config";

export function ContainerRow(props: { container: Container }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography>{props.container.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.container.image}</Typography>
        {Array.from(props.container.environmentVariables).map((x) => (
          <div key={x.key} className="flex flex-row justify-center">
            <TextField
              className="w-full sm:w-1/2"
              variant={InputVariant}
              label={"Key"}
              value={x.key}
            />
            <TextField
              className="w-full sm:w-1/2"
              variant={InputVariant}
              label={"Value"}
              value={x.value}
            />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
