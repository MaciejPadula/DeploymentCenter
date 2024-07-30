import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { LoadBalancersList } from "./features/load-balancers-list/LoadBalancersList";
import { LoadBalancerPage } from "./features/load-balancer/LoadBalancerPage";
import { NotFound } from "./shared/components/error/not-found/NotFound";
import { ClustersList } from "./features/clusters-list/ClustersList";
import { CreateDeployment } from "./features/create-resource/CreateDeployment";
import { CreateService } from "./features/create-resource/CreateService";

export function RouteRecords() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route path="setup-deployment" element={<CreateDeployment />} />
          <Route path="setup-service" element={<CreateService />} />

          <Route path="clusters-configuration" element={<ClustersList />} />

          <Route
            path="/:clusterName/:namespace/cron-jobs"
            element={<div>Cron Jobs</div>}
          />
          <Route
            path="/:clusterName/:namespace/cron-jobs/:cronJobName"
            element={<div>Cron Jobs Details</div>}
          />

          <Route
            path="/:clusterName/:namespace/deployments"
            element={<DeploymentsList />}
          />
          <Route
            path="/:clusterName/:namespace/deployments/:deploymentName"
            element={<DeploymentPage />}
          />

          <Route
            path="/:clusterName/:namespace/load-balancers"
            element={<LoadBalancersList />}
          />
          <Route
            path="/:clusterName/:namespace/load-balancers/:loadBalancerName"
            element={<LoadBalancerPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
