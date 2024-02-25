const MAX_RECENTLY_VISITED_PAGES = 5;

export interface RecentlyVisitedPage {
  title: string;
  namespace: string;
  icon: string;
  url: string;
}

export function getRecentlyVisitedPages(): RecentlyVisitedPage[] {
  const recentlyVisitedPages = localStorage.getItem('recentlyVisitedPages');
  if (recentlyVisitedPages) {
    return JSON.parse(recentlyVisitedPages);
  }
  return [];
}

export function addRecentlyVisitedPage(title: string, namespace: string, icon: string, url: string): void {
  const recentlyVisitedPages = getRecentlyVisitedPages();
  const existingPage = recentlyVisitedPages.find((page) => page.url === url);
  if (existingPage) {
    recentlyVisitedPages.splice(recentlyVisitedPages.indexOf(existingPage), 1);
  }
  recentlyVisitedPages.unshift({ title, namespace, icon, url });
  if (recentlyVisitedPages.length > MAX_RECENTLY_VISITED_PAGES) {
    recentlyVisitedPages.pop();
  }
  localStorage.setItem('recentlyVisitedPages', JSON.stringify(recentlyVisitedPages));
}