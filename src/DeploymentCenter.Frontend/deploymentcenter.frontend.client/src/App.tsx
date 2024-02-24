import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<div>main</div>} />
          <Route path="/deployments" element={<DeploymentsList />} />
          <Route
            path="/deployments/:deploymentName"
            element={<DeploymentPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
