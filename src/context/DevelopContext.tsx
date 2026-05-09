import { useDevelopStore, type Block, type Pipeline, type Application } from '../store/developStore';

export type { Block, Pipeline, Application };

export const useDevelop = () => {
  return useDevelopStore();
};
