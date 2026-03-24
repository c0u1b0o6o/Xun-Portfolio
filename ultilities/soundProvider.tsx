'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
};

const SoundContext = createContext<SoundContextType>({ 
  isMuted: false, 
  toggleMute: () => {} 
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('isSoundMuted');
    if (saved !== null) {
      setIsMuted(JSON.parse(saved));
    }
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('isSoundMuted', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}