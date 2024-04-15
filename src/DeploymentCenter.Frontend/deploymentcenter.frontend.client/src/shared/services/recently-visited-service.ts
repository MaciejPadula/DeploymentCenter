import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../helpers/local-storage-helper";

const MAX_RECENTLY_VISITED_PAGES = 5;

export interface RecentlyVisitedPage {
  clusterName: string;
  title: string;
  namespace: string;
  icon: string;
  url: string;
}

export function getRecentlyVisitedPages(): RecentlyVisitedPage[] {
  return getFromLocalStorage("recentlyVisitedPages", []);
}

export function addRecentlyVisitedPage(
  clusterName: string,
  title: string,
  namespace: string,
  icon: string,
  url: string
): void {
  const recentlyVisitedPages = getRecentlyVisitedPages();
  const existingPage = recentlyVisitedPages.find((page) => page.url === url);
  if (existingPage) {
    recentlyVisitedPages.splice(recentlyVisitedPages.indexOf(existingPage), 1);
  }
  recentlyVisitedPages.unshift({ title, namespace, icon, url, clusterName });
  if (recentlyVisitedPages.length > MAX_RECENTLY_VISITED_PAGES) {
    recentlyVisitedPages.pop();
  }
  setInLocalStorage("recentlyVisitedPages", recentlyVisitedPages);
}
