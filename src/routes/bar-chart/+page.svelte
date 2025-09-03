<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import BarChart from '$lib/components/charts/BarChart.svelte';
  import { categoryData } from '$lib/stores/data.js';
  
  // Demonstrates Svelte local state and reactivity
  let selectedCategory = '';
  let showDetails = false;
  
  // Sample data for demonstration
  const sampleData = [
    { category: 'Electronics', value: 35, color: '#3b82f6' },
    { category: 'Clothing', value: 25, color: '#ef4444' },
    { category: 'Books', value: 20, color: '#10b981' },
    { category: 'Home & Garden', value: 15, color: '#f59e0b' },
    { category: 'Sports', value: 5, color: '#8b5cf6' }
  ];
  
  // Initialize store with sample data
  onMount(() => {
    categoryData.set(sampleData);
  });
  
  // Function to add new category
  function addCategory() {
    const categories = ['Automotive', 'Health', 'Beauty', 'Toys', 'Furniture'];
    const colors = ['#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomValue = Math.floor(Math.random() * 30) + 5;
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
  
  // Function to remove selected category
  function removeCategory() {
    if (selectedCategory) {
      categoryData.update(currentData => 
        currentData.filter(d => d.category !== selectedCategory)
      );
      selectedCategory = '';
    }
  }
  
  // Function to reset data
  function resetData() {
    categoryData.set(sampleData);
    selectedCategory = '';
  }
  
  // Function to shuffle data
  function shuffleData() {
    categoryData.update(currentData => {
      const shuffled = [...currentData];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }
</script>

<svelte:head>
  <title>Bar Chart - Svelte D3 Analytics</title>
</svelte:head>

<!-- Page header -->
<div 
  class="mb-8"
  in:fly={{ y: -20, duration: 600 }}
  out:fade
>
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
    Category Analysis
  </h1>
  <p class="text-gray-600 dark:text-gray-400">
    Interactive bar chart with sorting and filtering capabilities
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
        Data Controls
      </h2>
    </div>
    
    <div class="flex items-center space-x-3">
      <button
        on:click={addCategory}
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        ➕ Add Category
      </button>
      
      <button
        on:click={removeCategory}
        disabled={!selectedCategory}
        class="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
      >
        🗑️ Remove Selected
      </button>
      
      <button
        on:click={shuffleData}
        class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        🔀 Shuffle Data
      </button>
      
      <button
        on:click={resetData}
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        🔄 Reset Data
      </button>
    </div>
  </div>
  
  <!-- Selection info -->
  {#if selectedCategory}
    <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <p class="text-sm text-blue-800 dark:text-blue-200">
        <strong>Selected:</strong> {selectedCategory}
      </p>
    </div>
  {/if}
</div>

<!-- Stats cards -->
<div 
  class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
  in:fly={{ y: 20, duration: 600, delay: 200 }}
  out:fade
>
  <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Total Categories</h3>
    <div class="text-2xl font-bold">
      {$categoryData.length}
    </div>
    <p class="text-sm opacity-75 mt-1">Active categories</p>
  </div>
  
  <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Total Value</h3>
    <div class="text-2xl font-bold">
      {$categoryData.reduce((sum, d) => sum + d.value, 0)}%
    </div>
    <p class="text-sm opacity-75 mt-1">Combined percentage</p>
  </div>
  
  <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Highest Value</h3>
    <div class="text-2xl font-bold">
      {Math.max(...$categoryData.map(d => d.value))}%
    </div>
    <p class="text-sm opacity-75 mt-1">Top category</p>
  </div>
  
  <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Average Value</h3>
    <div class="text-2xl font-bold">
      {Math.round($categoryData.reduce((sum, d) => sum + d.value, 0) / $categoryData.length)}%
    </div>
    <p class="text-sm opacity-75 mt-1">Mean percentage</p>
  </div>
</div>

<!-- Main chart -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
  in:fly={{ y: 20, duration: 600, delay: 300 }}
  out:fade
>
  <div class="mb-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Category Distribution
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      Click on bars to select categories. Use the controls above to sort and filter the data.
    </p>
  </div>
  
  <!-- Bar chart component -->
  <BarChart 
    data={$categoryData} 
    width={800} 
    height={400}
    animated={true}
  />
</div>

<!-- Category details -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700 mt-6"
  in:fly={{ y: 20, duration: 600, delay: 400 }}
  out:fade
>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      Category Details
    </h2>
    <button
      on:click={() => showDetails = !showDetails}
      class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200"
    >
      {showDetails ? 'Hide Details' : 'Show Details'}
    </button>
  </div>
  
  {#if showDetails}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each $categoryData as item, index}
                 <button 
           class="p-4 rounded-lg border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow duration-200 cursor-pointer w-full text-left
             {selectedCategory === item.category ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}"
           on:click={() => selectedCategory = selectedCategory === item.category ? '' : item.category}
           type="button"
         >
          <div class="flex items-center space-x-3 mb-2">
            <div 
              class="w-4 h-4 rounded-full"
              style="background-color: {item.color}"
            ></div>
            <h3 class="font-medium text-gray-900 dark:text-white">{item.category}</h3>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {item.value}%
          </div>
          <div class="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-500"
              style="width: {item.value}%; background-color: {item.color}"
            ></div>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Svelte features explanation -->
<div 
  class="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mt-6 border border-green-200 dark:border-green-800"
  in:fly={{ y: 20, duration: 600, delay: 500 }}
  out:fade
>
  <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
    🎯 Svelte Features Demonstrated
  </h3>
  <ul class="space-y-2 text-sm text-green-800 dark:text-green-200">
    <li><strong>Local State:</strong> selectedCategory and showDetails demonstrate component-level state</li>
    <li><strong>Reactive Statements:</strong> Chart updates automatically when data changes</li>
    <li><strong>Event Handling:</strong> Click events for category selection and button interactions</li>
    <li><strong>Conditional Rendering:</strong> Show/hide details based on state</li>
    <li><strong>Dynamic Classes:</strong> Conditional styling based on selection state</li>
    <li><strong>Store Updates:</strong> addCategory, removeCategory, shuffleData functions modify store data</li>
  </ul>
</div>
