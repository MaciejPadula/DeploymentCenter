import { ReactNode, createContext, useReducer } from "react";
import { getFromLocalStorage, setInLocalStorage } from "../helpers/local-storage-helper";
import { Cluster } from "../models/cluster";

export interface ConfigurationData {
  cluster: string;
  namespace: string;
  clusters: Cluster[];
}

type ConfigurationContextType = {
  configuration: ConfigurationData;
  setConfiguration: (newConfiguration: ConfigurationData) => void;
};

const configurationKey = "configuration";
const defaultConfiguration: ConfigurationData = {
  cluster: "Roxy",
  clusters: [
    {
      apiUrl: "http://172.22.0.1:5500",
      name: "Eris"
    },
    {
      apiUrl: "http://172.22.0.10:5500",
      name: "Roxy"
    }
  ],
  namespace: "default"
};

const ConfigurationContext = createContext<ConfigurationContextType>(undefined!);

function configurationReducer(_: ConfigurationData, newConfiguration: ConfigurationData) {
  setInLocalStorage(configurationKey, newConfiguration);
  return newConfiguration;
}

function ConfigurationProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    configurationReducer,
    getFromLocalStorage(configurationKey, defaultConfiguration)
  );

  const value: ConfigurationContextType = { configuration: state, setConfiguration: dispatch };
  return (
    <ConfigurationContext.Provider value={value}>
      {props.children}
    </ConfigurationContext.Provider>
  );
}

export { ConfigurationProvider, ConfigurationContext };
