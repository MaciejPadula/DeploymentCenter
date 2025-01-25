import { getFromLocalStorage, setInLocalStorage } from "../helpers/local-storage-helper";
import { Cluster } from "../models/cluster";
import { computed, effect, signal } from "@preact/signals-react";
import { copyObject } from "../helpers/object-helper";

export interface ConfigurationData {
  cluster: string;
  namespace: string;
  clusters: Cluster[];
}

const defaultNamespace = "default";
const configurationKey = "configuration";
const defaultConfiguration: ConfigurationData = {
  cluster: "",
  clusters: [],
  namespace: ""
};

const configuration = signal<ConfigurationData>(getFromLocalStorage(configurationKey, defaultConfiguration));
const selectedCluster = computed(() => configuration.value.clusters.find(c => c.name === configuration.value.cluster));
const selectedClusterApiUrl = computed(() => selectedCluster.value?.apiUrl);
const selectedNamespace = computed(() => configuration.value.namespace);

effect(() => {
  setInLocalStorage(configurationKey, configuration.value);
});

function updateConfiguration(updater: (c: ConfigurationData) => void) {
  const newConfig = copyObject(configuration.value);
  updater(newConfig);
  configuration.value = newConfig;
}

function setClusterAndNamespace(clusterName: string, namespace: string) {
  updateConfiguration(c => {
    c.cluster = clusterName;
    c.namespace = namespace;
  });
}

function setSelectedNamespace(namespace: string) {
  updateConfiguration(c => {
    c.namespace = namespace;
  });
}

function addCluster(cluster: Cluster) {
  updateConfiguration(c => {
    c.clusters.push(cluster);
    c.cluster = cluster.name;
    c.namespace = defaultNamespace;
  });
}

function deleteCluster(clusterName: string) {
  updateConfiguration(c => {
    c.clusters = c.clusters.filter(x => x.name !== clusterName);
  });
}

export {
  configuration,
  selectedCluster,
  selectedClusterApiUrl,
  selectedNamespace,
  setClusterAndNamespace,
  setSelectedNamespace,
  addCluster,
  deleteCluster
}