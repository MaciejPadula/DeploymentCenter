export interface VolumeData {
  volumeName: string;
  volumePath: string;
  capacityInKibiBytes: number;
}

export function getEmptyVolumeData(): VolumeData {
  return {
    volumeName: "",
    volumePath: "",
    capacityInKibiBytes: 0,
  };
}