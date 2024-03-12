import { ReactNode, createContext, useReducer } from "react";
import { getFromLocalStorage, setInLocalStorage } from "../helpers/local-storage-helper";
import { Agent } from "../models/agent";

export interface ConfigurationData {
  agent: Agent;
  namespace: string;
}

type ConfigurationContextType = {
  configuration: ConfigurationData;
  setConfiguration: (newConfiguration: ConfigurationData) => void;
};

const configurationKey = "configuration";
const defaultConfiguration: ConfigurationData = {
  agent: {
    apiUrl: "http://172.28.0.4:5500",
    name: "Eris"
  },
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
