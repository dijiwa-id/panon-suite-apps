import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDevelopStore, type Block, type Pipeline, type Application } from '../store/developStore';

export type { Block, Pipeline, Application };

// We keep DevelopProvider for backwards compatibility of standard context wrapping (though no longer needed)
export const DevelopProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const useDevelop = () => {
  return useDevelopStore();
};
