const routesToMaintain = [
  "setup-application"
];

export function createRedirectUrl(
  locationPathname: string,
  selectedCluster: string,
  selectedNamespace: string
) {
  const mainRoute = locationPathname.split("/");
  if (routesToMaintain.some(x => x === mainRoute[1])) {
    return locationPathname;
  }

  const locationPath = mainRoute.slice(3);
  return locationPath.length > 0
    ? `/${selectedCluster}/${selectedNamespace}/${locationPath.join("/")}`
    : "/";
}
