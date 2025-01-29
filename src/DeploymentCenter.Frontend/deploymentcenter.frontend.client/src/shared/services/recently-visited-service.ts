import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../helpers/local-storage-helper";

const MAX_RECENTLY_VISITED_PAGES = 5;
const RECENTLY_VISITED_PAGES_LS_KEY = "recentlyVisitedPages";

export interface RecentlyVisitedPage {
  clusterName: string;
  title: string;
  namespace: string;
  icon: string;
  url: string;
}

export function getRecentlyVisitedPages(): RecentlyVisitedPage[] {
  return getFromLocalStorage(RECENTLY_VISITED_PAGES_LS_KEY, []);
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
  setInLocalStorage(RECENTLY_VISITED_PAGES_LS_KEY, recentlyVisitedPages);
}

export function removeRecentlyVisitedPage(title: string) {
  const recentlyVisitedPages = getRecentlyVisitedPages();
  setInLocalStorage(
    RECENTLY_VISITED_PAGES_LS_KEY,
    recentlyVisitedPages.filter((x) => x.title !== title)
  );
}

export function deleteRecentlyVisitedPage(title: string) {
  const recentlyVisitedPages = getRecentlyVisitedPages();
  setInLocalStorage(
    RECENTLY_VISITED_PAGES_LS_KEY,
    recentlyVisitedPages.filter((x) => x.title !== title)
  );
}
