# react-pluggable-layouts

A React package for pluggable layout slots with dynamic component registration. 
This package allows React apps to define layout "slots" (like "Sidebar", "Header", etc.) where other components can dynamically register their content.

## Installation

```bash
npm install react-pluggable-layouts
# or
yarn add react-pluggable-layouts
```

## Overview

React Pluggable Layouts provides a WordPress-like plugin architecture for React applications. It enables:

- Dynamic registration of components into named "slots" in your layout
- Priority-based ordering of registered components
- Registration from both inside and outside React components
- Clean unregistration for cleanup
- Support for async component registration
- SSR compatibility out of the box

## Usage

### Basic Setup

Wrap your application with the `SlotProvider`:

```jsx
import { SlotProvider } from 'react-pluggable-layouts';

function App() {
  return (
    <SlotProvider>
      <YourAppComponents />
    </SlotProvider>
  );
}
```

### Defining Slots

Create slots where components can register themselves:

```jsx
import { Slot } from 'react-pluggable-layouts';

function Layout() {
  return (
    <div className="layout">
      <header>
        <Slot name="header" fallback={<DefaultHeader />} />
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <Slot name="sidebar" />
        </aside>
        
        <main>
          <Slot name="main-content" />
        </main>
      </div>
      
      <footer>
        <Slot name="footer" />
      </footer>
    </div>
  );
}
```

### Registering Components to Slots

Register components to slots from any React component:

```jsx
import { useEffect } from 'react';
import { registerSlot, unregisterSlot } from 'react-pluggable-layouts';

function MyPlugin() {
  useEffect(() => {
    // Register a component to the "sidebar" slot with priority 5 (lower = higher priority)
    const id = registerSlot('sidebar', <MyPluginSidebar />, { priority: 5 });
    
    // Clean up when the component unmounts
    return () => {
      unregisterSlot('sidebar', id);
    };
  }, []);
  
  return null; // This component doesn't render anything itself
}
```

Register components from outside React components (like initialization code):

```jsx
import { registerSlot } from 'react-pluggable-layouts';

// Register a component to the "header" slot
const headerId = registerSlot('header', <GlobalHeader />);

// Later, if needed:
// unregisterSlot('header', headerId);
```

### Advanced: Asynchronous Registration

Register components asynchronously:

```jsx
import { registerSlotAsync } from 'react-pluggable-layouts';

// Using dynamic imports
registerSlotAsync('footer', 
  import('./FooterComponent').then(module => <module.Footer />),
  { priority: 10 }
).then(id => {
  console.log('Footer registered with ID:', id);
});
```

### Using the `useSlot` Hook

Access slot contents manually:

```jsx
import { useSlot } from 'react-pluggable-layouts';

function SlotDebugger() {
  const sidebarComponents = useSlot('sidebar');
  
  return (
    <div>
      <h2>Sidebar Components ({sidebarComponents.length})</h2>
      <ul>
        {sidebarComponents.map(registration => (
          <li key={registration.id}>
            ID: {registration.id}, Priority: {registration.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Components

#### `<SlotProvider>`

Provider component that must wrap any part of your app that uses slots.

Props:
- `children`: React nodes to be rendered.

#### `<Slot>`

Component that renders all registered components for a specific slot name.

Props:
- `name`: (string, required) The name of the slot.
- `fallback`: (ReactNode, optional) Content to display if no components are registered.
- `wrapper`: (Component, optional) Component to wrap around all slot content.
- `slotProps`: (object, optional) Props to pass to each registered component.

### Hooks

#### `useSlot(name)`

Hook to access components registered to a slot.

Parameters:
- `name`: (string) The name of the slot to access.

Returns: Array of slot registrations, each containing:
- `id`: Unique ID for the registration.
- `component`: The registered React component.
- `priority`: Priority number (lower = higher priority).

### Functions

#### `registerSlot(slotName, component, options)`

Registers a component to a slot.

Parameters:
- `slotName`: (string) Name of the slot to register to.
- `component`: (ReactNode) Component to render in the slot.
- `options`: (object, optional)
  - `priority`: (number) Priority for ordering (default: 10).
  - `id`: (string) Custom ID for this registration.

Returns: A string ID that can be used to unregister later.

#### `registerSlotAsync(slotName, componentPromise, options)`

Asynchronously registers a component to a slot.

Parameters:
- `slotName`: (string) Name of the slot to register to.
- `componentPromise`: (Promise<ReactNode>) Promise that resolves to a component.
- `options`: Same as for `registerSlot`.

Returns: A Promise that resolves to the registration ID.

#### `unregisterSlot(slotName, id)`

Unregisters a component from a slot.

Parameters:
- `slotName`: (string) Name of the slot.
- `id`: (string) ID of the registration to remove.

Returns: Boolean indicating if a component was successfully unregistered.

## License

MIT License. See [LICENSE](LICENSE) file for details. 