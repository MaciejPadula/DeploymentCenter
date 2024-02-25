import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "../models/container";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function ContainerRow(props: { container: Container }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography>{props.container.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.container.image}</Typography>
        {Array.from(props.container.environmentVariables).map(
          ([key, value]) => (
            <div key={key}>
              <TextField variant="standard" label={'Key'} value={key} />
              <TextField variant="standard" label={'Value'} value={value} />
            </div>
          )
        )}
      </AccordionDetails>
    </Accordion>
  );
}
