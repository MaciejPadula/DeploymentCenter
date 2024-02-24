import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Pod } from "../pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function Replica(props: { pod: Pod }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{props.pod.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.pod.status}</Typography>
        <Typography>{props.pod.ip}</Typography>
      </AccordionDetails>
      <AccordionActions>
        xd
      </AccordionActions>
    </Accordion>
  );
}
