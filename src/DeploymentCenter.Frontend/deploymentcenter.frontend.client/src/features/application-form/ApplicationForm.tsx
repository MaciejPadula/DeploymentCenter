import { useRef } from "react";
import { SetupDeployment } from "./setup-deployment/SetupDeployment";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import useApplicationFormDataService from "./application-form-data-service";
import { getEmptyApplicationData } from "./application-data";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { InputVariant } from "../../shared/helpers/material-config";
import { applicationFormData, updateAppData } from "./application-form-service";
import { computed } from "@preact/signals-react";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import { useAppRouting } from "../../shared/hooks/navigation";

export function ApplicationForm() {
  const apiUrl = selectedClusterApiUrl.value;
  const formDatService = useApplicationFormDataService(apiUrl);
  const nameRef = useRef<HTMLInputElement | undefined>();
  const navigation = useAppRouting();

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

    navigation.mainPage();
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
