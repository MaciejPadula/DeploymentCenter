import { ReactNode, createContext, useReducer } from "react";

const namespaceKey = "namespace";
const defaultNamespace = "default";

const NamespaceContext = createContext<string>("");

function namespaceReducer(state: string, newNamespace: string) {
  localStorage.setItem(namespaceKey, newNamespace);
  return newNamespace;
}

function NamespaceProvider(props: { children: ReactNode }) {
  const [state] = useReducer(
    namespaceReducer,
    localStorage.getItem(namespaceKey) ?? defaultNamespace
  );

  // const value = { state, dispatch };
  return (
    <NamespaceContext.Provider value={state}>
      {props.children}
    </NamespaceContext.Provider>
  );
}

export { NamespaceContext, NamespaceProvider };
