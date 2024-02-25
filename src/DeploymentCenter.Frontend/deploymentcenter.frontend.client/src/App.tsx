import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { Layout } from "./layout/Layout";
import { LoadBalancersList } from "./features/load-balancers-list/LoadBalancersList";
import { LoadBalancerPage } from "./features/load-balancer/LoadBalancerPage";
import { MainPage } from "./features/main-page/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route path='cron-jobs' element={<div>Cron Jobs</div>} />
          <Route path='cron-jobs/:cronJobName' element={<div>Cron Jobs Details</div>} />

          <Route path="/:namespace/deployments" element={<DeploymentsList />} />
          <Route
            path="/:namespace/deployments/:deploymentName"
            element={<DeploymentPage />}
          />

          <Route path="/:namespace/load-balancers" element={<LoadBalancersList />} />
          <Route
            path="/:namespace/load-balancers/:loadBalancerName"
            element={<LoadBalancerPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
