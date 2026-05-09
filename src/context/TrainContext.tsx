import { useTrainStore, type Dataset, type TrainingJob, type Model } from '../store/trainStore';

export type { Dataset, TrainingJob, Model };

export const useTrain = () => {
  return useTrainStore();
};
