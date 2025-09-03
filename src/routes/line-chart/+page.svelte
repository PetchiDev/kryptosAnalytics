<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import LineChart from '$lib/components/charts/LineChart.svelte';
  import { salesData, totalSales, averageProfit } from '$lib/stores/data.js';
  import { Play, Pause, Plus, RotateCcw } from 'lucide-svelte';
  
  // Demonstrates Svelte stores and reactivity
  let isPlaying = false;
  let intervalId;
  
  // Sample data for demonstration
  const sampleData = [
    { month: 'Jan', sales: 12000, profit: 8000 },
    { month: 'Feb', sales: 19000, profit: 12000 },
    { month: 'Mar', sales: 30000, profit: 18000 },
    { month: 'Apr', sales: 28000, profit: 16000 },
    { month: 'May', sales: 45000, profit: 25000 },
    { month: 'Jun', sales: 38000, profit: 22000 },
    { month: 'Jul', sales: 52000, profit: 30000 },
    { month: 'Aug', sales: 48000, profit: 28000 },
    { month: 'Sep', sales: 55000, profit: 32000 },
    { month: 'Oct', sales: 62000, profit: 36000 },
    { month: 'Nov', sales: 58000, profit: 34000 },
    { month: 'Dec', sales: 65000, profit: 38000 }
  ];
  
  // Initialize store with sample data
  onMount(() => {
    salesData.set(sampleData);
  });
  
  // Function to add random data point - demonstrates store updates
  function addRandomData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomSales = Math.floor(Math.random() * 50000) + 10000;
    const randomProfit = Math.floor(randomSales * 0.6);
    
    salesData.update(currentData => {
      const newData = [...currentData];
      const existingIndex = newData.findIndex(d => d.month === randomMonth);
      
      if (existingIndex !== -1) {
        newData[existingIndex] = { month: randomMonth, sales: randomSales, profit: randomProfit };
      } else {
        newData.push({ month: randomMonth, sales: randomSales, profit: randomProfit });
      }
      
      return newData.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
    });
  }
  
  // Function to toggle data animation
  function toggleAnimation() {
    if (isPlaying) {
      clearInterval(intervalId);
      isPlaying = false;
    } else {
      intervalId = setInterval(addRandomData, 2000);
      isPlaying = true;
    }
  }
  
  // Function to reset data
  function resetData() {
    salesData.set(sampleData);
  }
  
  // Cleanup interval on component destroy
  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<svelte:head>
  <title>Line Chart - Svelte D3 Analytics</title>
</svelte:head>

<!-- Page header -->
<div 
  class="mb-8"
  in:fly={{ y: -20, duration: 600 }}
  out:fade
>
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
    Sales Trend Analysis
  </h1>
  <p class="text-gray-600 dark:text-gray-400">
    Interactive line chart demonstrating Svelte stores and D3.js integration
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
        Chart Controls
      </h2>
    </div>
    
    <div class="flex items-center space-x-3">
      <button
        on:click={toggleAnimation}
        class="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2
          {isPlaying 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-primary-500 hover:bg-primary-600 text-white'
          }"
      >
        {#if isPlaying}
          <Pause class="w-4 h-4" />
          <span>Stop Animation</span>
        {:else}
          <Play class="w-4 h-4" />
          <span>Start Animation</span>
        {/if}
      </button>
      
      <button
        on:click={addRandomData}
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
      >
        <Plus class="w-4 h-4" />
        <span>Add Data Point</span>
      </button>
      
      <button
        on:click={resetData}
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
      >
        <RotateCcw class="w-4 h-4" />
        <span>Reset Data</span>
      </button>
    </div>
  </div>
</div>

<!-- Stats cards -->
<div 
  class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
  in:fly={{ y: 20, duration: 600, delay: 200 }}
  out:fade
>
  <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Total Sales</h3>
    <div class="text-2xl font-bold">
      ${$totalSales.toLocaleString()}
    </div>
    <p class="text-sm opacity-75 mt-1">All time revenue</p>
  </div>
  
  <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Average Profit</h3>
    <div class="text-2xl font-bold">
      ${Math.round($averageProfit).toLocaleString()}
    </div>
    <p class="text-sm opacity-75 mt-1">Monthly average</p>
  </div>
  
  <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
    <h3 class="text-sm font-medium opacity-90 mb-1">Data Points</h3>
    <div class="text-2xl font-bold">
      {$salesData.length}
    </div>
    <p class="text-sm opacity-75 mt-1">Current records</p>
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
      Monthly Sales Performance
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      This chart demonstrates Svelte stores reactivity - watch how the chart updates automatically when data changes!
    </p>
  </div>
  
  <!-- Line chart component -->
  <LineChart 
    data={$salesData} 
    width={800} 
    height={400}
    color="#3b82f6"
    animated={true}
  />
</div>

<!-- Data table -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700 mt-6"
  in:fly={{ y: 20, duration: 600, delay: 400 }}
  out:fade
>
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Raw Data
  </h2>
  
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200 dark:border-dark-700">
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Month</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Sales</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Profit</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Margin</th>
        </tr>
      </thead>
      <tbody>
        {#each $salesData as item}
          <tr class="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200">
            <td class="py-3 px-4 text-gray-900 dark:text-white font-medium">{item.month}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">${item.sales.toLocaleString()}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">${item.profit.toLocaleString()}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">
              {Math.round((item.profit / item.sales) * 100)}%
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<!-- Svelte features explanation -->
<div 
  class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-200 dark:border-blue-800"
  in:fly={{ y: 20, duration: 600, delay: 500 }}
  out:fade
>
  <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
    🎯 Svelte Features Demonstrated
  </h3>
  <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
    <li><strong>Stores:</strong> Using writable stores for global state management (salesData, totalSales, averageProfit)</li>
    <li><strong>Reactivity:</strong> Chart automatically updates when store data changes</li>
    <li><strong>Derived Stores:</strong> totalSales and averageProfit are computed from salesData</li>
    <li><strong>Transitions:</strong> Smooth page transitions and component animations</li>
    <li><strong>Event Handling:</strong> Button clicks trigger store updates</li>
    <li><strong>Lifecycle:</strong> onMount and onDestroy for setup and cleanup</li>
  </ul>
</div>
