/**
 * Exports the unregisterSlot function
 */
import { unregisterSlot as _unregisterSlot } from './store';

/**
 * Unregisters a component from a slot
 * @param slotName - The name of the slot
 * @param id - The ID of the registration to remove
 * @returns true if component was unregistered, false otherwise
 */
export const unregisterSlot = (slotName: string, id: string): boolean => {
  return _unregisterSlot(slotName, id);
}; 