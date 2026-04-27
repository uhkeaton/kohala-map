import { viteDataSources } from "../env";

export type DataSource = {
  id: string;
  title: string;
};

export const localStorageKeyDataSource = "localStorageKeyDataSource";

export function addItem(id: string, title: string) {
  return function (state: DataSource[]) {
    return [...state, { id, title }];
  };
}
export function removeItem(id: string) {
  return function (state: DataSource[]) {
    return state.filter((item) => item.id !== id);
  };
}

export const permanentDataSources: DataSource[] = viteDataSources;
