/**
 * Slot component that renders all components registered under a given name
 */
import React, { Fragment } from 'react';
import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, getSlotComponents } from './store';
import { useSlotContext } from './SlotProvider';

/**
 * Props for the Slot component
 */
export interface SlotProps {
  /**
   * The name of the slot (used for component registration)
   */
  name: string;
  
  /**
   * Optional fallback content if no components are registered
   */
  fallback?: React.ReactNode;
  
  /**
   * Optional wrapper component/element to wrap all slot content
   */
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  
  /**
   * Additional props to pass to each slot component
   */
  slotProps?: Record<string, unknown>;
}

/**
 * Slot component
 * Renders all components registered under a given name
 */
export const Slot: React.FC<SlotProps> = ({ 
  name, 
  fallback = null,
  wrapper: Wrapper,
  slotProps = {}
}) => {
  // Use sync external store to subscribe to changes in the slot store
  useSyncExternalStore(subscribe, getSnapshot);
  
  // Get the slot context to access registered components
  const { getSlotContent } = useSlotContext();
  
  // Get all components registered for this slot name
  const slotContent = getSlotContent(name);

  // If no components are registered, render the fallback
  if (slotContent.length === 0) {
    return <>{fallback}</>;
  }

  // Render all registered components in order
  const content = (
    <>
      {slotContent.map((registration, index) => (
        <Fragment key={registration.id || index}>
          {registration.component}
        </Fragment>
      ))}
    </>
  );

  // If a wrapper is provided, wrap the content
  if (Wrapper) {
    return <Wrapper>{content}</Wrapper>;
  }

  // Otherwise just return the content
  return content;
}; 