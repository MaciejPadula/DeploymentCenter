export type UpdaterFunction<T> = (updater: (value: T) => void) => void;