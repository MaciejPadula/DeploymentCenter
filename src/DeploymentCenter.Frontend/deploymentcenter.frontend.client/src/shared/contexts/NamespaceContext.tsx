import { ReactNode, createContext, useReducer } from "react";

type NamespaceContextType = {
  namespace: string;
  setNamespace: (newNamespace: string) => void;
};

const namespaceKey = "namespace";
const defaultNamespace = "default";

const NamespaceContext = createContext<NamespaceContextType>(undefined!);

function namespaceReducer(_: string, newNamespace: string) {
  localStorage.setItem(namespaceKey, newNamespace);
  return newNamespace;
}

function NamespaceProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    namespaceReducer,
    localStorage.getItem(namespaceKey) ?? defaultNamespace
  );

  const value: NamespaceContextType = { namespace: state, setNamespace: dispatch };
  return (
    <NamespaceContext.Provider value={value}>
      {props.children}
    </NamespaceContext.Provider>
  );
}

export { NamespaceProvider, NamespaceContext };
