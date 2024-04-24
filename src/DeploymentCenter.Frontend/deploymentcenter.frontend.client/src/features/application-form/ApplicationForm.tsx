import { useEffect, useRef, useState } from "react";
import useApplicationFormService from "./application-form-service";
import { SetupDeployment } from "./setup-deployment/SetupDeployment";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import useApplicationFormDataService from "./application-form-data-service";
import { useConfiguredApiUrl } from "../../shared/contexts/context-helpers";
import { getEmptyApplicationData } from "./application-data";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";

export function ApplicationForm() {
  const apiUrl = useConfiguredApiUrl();
  const formDatService = useApplicationFormDataService(apiUrl);
  const formService = useApplicationFormService();
  const [data, setData] = useState(formService.getStoredData());
  const nameRef = useRef<HTMLInputElement | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    formService.storeData(data);
  }, [data, formService]);

  function setApplicationName(name: string) {
    setData({ ...data, name });
  }

  function restartForm() {
    const newData = getEmptyApplicationData();
    formService.storeData(newData);
    setData(newData);
    const nameInputRef = nameRef?.current;
    if (nameInputRef) {
      nameInputRef.value = "";
    }
  }

  async function submit() {
    await formDatService.createApplication({
      ...data,
      deployment: {
        ...data.deployment,
        applicationName: data.name,
      },
    });

    navigate('/');
    navigate(0);
  }

  return (
    <div className="flex w-full p-4 sm:px-16 sm:py-4 flex-col gap-4">
      <div className="flex flex-row justify-between">
        <Typography variant="h5">Creating Application</Typography>
        <IconButton onClick={restartForm}>
          <RestartAltIcon fontSize="inherit" />
        </IconButton>
      </div>
      <TextField
        inputRef={nameRef}
        variant="standard"
        label="Application Name"
        defaultValue={data.name}
        onBlur={(e) => setApplicationName(e.target.value)}
      />

      {data.name.length > 0 && (
        <SetupDeployment
          deployment={data.deployment}
          handleDeploymentChange={(deployment) =>
            setData({ ...data, deployment })
          }
        />
      )}

      <Button variant="contained" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
