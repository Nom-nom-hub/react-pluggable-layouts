/**
 * SlotProvider component that wraps the app and provides context for slot management
 */
import React, { ReactNode, createContext, useContext } from 'react';
import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe, SlotRegistration, getSlotComponents } from './store';

/**
 * Interface for the SlotContext
 */
interface SlotContextType {
  /**
   * Get the components registered for a given slot
   * @param slotName - The name of the slot
   */
  getSlotContent: (slotName: string) => SlotRegistration[];
}

// Create the context with a default value
const SlotContext = createContext<SlotContextType | null>(null);

/**
 * Props for the SlotProvider component
 */
export interface SlotProviderProps {
  /**
   * The children to render
   */
  children: ReactNode;
}

/**
 * SlotProvider component
 * Provides context for slot management throughout the app
 */
export const SlotProvider: React.FC<SlotProviderProps> = ({ children }) => {
  // Use sync external store to subscribe to changes in the slot store
  const state = useSyncExternalStore(subscribe, getSnapshot);
  
  // Create the context value with current state
  const contextValue: SlotContextType = {
    getSlotContent: (slotName: string) => getSlotComponents(slotName),
  };
  
  return (
    <SlotContext.Provider value={contextValue}>
      {children}
    </SlotContext.Provider>
  );
};

/**
 * Hook to access the slot context
 * @returns The slot context
 * @throws Error if used outside of a SlotProvider
 */
export const useSlotContext = (): SlotContextType => {
  const context = useContext(SlotContext);
  
  if (context === null) {
    throw new Error('useSlotContext must be used within a SlotProvider');
  }
  
  return context;
}; 