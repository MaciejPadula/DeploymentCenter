import { effect, signal } from "@preact/signals-react";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../../shared/helpers/local-storage-helper";
import { ApplicationData, getEmptyApplicationData } from "./application-data";
import { copyObject } from "../../shared/helpers/object-helper";

const LOCAL_STORAGE_KEY = "applicationData";

const applicationFormData = signal<ApplicationData>(
  getFromLocalStorage<ApplicationData>(
    LOCAL_STORAGE_KEY,
    getEmptyApplicationData()
  )
);

effect(() => {
  setInLocalStorage(LOCAL_STORAGE_KEY, applicationFormData.value);
});

function updateAppData(updater: (data: ApplicationData) => void) {
  const newData = copyObject(applicationFormData.value);
  updater(newData);
  applicationFormData.value = newData;
}

export { applicationFormData, updateAppData };
