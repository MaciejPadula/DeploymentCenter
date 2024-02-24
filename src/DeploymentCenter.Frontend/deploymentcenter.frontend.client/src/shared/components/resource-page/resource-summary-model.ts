export type ResourceSummaryFactory = () => Promise<ResourceSummaryModel>;

export interface ResourceSummaryModel {
  properties: Map<string, string>;
}