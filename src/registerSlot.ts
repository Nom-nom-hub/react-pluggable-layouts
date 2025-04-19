/**
 * Exports the registerSlot and registerSlotAsync functions
 */
import { ReactNode } from 'react';
import { registerSlot as _registerSlot, registerSlotAsync as _registerSlotAsync, SlotRegistrationOptions } from './store';

/**
 * Registers a component to a named slot
 * @param slotName - The name of the slot to register to
 * @param component - The component to render in the slot
 * @param options - Options for the registration (priority, id)
 * @returns A unique ID for this registration
 */
export const registerSlot = (
  slotName: string, 
  component: ReactNode,
  options?: SlotRegistrationOptions
): string => {
  return _registerSlot(slotName, component, options);
};

/**
 * Registers a component asynchronously to a named slot
 * @param slotName - The name of the slot to register to
 * @param componentPromise - Promise that resolves to the component to render
 * @param options - Options for the registration (priority, id)
 * @returns A promise that resolves to the registration ID
 */
export const registerSlotAsync = (
  slotName: string,
  componentPromise: Promise<ReactNode>,
  options?: SlotRegistrationOptions
): Promise<string> => {
  return _registerSlotAsync(slotName, componentPromise, options);
}; 