import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTrainStore, type Dataset, type TrainingJob, type Model } from '../store/trainStore';

export type { Dataset, TrainingJob, Model };

// Keep TrainProvider for backwards compatibility of wrapper
export const TrainProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const useTrain = () => {
  return useTrainStore();
};
