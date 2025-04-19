/**
 * react-pluggable-layouts
 * A React package for pluggable layout slots with dynamic component registration
 */

// Core components
export { SlotProvider } from './SlotProvider';
export { Slot } from './Slot';

// Hooks
export { useSlot } from './useSlot';

// Registration functions
export { registerSlot, registerSlotAsync } from './registerSlot';
export { unregisterSlot } from './unregisterSlot';

// Types
export type { SlotProviderProps } from './SlotProvider';
export type { SlotProps } from './Slot';
export type { SlotRegistrationOptions } from './store'; 