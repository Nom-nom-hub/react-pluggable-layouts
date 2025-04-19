/**
 * Hook to access slot contents manually
 */
import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot } from './store';
import { useSlotContext } from './SlotProvider';

/**
 * Hook to access all components registered to a specific slot
 * @param name - The name of the slot to access
 * @returns The registered components for the slot
 */
export const useSlot = (name: string) => {
  // Use sync external store to subscribe to changes in the slot store
  useSyncExternalStore(subscribe, getSnapshot);
  
  // Get the slot context to access registered components
  const { getSlotContent } = useSlotContext();
  
  // Return the components registered for this slot name
  return getSlotContent(name);
}; 