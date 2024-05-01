import axios from "axios";
import { ApplicationData } from "./application-data";

function ApplicationFormDataService(apiUrl: string) {
  async function createApplication(data: ApplicationData) {
    await axios.post(
      `${apiUrl}/api/Deployments/CreateDeployment`,
      data.deployment
    );
  }

  return {
    createApplication,
  };
}

export default function useApplicationFormDataService(
  clusterUrl: string | undefined
) {
  return ApplicationFormDataService(clusterUrl ?? "");
}
