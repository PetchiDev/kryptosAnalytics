<script>
  import { onMount, setContext } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import InteractivePieChart from '$lib/components/InteractivePieChart.svelte';
  import DraggableCard from '$lib/components/DraggableCard.svelte';
  import { createChartContext } from '$lib/contexts/ChartContext.js';
  import { categoryData } from '$lib/stores/data.js';
  
  // Create and set chart context
  const chartContext = createChartContext();
  setContext('chart-context', chartContext);
  
  // Local state
  let selectedData = null;
  let hoveredData = null;
  let animationSpeed = 1000;
  let showCards = true;
  let customEventLog = [];
  
  // Sample data
  const sampleData = [
    { category: 'Electronics', value: 35, color: '#3b82f6' },
    { category: 'Clothing', value: 25, color: '#ef4444' },
    { category: 'Books', value: 20, color: '#10b981' },
    { category: 'Home & Garden', value: 15, color: '#f59e0b' },
    { category: 'Sports', value: 5, color: '#8b5cf6' }
  ];
  
  // Initialize data
  onMount(() => {
    categoryData.set(sampleData);
    
    // Subscribe to chart context changes
    chartContext.chartStore.subscribe(state => {
      selectedData = state.selectedData;
      hoveredData = state.hoveredData;
      animationSpeed = state.animationSpeed;
    });
  });
  
  // Custom event handlers
  function handleSegmentHover(event) {
    const timestamp = new Date().toLocaleTimeString();
    customEventLog = [
      { type: 'hover', data: event.detail.data, timestamp },
      ...customEventLog.slice(0, 9) // Keep only last 10 events
    ];
  }
  
  function handleSegmentClick(event) {
    const timestamp = new Date().toLocaleTimeString();
    customEventLog = [
      { type: 'click', data: event.detail.data, timestamp },
      ...customEventLog.slice(0, 9)
    ];
  }
  
  function handleSegmentLeave(event) {
    const timestamp = new Date().toLocaleTimeString();
    customEventLog = [
      { type: 'leave', data: event.detail.data, timestamp },
      ...customEventLog.slice(0, 9)
    ];
  }
  
  // Animation speed controls
  function updateAnimationSpeed(speed) {
    chartContext.setAnimationSpeed(speed);
  }
  
  // Add new data point
  function addDataPoint() {
    const categories = ['Automotive', 'Health', 'Beauty', 'Toys'];
    const colors = ['#ec4899', '#06b6d4', '#84cc16', '#f97316'];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomValue = Math.floor(Math.random() * 20) + 5;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    categoryData.update(currentData => {
      const newData = [...currentData];
      const existingIndex = newData.findIndex(d => d.category === randomCategory);
      
      if (existingIndex !== -1) {
        newData[existingIndex] = { 
          category: randomCategory, 
          value: randomValue, 
          color: randomColor 
        };
      } else {
        newData.push({ 
          category: randomCategory, 
          value: randomValue, 
          color: randomColor 
        });
      }
      
      return newData;
    });
  }
</script>

<svelte:head>
  <title>Advanced Features - Svelte D3 Analytics</title>
</svelte:head>

<!-- Page header -->
<div 
  class="mb-8"
  in:fly={{ y: -20, duration: 600 }}
  out:fade
>
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
    Advanced Svelte Features
  </h1>
  <p class="text-gray-600 dark:text-gray-400">
    Demonstrating Svelte actions, context API, custom events, and advanced interactions
  </p>
</div>

<!-- Controls section -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-dark-700"
  in:fly={{ y: 20, duration: 600, delay: 100 }}
  out:fade
>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center space-x-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Advanced Controls
      </h2>
    </div>
    
    <div class="flex items-center space-x-3">
             <div class="flex items-center space-x-2">
         <label for="animation-speed" class="text-sm font-medium text-gray-700 dark:text-gray-300">Animation Speed:</label>
         <input 
           id="animation-speed"
           type="range" 
           min="100" 
           max="3000" 
           step="100"
           bind:value={animationSpeed}
           on:input={() => updateAnimationSpeed(animationSpeed)}
           class="w-24"
         />
         <span class="text-sm text-gray-600 dark:text-gray-400">{animationSpeed}ms</span>
       </div>
      
      <button
        on:click={addDataPoint}
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        ➕ Add Data
      </button>
      
      <button
        on:click={() => showCards = !showCards}
        class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        {showCards ? 'Hide' : 'Show'} Cards
      </button>
    </div>
  </div>
</div>

<!-- Main content grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  <!-- Interactive Pie Chart -->
  <div 
    class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
    in:fly={{ x: -20, duration: 600, delay: 200 }}
    out:fade
  >
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Interactive Pie Chart
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
      Hover and click on segments to see custom events and context updates
    </p>
    
    <InteractivePieChart 
      data={$categoryData}
      width={400}
      height={400}
      animated={true}
      on:segmentHover={handleSegmentHover}
      on:segmentClick={handleSegmentClick}
      on:segmentLeave={handleSegmentLeave}
    />
  </div>
  
  <!-- Context Information -->
  <div 
    class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
    in:fly={{ x: 20, duration: 600, delay: 200 }}
    out:fade
  >
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Context State
    </h2>
    
    <div class="space-y-4">
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Selected Data</h3>
        {#if selectedData}
          <div class="text-sm text-blue-800 dark:text-blue-200">
            <div><strong>Category:</strong> {selectedData.category}</div>
            <div><strong>Value:</strong> {selectedData.value}%</div>
            <div class="flex items-center space-x-2 mt-2">
              <div 
                class="w-4 h-4 rounded-full"
                style="background-color: {selectedData.color}"
              ></div>
              <span>Color: {selectedData.color}</span>
            </div>
          </div>
        {:else}
          <p class="text-sm text-blue-600 dark:text-blue-400">No data selected</p>
        {/if}
      </div>
      
      <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 class="font-medium text-green-900 dark:text-green-100 mb-2">Hovered Data</h3>
        {#if hoveredData}
          <div class="text-sm text-green-800 dark:text-green-200">
            <div><strong>Category:</strong> {hoveredData.category}</div>
            <div><strong>Value:</strong> {hoveredData.value}%</div>
          </div>
        {:else}
          <p class="text-sm text-green-600 dark:text-green-400">No data hovered</p>
        {/if}
      </div>
      
      <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 class="font-medium text-purple-900 dark:text-purple-100 mb-2">Animation Speed</h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Current speed: {animationSpeed}ms
        </p>
      </div>
    </div>
  </div>
</div>

<!-- Draggable Cards Section -->
{#if showCards}
  <div 
    class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700 mb-6 relative min-h-96"
    in:scale={{ duration: 600, delay: 300, easing: quintOut }}
    out:fade
  >
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Draggable Cards (Svelte Actions)
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
      Drag these cards around! Demonstrates custom Svelte actions for drag functionality and click-outside detection.
    </p>
    
    <!-- Draggable cards -->
    <DraggableCard 
      title="Action Demo 1"
      content="This card demonstrates the dragAction. Try dragging it around!"
      color="primary"
      initialX={50}
      initialY={50}
    />
    
    <DraggableCard 
      title="Action Demo 2"
      content="Another draggable card with click-outside detection."
      color="success"
      initialX={200}
      initialY={100}
    />
    
    <DraggableCard 
      title="Action Demo 3"
      content="Click outside any card to deselect it."
      color="warning"
      initialX={100}
      initialY={200}
    />
  </div>
{/if}

<!-- Custom Events Log -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
  in:fly={{ y: 20, duration: 600, delay: 400 }}
  out:fade
>
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Custom Events Log
  </h2>
  <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
    Interact with the pie chart above to see custom events being dispatched and logged here.
  </p>
  
  <div class="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 max-h-64 overflow-y-auto">
    {#if customEventLog.length > 0}
      <div class="space-y-2">
        {#each customEventLog as event, index}
          <div 
            class="flex items-center justify-between p-2 bg-white dark:bg-dark-600 rounded border-l-4
              {event.type === 'hover' ? 'border-blue-500' : 
               event.type === 'click' ? 'border-green-500' : 
               'border-orange-500'}"
            in:fly={{ x: -20, duration: 300, delay: index * 50 }}
          >
            <div>
              <span class="font-medium text-gray-900 dark:text-white">
                {event.type.toUpperCase()}
              </span>
              <span class="text-gray-600 dark:text-gray-400 ml-2">
                {event.data.category} ({event.data.value}%)
              </span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {event.timestamp}
            </span>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-500 dark:text-gray-400 text-center py-8">
        No events yet. Interact with the pie chart to see events here!
      </p>
    {/if}
  </div>
</div>

<!-- Svelte Features Explanation -->
<div 
  class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 mt-6 border border-purple-200 dark:border-purple-800"
  in:fly={{ y: 20, duration: 600, delay: 500 }}
  out:fade
>
  <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
   Advanced Kryptos Features Demonstrated
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div>
      <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Context API</h4>
      <ul class="space-y-1 text-purple-700 dark:text-purple-300">
        <li>• Chart context for sharing state between components</li>
        <li>• setContext/getContext for dependency injection</li>
        <li>• Reactive context updates across component tree</li>
      </ul>
    </div>
    <div>
      <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Custom Actions</h4>
      <ul class="space-y-1 text-purple-700 dark:text-purple-300">
        <li>• dragAction for drag and drop functionality</li>
        <li>• clickOutsideAction for outside click detection</li>
        <li>• Reusable actions with lifecycle management</li>
      </ul>
    </div>
    <div>
      <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Custom Events</h4>
      <ul class="space-y-1 text-purple-700 dark:text-purple-300">
        <li>• createEventDispatcher for component communication</li>
        <li>• segmentHover, segmentClick, segmentLeave events</li>
        <li>• Event logging and real-time updates</li>
      </ul>
    </div>
    <div>
      <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Advanced Interactions</h4>
      <ul class="space-y-1 text-purple-700 dark:text-purple-300">
        <li>• D3.js integration with Svelte reactivity</li>
        <li>• Dynamic chart updates and animations</li>
        <li>• Complex state management patterns</li>
      </ul>
    </div>
  </div>
</div>
