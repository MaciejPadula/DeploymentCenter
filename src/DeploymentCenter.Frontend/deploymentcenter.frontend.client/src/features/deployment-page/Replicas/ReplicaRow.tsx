import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Pod } from "../models/pod";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function ReplicaRow(props: { pod: Pod }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography color={props.pod.isRunning ? 'green' : 'red'}>{props.pod.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.pod.status}</Typography>
        <Typography>{props.pod.ip}</Typography>
      </AccordionDetails>
      <AccordionActions>xd</AccordionActions>
    </Accordion>
  );
}
