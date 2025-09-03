# Svelte D3 Dashboard

A comprehensive SvelteKit application demonstrating all major Svelte features with D3.js visualizations, modern UI components, and responsive design.

## 🚀 Features

### Pages
1. **Dashboard** - Animated counters and Svelte transitions
2. **Line Chart** - D3 line chart with Svelte stores for dynamic data (SSR)
3. **Bar Chart** - D3 bar chart with sorting/filtering interactions (CSR)
4. **Advanced Features** - Svelte actions, context API, custom events with D3 pie chart

### Svelte Features Demonstrated
- ✅ **Reactivity** - Automatic UI updates when data changes
- ✅ **Stores** - Global state management with writable and derived stores
- ✅ **Transitions** - Smooth animations and page transitions
- ✅ **Actions** - Custom drag and click-outside actions
- ✅ **Context API** - Component communication and dependency injection
- ✅ **Custom Events** - Event dispatching and handling
- ✅ **Lifecycle** - onMount, onDestroy for setup and cleanup
- ✅ **Component Props** - Data passing between components
- ✅ **Conditional Rendering** - Dynamic UI based on state
- ✅ **Event Handling** - User interactions and form handling

### D3.js Visualizations
- 📈 **Line Chart** - Animated sales trends with interactive data points
- 📊 **Bar Chart** - Category analysis with sorting and filtering
- 🥧 **Pie Chart** - Interactive segments with hover effects and custom events

### UI/UX Features
- 🎨 **Modern Design** - Futuristic UI with glass morphism effects
- 🌙 **Dark/Light Theme** - Global theme switching with persistence
- 📱 **Responsive Layout** - Mobile-first design with sidebar navigation
- ⚡ **Smooth Animations** - CSS transitions and Svelte motion
- 🎯 **Interactive Elements** - Hover effects, drag & drop, click interactions

## 🛠️ Technology Stack

- **Framework**: SvelteKit with file-based routing
- **Styling**: Tailwind CSS with custom animations
- **Visualizations**: D3.js v7
- **State Management**: Svelte stores
- **Build Tool**: Vite
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── LineChart.svelte
│   │   │   ├── BarChart.svelte
│   │   │   └── PieChart.svelte
│   │   ├── InteractivePieChart.svelte
│   │   ├── DraggableCard.svelte
│   │   ├── MetricCard.svelte
│   │   ├── AnimatedCounter.svelte
│   │   ├── Navbar.svelte
│   │   └── Sidebar.svelte
│   ├── stores/
│   │   ├── theme.js
│   │   └── data.js
│   ├── contexts/
│   │   └── ChartContext.js
│   └── actions/
│       ├── dragAction.js
│       └── clickOutsideAction.js
├── routes/
│   ├── +layout.svelte
│   ├── +layout.server.js
│   ├── +page.svelte (Dashboard)
│   ├── line-chart/
│   │   ├── +page.svelte
│   │   └── +page.server.js (SSR)
│   ├── bar-chart/
│   │   ├── +page.svelte
│   │   └── +page.js (CSR)
│   └── advanced/
│       └── +page.svelte
├── app.html
└── app.css
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎯 Key Demonstrations

### Svelte Stores
- Global state management with `writable` stores
- Derived stores for computed values
- Reactive updates across components

### Svelte Actions
- Custom `dragAction` for drag and drop functionality
- `clickOutsideAction` for outside click detection
- Reusable actions with lifecycle management

### Context API
- Chart context for sharing state between components
- Dependency injection with `setContext`/`getContext`
- Reactive context updates

### Custom Events
- Event dispatching with `createEventDispatcher`
- Custom event handling and logging
- Component communication patterns

### D3.js Integration
- Seamless integration with Svelte reactivity
- Animated transitions and interactions
- Dynamic data updates

## 🎨 Design Features

- **Futuristic UI** with gradient backgrounds and glass morphism
- **Responsive Design** that works on all device sizes
- **Dark/Light Theme** with smooth transitions
- **Smooth Animations** using Svelte transitions and CSS
- **Interactive Elements** with hover effects and micro-interactions

## 📊 Data Flow

1. **Stores** manage global application state
2. **Components** subscribe to store changes
3. **D3.js** renders visualizations based on reactive data
4. **Actions** handle user interactions
5. **Context** shares state between related components
6. **Custom Events** enable component communication

## 🔧 Customization

The application is highly customizable:

- Modify color schemes in `tailwind.config.js`
- Add new chart types in `src/lib/components/charts/`
- Extend stores in `src/lib/stores/`
- Create new actions in `src/lib/actions/`
- Add pages using SvelteKit file-based routing

## 📝 Comments

All code includes inline comments explaining:
- Where Svelte features are used
- How D3.js integrates with Svelte
- Component communication patterns
- State management strategies
- Animation and transition techniques

This project serves as a comprehensive example of modern Svelte development with data visualization capabilities.