import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Container } from "../../models/container";
import { useState } from "react";
import { ContainerVolumesList } from "./ContainerVolumesList";
import { Cluster } from "../../../../../shared/models/cluster";
import { InputVariant } from "../../../../../shared/helpers/material-config";

type Props = {
  cluster: Cluster;
  namespace: string;
  deploymentName: string;
  container: Container;
}

export function ContainerRow(props: Props) {
  const [value, setValue] = useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography>{props.container.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Docker Image' value={1} />
          <Tab label='Volume Mounts' value={2} />
          <Tab label='Environment Variables' value={3} />
        </Tabs>

        {value == 1 && (
          <div>
            <span>{props.container.image}</span>
          </div>
        )}

        {value == 2 && (
          <div>
            <ContainerVolumesList
              container={props.container}
              cluster={props.cluster}
              namespace={props.namespace}
              deploymentName={props.deploymentName}
            />
          </div>
        )}

        {value == 3 && (
          <>
            {
              Array.from(props.container.environmentVariables).map((x) => (
                <div key={x.key} className="flex flex-row justify-center">
                  <TextField
                    className="w-full sm:w-1/2"
                    variant={InputVariant}
                    label={"Key"}
                    value={x.key ?? ''}
                  />
                  <TextField
                    className="w-full sm:w-1/2"
                    variant={InputVariant}
                    label={"Value"}
                    value={x.value ?? ''}
                  />
                </div>
              ))
            }
          </>
        )}
      </AccordionDetails>
    </Accordion >
  );
}
