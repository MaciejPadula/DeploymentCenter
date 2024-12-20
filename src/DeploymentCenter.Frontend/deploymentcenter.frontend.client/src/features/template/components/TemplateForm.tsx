import { useQuery } from "@tanstack/react-query";
import { Cluster } from "../../../shared/models/cluster";
import { useTemplatesDataService } from "../services/templates-data-service";
import { Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import { InputVariant } from "../../../shared/helpers/material-config";
import { useRef } from "react";
import { CreateResourceForm } from "../../../shared/components/create-resource-form/CreateResourceForm";
import { useAppRouting } from "../../../shared/hooks/navigation";
import { LoadingError } from "../../../shared/components/error/loading-error/LoadingError";
import { isAxiosError } from "axios";
import { NotFound } from "../../../shared/components/error/not-found/NotFound";

type Props = {
  cluster: Cluster;
  templateName: string;
}

export function TemplateForm(props: Props) {
  const dataService = useTemplatesDataService(props.cluster);
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useAppRouting();

  const { data: template, error, isLoading } = useQuery({
    queryKey: ["template", props.templateName],
    queryFn: () => dataService.getTemplate(props.templateName)
  });

  async function applyTemplate() {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const variables = Array.from(formData.entries()).map(([key, value]) => [key, value.toString()]);

    await dataService.applyTemplate({
      templateName: props.templateName,
      variables: Object.fromEntries(variables)
    });

    navigation.mainPage();
  }

  if (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return <NotFound />
    }
    return <LoadingError />;
  }

  if (isLoading || !template) {
    return <LinearProgress className="w-full" />;
  }

  return (
    <CreateResourceForm resourceTitle={props.templateName} isValid={true} onSubmit={() => applyTemplate()} resetForm={() => { }}>
      <form ref={formRef}>
        <Grid container spacing={2}>
          {
            template.variables.map(variable => (
              <Grid size={{ sm: 4, xs: 12 }} key={variable.displayName}>
                <TextField
                  name={variable.name}
                  className="w-full"
                  variant={InputVariant}
                  label={variable.displayName}
                  defaultValue={variable.defaultValue}
                />
              </Grid>
            ))
          }
        </Grid>
      </form>
    </CreateResourceForm>
  );
}