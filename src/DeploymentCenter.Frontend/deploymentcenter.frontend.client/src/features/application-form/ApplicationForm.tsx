import { useRef } from "react";
import { SetupDeployment } from "./setup-deployment/SetupDeployment";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import useApplicationFormDataService from "./application-form-data-service";
import { useConfiguredApiUrl } from "../../shared/contexts/context-helpers";
import { getEmptyApplicationData } from "./application-data";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";
import { InputVariant } from "../../shared/helpers/material-config";
import { applicationFormData, updateAppData } from "./application-form-service";
import { computed } from "@preact/signals-react";

export function ApplicationForm() {
  const apiUrl = useConfiguredApiUrl();
  const formDatService = useApplicationFormDataService(apiUrl);
  const nameRef = useRef<HTMLInputElement | undefined>();
  const navigate = useNavigate();

  const showDeployment = computed(
    () => applicationFormData.value.name.length > 0
  );

  function setApplicationName(name: string) {
    updateAppData((oldData) => (oldData.name = name));
  }

  function restartForm() {
    applicationFormData.value = getEmptyApplicationData();
    const nameInputRef = nameRef?.current;
    if (nameInputRef) {
      nameInputRef.value = "";
    }
  }

  async function submit() {
    await formDatService.createApplication({
      ...applicationFormData.value,
      deployment: {
        ...applicationFormData.value.deployment,
        applicationName: applicationFormData.value.name,
      },
    });

    navigate("/");
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
        variant={InputVariant}
        label="Application Name"
        defaultValue={applicationFormData.value.name}
        onBlur={(e) => setApplicationName(e.target.value)}
      />

      {showDeployment.value && <SetupDeployment />}

      <Button variant="contained" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
