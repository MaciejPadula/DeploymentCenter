import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { MainPage } from "./features/main-page/MainPage";
import { NotFound } from "./shared/components/error/not-found/NotFound";
import { ClustersList } from "./features/clusters-list/ClustersList";
import { NamespacesList } from "./features/namespaces-list/NamespacesList";
import { ClusterFromUrlGuard } from "./shared/guards/ClusterFromUrlGuard";
import { VolumesListPage } from "./features/volumes-list/VolumesListPage";
import { loadBalancerRoutes } from "./features/load-balancer/LoadBalancerRoutes";
import { deploymentRoutes } from "./features/deployment/DeploymentRoutes";
import { templateRoutes } from "./features/template/TemplateRoutes";
import { cronJobsRoutes } from "./features/cron-jobs/CronJobsRoutes";
import { RouteDefinition } from "./shared/models/route-definition";
import { metricsRoutes } from "./features/metrics/MetricsRoutes";

export function RouteRecords() {
  function renderRoutes(routes: RouteDefinition[]) {
    return routes.map((r) => (
      <Route key={r.route} path={r.route} element={r.component} />
    ));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route path="/:clusterName/:namespace" element={<Navigate to={"/"} />} />
          <Route path="/:clusterName" element={<Navigate to={"/"} />} />

          {renderRoutes(loadBalancerRoutes)}
          {renderRoutes(deploymentRoutes)}
          {renderRoutes(templateRoutes)}
          {renderRoutes(cronJobsRoutes)}
          {renderRoutes(metricsRoutes)}

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
