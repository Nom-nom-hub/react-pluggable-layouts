/**
 * Internal store for managing slot registrations
 * @internal
 */

import { ReactNode } from 'react';

/**
 * Options for slot registration
 */
export interface SlotRegistrationOptions {
  /**
   * Priority for rendering (lower number = higher priority)
   */
  priority?: number;
  
  /**
   * Unique identifier for this registration
   */
  id?: string;
}

/**
 * Interface for a slot registration entry
 */
export interface SlotRegistration {
  /**
   * The component to render in the slot
   */
  component: ReactNode;
  
  /**
   * Priority for ordering (lower number = higher priority)
   */
  priority: number;
  
  /**
   * Unique identifier for this registration
   */
  id: string;
}

/**
 * Type for the store state
 */
type SlotStore = {
  [slotName: string]: SlotRegistration[];
};

// Initialize store
let store: SlotStore = {};

// List of listeners
let listeners: (() => void)[] = [];

/**
 * Notifies all listeners of a state change
 */
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

/**
 * Generates a unique ID if none is provided
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Registers a component to a named slot
 * @param slotName - The name of the slot to register to
 * @param component - The component to render in the slot
 * @param options - Options for the registration
 * @returns A unique ID for this registration
 */
export const registerSlot = (
  slotName: string, 
  component: ReactNode,
  options: SlotRegistrationOptions = {}
): string => {
  const id = options.id || generateId();
  const priority = options.priority ?? 10; // Default priority
  
  // Initialize the slot array if it doesn't exist
  if (!store[slotName]) {
    store[slotName] = [];
  }
  
  // Check if this component with the same ID is already registered
  const existingIndex = store[slotName].findIndex(item => item.id === id);
  
  if (existingIndex >= 0) {
    // Update existing registration
    store[slotName][existingIndex] = { component, priority, id };
  } else {
    // Add new registration
    store[slotName].push({ component, priority, id });
    
    // Sort by priority
    store[slotName].sort((a, b) => a.priority - b.priority);
  }
  
  // Notify listeners of the change
  notifyListeners();
  
  return id;
};

/**
 * Unregisters a component from a slot
 * @param slotName - The name of the slot
 * @param id - The ID of the registration to remove
 * @returns true if component was unregistered, false otherwise
 */
export const unregisterSlot = (slotName: string, id: string): boolean => {
  if (!store[slotName]) {
    return false;
  }
  
  const initialLength = store[slotName].length;
  store[slotName] = store[slotName].filter(item => item.id !== id);
  
  const wasRemoved = initialLength !== store[slotName].length;
  
  if (wasRemoved) {
    notifyListeners();
  }
  
  return wasRemoved;
};

/**
 * Registers a component asynchronously to a named slot
 * @param slotName - The name of the slot to register to
 * @param componentPromise - Promise that resolves to the component to render
 * @param options - Options for the registration
 * @returns A promise that resolves to the registration ID
 */
export const registerSlotAsync = async (
  slotName: string,
  componentPromise: Promise<ReactNode>,
  options: SlotRegistrationOptions = {}
): Promise<string> => {
  try {
    const component = await componentPromise;
    return registerSlot(slotName, component, options);
  } catch (error) {
    console.error(`Failed to register slot ${slotName} asynchronously:`, error);
    throw error;
  }
};

/**
 * Gets all registered components for a slot
 * @param slotName - The name of the slot
 * @returns Array of slot registrations
 */
export const getSlotComponents = (slotName: string): SlotRegistration[] => {
  return store[slotName] || [];
};

/**
 * Subscribe to store changes
 * @param listener - Callback function that is called when the store changes
 * @returns Unsubscribe function
 */
export const subscribe = (listener: () => void): (() => void) => {
  listeners.push(listener);
  
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

/**
 * Gets the current store snapshot
 * @returns Current store state
 */
export const getSnapshot = (): SlotStore => {
  return store;
};

/**
 * For testing: resets the store to empty
 * @internal
 */
export const _resetStore = (): void => {
  store = {};
  listeners = [];
  notifyListeners();
}; 