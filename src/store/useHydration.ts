import { useEffect, useState } from 'react';
import { useAppStore } from './index';

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is an example of checking if Zustand has hydrated the persisted state
    const unsubHydrate = useAppStore.persist.onHydrate(() => setHydrated(false));
    const unsubFinishHydration = useAppStore.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(useAppStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
