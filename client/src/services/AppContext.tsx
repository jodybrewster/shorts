"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { _getShorts, _deleteShort, _saveShort, _addShort } from "../services/Services";

export interface Short {
  _id: string;
  shortcode: string;
  url: string;
  amountVisited: number;
}

interface AppContextType {
  shorts: Short[];
  deleteShort: (shortcode: string) => Promise<boolean>;
  saveShort: (short: Short, editedShort: Short) => Promise<void>;
  addShort: (url: string) => Promise<Short>;
}

const defaultContextValue: AppContextType = {
  shorts: [],
  deleteShort: async (shortcode: string): Promise<boolean> => {
    return true;
  },
  saveShort: async (short: Short, editedShort: Short): Promise<void> => {},
  addShort: async (url: string): Promise<any> => {return {} }
};

const AppContext = createContext<AppContextType>(defaultContextValue);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [editedShort, setEditedShort] = useState<Short | null>(null);

  const addShort = async (url: string): Promise<Short> => {
    console.log('addShort');
    const data = await _addShort(url);
    const s = upsertShort(shorts, data);
    setShorts(s)
    return data;
  };

  const deleteShort = async (shortCode: string): Promise<boolean> => {
    const ok = await _deleteShort(shortCode);
    if (ok) {
      const s = shorts.filter((short: any) => short.shortcode !== shortCode);
      setShorts(s);
    }
    return ok;
  };

  const saveShort = async (short: Short, editedShort: Short): Promise<void> => {
    const response = await _saveShort(short, editedShort);
    const s = upsertShort(shorts, editedShort);
    setShorts(s)
  };

  useEffect(() => {
    console.log("AppContext");
    _getShorts().then((shorts) => {
      console.log("getShorts", shorts);
      setShorts(shorts);
    });
  }, []);

  const value = {
    shorts,
    deleteShort,
    saveShort,
    addShort,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const upsertShort = (shorts: Short[], editedShort: Short): Short[] => {
  const shortIndex = shorts.findIndex((short) => short._id === editedShort._id);

  if (shortIndex !== -1) {
    shorts[shortIndex] = editedShort;
  } else {
    shorts = [...shorts, editedShort];
  }

  return shorts;
};

export { AppContext, AppProvider };
