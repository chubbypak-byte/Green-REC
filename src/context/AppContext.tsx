import React, { createContext, useContext, useState, useEffect } from 'react';
import { GLOBAL_DATA as initialGlobalData } from '../constants';

type GlobalDataType = typeof initialGlobalData;

interface AppContextType {
  globalData: GlobalDataType;
  updateUser: (user: Partial<GlobalDataType['user']>) => void;
  updateStats: (stats: Partial<GlobalDataType['stats']>) => void;
  updateAsset: (id: string, asset: Partial<GlobalDataType['assets'][0]>) => void;
  addAsset: (asset: GlobalDataType['assets'][0]) => void;
  removeAsset: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalData, setGlobalData] = useState<GlobalDataType>(() => {
    const saved = localStorage.getItem('pea_green_rec_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return initialGlobalData;
  });

  useEffect(() => {
    localStorage.setItem('pea_green_rec_data', JSON.stringify(globalData));
  }, [globalData]);

  const updateUser = (user: Partial<GlobalDataType['user']>) => {
    setGlobalData(prev => ({
      ...prev,
      user: { ...prev.user, ...user }
    }));
  };

  const updateStats = (stats: Partial<GlobalDataType['stats']>) => {
    setGlobalData(prev => ({
      ...prev,
      stats: { ...prev.stats, ...stats }
    }));
  };

  const updateAsset = (id: string, asset: Partial<GlobalDataType['assets'][0]>) => {
    setGlobalData(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? { ...a, ...asset } : a)
    }));
  };

  const addAsset = (asset: GlobalDataType['assets'][0]) => {
    setGlobalData(prev => ({
      ...prev,
      assets: [...prev.assets, asset],
      stats: {
        ...prev.stats,
        assetCount: prev.stats.assetCount + 1
      }
    }));
  };

  const removeAsset = (id: string) => {
    setGlobalData(prev => ({
      ...prev,
      assets: prev.assets.filter(a => a.id !== id),
      stats: {
        ...prev.stats,
        assetCount: prev.stats.assetCount - 1
      }
    }));
  };

  return (
    <AppContext.Provider value={{ globalData, updateUser, updateStats, updateAsset, addAsset, removeAsset }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
