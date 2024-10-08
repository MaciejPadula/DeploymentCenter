export type Setter<T> = (value: T) => void;

export type UpdaterFunction<T> = (updater: Setter<T>) => void;
