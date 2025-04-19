import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { 
  registerSlot, 
  unregisterSlot, 
  getSlotComponents, 
  subscribe,
  _resetStore,
  registerSlotAsync
} from '../src/store';

describe('Slot Store', () => {
  beforeEach(() => {
    _resetStore(); // Reset store before each test
  });
  
  describe('registerSlot', () => {
    it('should register a component to a slot', () => {
      const component = <div>Test Component</div>;
      const id = registerSlot('test-slot', component);
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent).toHaveLength(1);
      expect(slotContent[0].component).toBe(component);
      expect(slotContent[0].id).toBe(id);
      expect(slotContent[0].priority).toBe(10); // Default priority
    });
    
    it('should register a component with custom priority', () => {
      const component = <div>Test Component</div>;
      const id = registerSlot('test-slot', component, { priority: 5 });
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent[0].priority).toBe(5);
    });
    
    it('should register a component with custom ID', () => {
      const component = <div>Test Component</div>;
      const customId = 'custom-id';
      const returnedId = registerSlot('test-slot', component, { id: customId });
      
      expect(returnedId).toBe(customId);
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent[0].id).toBe(customId);
    });
    
    it('should update a component if same ID is used', () => {
      const component1 = <div>Component 1</div>;
      const component2 = <div>Component 2</div>;
      const id = registerSlot('test-slot', component1);
      
      registerSlot('test-slot', component2, { id });
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent).toHaveLength(1);
      expect(slotContent[0].component).toBe(component2);
    });
    
    it('should sort components by priority', () => {
      const component1 = <div>Component 1</div>;
      const component2 = <div>Component 2</div>;
      const component3 = <div>Component 3</div>;
      
      registerSlot('test-slot', component1, { priority: 10 });
      registerSlot('test-slot', component2, { priority: 5 });
      registerSlot('test-slot', component3, { priority: 15 });
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent).toHaveLength(3);
      expect(slotContent[0].component).toBe(component2); // priority 5 (lowest)
      expect(slotContent[1].component).toBe(component1); // priority 10
      expect(slotContent[2].component).toBe(component3); // priority 15 (highest)
    });

    it('should notify listeners when registering', () => {
      const listener = vi.fn();
      subscribe(listener);
      
      registerSlot('test-slot', <div>Test</div>);
      
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('unregisterSlot', () => {
    it('should unregister a component from a slot', () => {
      const component = <div>Test Component</div>;
      const id = registerSlot('test-slot', component);
      
      const result = unregisterSlot('test-slot', id);
      
      expect(result).toBe(true);
      expect(getSlotComponents('test-slot')).toHaveLength(0);
    });
    
    it('should return false if slot doesn\'t exist', () => {
      const result = unregisterSlot('non-existent-slot', 'some-id');
      expect(result).toBe(false);
    });
    
    it('should return false if id doesn\'t exist in slot', () => {
      registerSlot('test-slot', <div>Test</div>);
      
      const result = unregisterSlot('test-slot', 'non-existent-id');
      expect(result).toBe(false);
    });
    
    it('should notify listeners when unregistering', () => {
      const component = <div>Test Component</div>;
      const id = registerSlot('test-slot', component);
      
      const listener = vi.fn();
      subscribe(listener);
      
      unregisterSlot('test-slot', id);
      
      expect(listener).toHaveBeenCalledTimes(1);
    });
    
    it('should not notify listeners if nothing was unregistered', () => {
      const listener = vi.fn();
      subscribe(listener);
      
      unregisterSlot('test-slot', 'non-existent-id');
      
      expect(listener).not.toHaveBeenCalled();
    });
  });
  
  describe('subscribe', () => {
    it('should add a listener and return unsubscribe function', () => {
      const listener = vi.fn();
      const unsubscribe = subscribe(listener);
      
      registerSlot('test-slot', <div>Test</div>);
      expect(listener).toHaveBeenCalledTimes(1);
      
      unsubscribe();
      registerSlot('test-slot', <div>Test 2</div>);
      expect(listener).toHaveBeenCalledTimes(1); // Still 1, not called again
    });
  });
  
  describe('registerSlotAsync', () => {
    it('should register a component asynchronously', async () => {
      const componentPromise = Promise.resolve(<div>Async Component</div>);
      
      const id = await registerSlotAsync('test-slot', componentPromise);
      
      const slotContent = getSlotComponents('test-slot');
      expect(slotContent).toHaveLength(1);
      expect(slotContent[0].id).toBe(id);
    });
    
    it('should handle rejected promises', async () => {
      const error = new Error('Test error');
      const componentPromise = Promise.reject(error);
      
      await expect(registerSlotAsync('test-slot', componentPromise))
        .rejects.toThrow(error);
        
      expect(getSlotComponents('test-slot')).toHaveLength(0);
    });
  });
  
  describe('getSlotComponents', () => {
    it('should return an empty array for non-existent slots', () => {
      const components = getSlotComponents('non-existent-slot');
      expect(components).toEqual([]);
    });
  });
}); 