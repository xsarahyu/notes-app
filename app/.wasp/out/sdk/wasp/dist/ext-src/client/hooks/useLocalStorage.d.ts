type SetValue<T> = T | ((val: T) => T);
declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void];
export default useLocalStorage;
