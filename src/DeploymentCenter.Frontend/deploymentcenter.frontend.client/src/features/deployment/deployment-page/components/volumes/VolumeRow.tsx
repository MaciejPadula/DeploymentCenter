import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DeploymentVolume } from "../../models/deployment-volume";

type Props = {
  volume: DeploymentVolume;
}

export function VolumeRow(props: Props) {
  return <Accordion>
    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
      <Typography>{props.volume.name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{props.volume.claimName}</Typography>
      <Button>Connect To Volume</Button>
    </AccordionDetails>
  </Accordion>;
}