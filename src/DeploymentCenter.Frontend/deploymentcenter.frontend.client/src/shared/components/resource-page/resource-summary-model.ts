export type ResourceSummaryFactory = () => Promise<ResourceSummaryModel>;

export interface ResourceSummaryModel {
  resourceTitle: string;
  icon: string;
  properties: Map<string, string>;
}