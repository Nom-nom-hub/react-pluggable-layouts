# React Pluggable Layouts

[![npm version](https://img.shields.io/npm/v/react-pluggable-layouts.svg)](https://www.npmjs.com/package/react-pluggable-layouts)
[![license](https://img.shields.io/npm/l/react-pluggable-layouts.svg)](https://github.com/Nom-nom-hub/react-pluggable-layouts/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Nom-nom-hub/react-pluggable-layouts/pulls)

A powerful and flexible plugin architecture for React applications that enables dynamic component rendering in predefined layout slots. This package allows React apps to define layout "slots" (like "Sidebar", "Header", etc.) where other components can dynamically register their content.

Inspired by WordPress's pluggable architecture, React Pluggable Layouts gives you the power to create truly extensible React applications.

## Features

- 🧩 **Flexible Layout System** - Define slots anywhere in your UI that can be filled dynamically
- 🔄 **Dynamic Component Registration** - Register and unregister components at runtime from anywhere
- 🔢 **Priority-Based Ordering** - Control the order of components within each slot
- 🪝 **React Hooks Integration** - Simple hooks API to access slot contents
- ⚡ **Asynchronous Support** - Register components asynchronously for code-splitting or lazy loading
- 🖥️ **SSR Compatible** - Works with server-side rendering out of the box
- 📦 **Zero Dependencies** - Lightweight with no external runtime dependencies
- 📝 **Fully Typed API** - Complete TypeScript support

## Installation

```bash
# With npm
npm install react-pluggable-layouts

# With yarn
yarn add react-pluggable-layouts

# With pnpm
pnpm add react-pluggable-layouts
```

## Quick Start

```jsx
// 1. Wrap your app with SlotProvider
import { SlotProvider } from 'react-pluggable-layouts';

function App() {
  return (
    <SlotProvider>
      <AppLayout />
    </SlotProvider>
  );
}

// 2. Define slots in your layout
import { Slot } from 'react-pluggable-layouts';

function AppLayout() {
  return (
    <div>
      <header>
        <Slot name="header" fallback={<DefaultHeader />} />
      </header>
      <main>
        <Slot name="main-content" />
      </main>
    </div>
  );
}

// 3. Register components to slots
import { registerSlot, unregisterSlot } from 'react-pluggable-layouts';

function MyFeature() {
  useEffect(() => {
    const id = registerSlot('header', <CustomHeader />, { priority: 5 });
    return () => unregisterSlot('header', id);
  }, []);
  
  return <YourFeatureContent />;
}
```

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

## Common Use Cases

### Creating a Plugin System

```jsx
// PluginRegistry.js
import { registerSlot, registerSlotAsync } from 'react-pluggable-layouts';

export const registerPlugin = async (pluginModule) => {
  // Register each component to its corresponding slot
  const ids = [];
  
  if (pluginModule.headerComponent) {
    ids.push(registerSlot('header', pluginModule.headerComponent, 
      { priority: pluginModule.headerPriority || 10 }));
  }
  
  if (pluginModule.sidebarComponents) {
    for (const component of pluginModule.sidebarComponents) {
      ids.push(registerSlot('sidebar', component.element, 
        { priority: component.priority || 10 }));
    }
  }
  
  // Handle async components
  if (pluginModule.asyncMainComponent) {
    const id = await registerSlotAsync('main', pluginModule.asyncMainComponent());
    ids.push(id);
  }
  
  return ids;
};
```

### Feature Flags

```jsx
function FeatureFlag({ name, children }) {
  const { isEnabled } = useFeatureFlags();
  
  useEffect(() => {
    // Only register if feature is enabled
    if (isEnabled(name)) {
      const id = registerSlot('features', children);
      return () => unregisterSlot('features', id);
    }
  }, [name, isEnabled, children]);
  
  return null;
}

// Usage
<FeatureFlag name="new-chat-feature">
  <ChatWidget />
</FeatureFlag>

// In your layout
<Slot name="features" />
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

## Browser Support

React Pluggable Layouts works in all modern browsers that support React 18+.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License. See [LICENSE](LICENSE) file for details. 