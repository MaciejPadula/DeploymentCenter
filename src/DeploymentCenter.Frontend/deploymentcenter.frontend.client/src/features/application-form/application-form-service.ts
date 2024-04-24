import { getFromLocalStorage, setInLocalStorage } from "../../shared/helpers/local-storage-helper";
import { ApplicationData, getEmptyApplicationData } from "./application-data";

function ApplicationFormService() {
  const LOCAL_STORAGE_KEY = 'application-form-data';

  function getStoredData() {
    return getFromLocalStorage<ApplicationData>(LOCAL_STORAGE_KEY, getEmptyApplicationData());
  }

  function storeData(data: ApplicationData) {
    setInLocalStorage(LOCAL_STORAGE_KEY, data);
  }

  return {
    getStoredData,
    storeData
  }
}

export default function useApplicationFormService() {
  return ApplicationFormService();
}