import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";
import { DeploymentPage } from "./features/deployment-page/DeploymentPage";
import { LoadBalancersList } from "./features/load-balancers-list/LoadBalancersList";
import { LoadBalancerPage } from "./features/load-balancer/LoadBalancerPage";
import { NotFound } from "./features/not-found/NotFound";
import { useConfigurationContext } from "./shared/contexts/context-helpers";
import { ClustersList } from "./features/clusters-list/ClustersList";

export function RouteRecords() {
  const config = useConfigurationContext();

  return (
    <BrowserRouter>
      {config.configuration.cluster && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />

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
      )}
    </BrowserRouter>
  );
}
