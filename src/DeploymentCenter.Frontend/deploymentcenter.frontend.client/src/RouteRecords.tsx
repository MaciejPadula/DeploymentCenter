import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { NotFound } from "./shared/components/error/not-found/NotFound";
import { ClustersList } from "./features/clusters-list/ClustersList";
import { NamespacesList } from "./features/namespaces-list/NamespacesList";
import { ClusterFromUrlGuard } from "./shared/guards/ClusterFromUrlGuard";
import { VolumesListPage } from "./features/volumes-list/VolumesListPage";
import { loadBalancerRoutes } from "./features/load-balancer/LoadBalancerRoutes";
import { deploymentRoutes } from "./features/deployment/DeploymentRoutes";

export function RouteRecords() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          {loadBalancerRoutes.map((r) => (
            <Route key={r.route} path={r.route} element={r.component} />
          ))}
          {deploymentRoutes.map((r) => (
            <Route key={r.route} path={r.route} element={r.component} />
          ))}

          <Route path="clusters-configuration" element={<ClustersList />} />

          <Route
            path="/:clusterName/:namespace/volumes"
            element={
              <ClusterFromUrlGuard>
                {(c) => <VolumesListPage cluster={c} />}
              </ClusterFromUrlGuard>
            }
          />

          <Route
            path="/:clusterName/namespaces"
            element={
              <ClusterFromUrlGuard>
                {(c) => <NamespacesList cluster={c} />}
              </ClusterFromUrlGuard>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
