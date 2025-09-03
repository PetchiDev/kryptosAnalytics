<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import ChartJSBarChart from '$lib/components/charts/ChartJSBarChart.svelte';
  import { categoryData } from '$lib/stores/data.js';
  import { BarChart } from 'lucide-svelte';
  import MotionDiv from '$lib/components/MotionDiv.svelte';
  import MotionButton from '$lib/components/MotionButton.svelte';
  import MotionCard from '$lib/components/MotionCard.svelte';
  
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
  
  // Initialize store with sample data immediately
  categoryData.set(sampleData);
  
  onMount(() => {
    // Ensure data is set on mount as well
    if ($categoryData.length === 0) {
      categoryData.set(sampleData);
    }
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
<MotionDiv 
  class="mb-8"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div class="flex items-center space-x-4 mb-4">
    <MotionDiv 
      class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <BarChart class="w-6 h-6 text-white" />
    </MotionDiv>
    <div>
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Category Analysis
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Modern Chart.js bar chart with beautiful gradients and interactive features
        </p>
      </MotionDiv>
    </div>
  </div>
</MotionDiv>

<!-- Controls section -->
<MotionCard 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-dark-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center space-x-4">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Data Controls
        </h2>
      </MotionDiv>
    </div>
    
    <div class="flex items-center space-x-3">
      <MotionButton
        on:click={addCategory}
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
        whileTap={{ scale: 0.95 }}
      >
        ➕ Add Category
      </MotionButton>
      
      <MotionButton
        on:click={removeCategory}
        disabled={!selectedCategory}
        class="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
        whileTap={{ scale: 0.95 }}
      >
        🗑️ Remove Selected
      </MotionButton>
      
      <MotionButton
        on:click={shuffleData}
        class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileHover={{ scale: 1.05, backgroundColor: "#9333ea" }}
        whileTap={{ scale: 0.95 }}
      >
        🔀 Shuffle Data
      </MotionButton>
      
      <MotionButton
        on:click={resetData}
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        whileHover={{ scale: 1.05, backgroundColor: "#6b7280" }}
        whileTap={{ scale: 0.95 }}
      >
        🔄 Reset Data
      </MotionButton>
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
</MotionCard>

<!-- Stats cards -->
<MotionDiv 
  class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <MotionCard
    class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    whileHover={{ y: -5, scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" }}
  >
    <h3 class="text-sm font-medium opacity-90 mb-1">Total Categories</h3>
    <MotionDiv
      class="text-2xl font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
    >
      {$categoryData.length}
    </MotionDiv>
    <p class="text-sm opacity-75 mt-1">Active categories</p>
  </MotionCard>
  
  <MotionCard
    class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    whileHover={{ y: -5, scale: 1.05, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.3)" }}
  >
    <h3 class="text-sm font-medium opacity-90 mb-1">Total Value</h3>
    <MotionDiv
      class="text-2xl font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
    >
      {$categoryData.reduce((sum, d) => sum + d.value, 0)}%
    </MotionDiv>
    <p class="text-sm opacity-75 mt-1">Combined percentage</p>
  </MotionCard>
  
  <MotionCard
    class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    whileHover={{ y: -5, scale: 1.05, boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.3)" }}
  >
    <h3 class="text-sm font-medium opacity-90 mb-1">Highest Value</h3>
    <MotionDiv
      class="text-2xl font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 }}
    >
      {Math.max(...$categoryData.map(d => d.value))}%
    </MotionDiv>
    <p class="text-sm opacity-75 mt-1">Top category</p>
  </MotionCard>
  
  <MotionCard
    class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    whileHover={{ y: -5, scale: 1.05, boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.3)" }}
  >
    <h3 class="text-sm font-medium opacity-90 mb-1">Average Value</h3>
    <MotionDiv
      class="text-2xl font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
    >
      {Math.round($categoryData.reduce((sum, d) => sum + d.value, 0) / $categoryData.length)}%
    </MotionDiv>
    <p class="text-sm opacity-75 mt-1">Mean percentage</p>
  </MotionCard>
</MotionDiv>

<!-- Main chart -->
<MotionCard 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Category Distribution
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Beautiful Chart.js bar chart with gradient fills and smooth animations
        </p>
      </MotionDiv>
      <MotionDiv
        class="flex items-center space-x-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MotionDiv 
          class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
        ></MotionDiv>
        <span class="text-sm text-gray-600 dark:text-gray-400">Interactive Bars</span>
      </MotionDiv>
    </div>
  </div>
  
  <!-- Debug: Show data info -->
  <MotionDiv 
    class="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.6 }}
  >
    <p class="text-sm text-gray-600 dark:text-gray-400">
      <strong>Data Status:</strong> {$categoryData.length} items loaded
      {#if $categoryData.length > 0}
        | First item: {$categoryData[0].category} - Value: {$categoryData[0].value}%
      {/if}
    </p>
  </MotionDiv>
  
  <!-- Bar chart component -->
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
  >
    <ChartJSBarChart 
      data={$categoryData} 
      width={800} 
      height={400}
      animated={true}
    />
  </MotionDiv>
</MotionCard>

<!-- Category details -->
<MotionCard 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700 mt-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
>
  <div class="flex items-center justify-between mb-4">
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Category Details
      </h2>
    </MotionDiv>
    <MotionButton
      on:click={() => showDetails = !showDetails}
      class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showDetails ? 'Hide Details' : 'Show Details'}
    </MotionButton>
  </div>
  
  {#if showDetails}
    <MotionDiv 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      {#each $categoryData as item, index}
        <MotionCard
          class="p-4 rounded-lg border border-gray-200 dark:border-dark-700 cursor-pointer w-full text-left
            {selectedCategory === item.category ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}"
          on:click={() => selectedCategory = selectedCategory === item.category ? '' : item.category}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
          whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div class="flex items-center space-x-3 mb-2">
            <MotionDiv 
              class="w-4 h-4 rounded-full"
              style="background-color: {item.color}"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + (index * 0.1), type: "spring", stiffness: 200 }}
            ></MotionDiv>
            <h3 class="font-medium text-gray-900 dark:text-white">{item.category}</h3>
          </div>
          <MotionDiv
            class="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 + (index * 0.1), type: "spring", stiffness: 200 }}
          >
            {item.value}%
          </MotionDiv>
          <div class="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
            <MotionDiv 
              class="h-2 rounded-full"
              style="background-color: {item.color}"
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 0.8, delay: 1.2 + (index * 0.1), ease: "easeOut" }}
            ></MotionDiv>
          </div>
        </MotionCard>
      {/each}
    </MotionDiv>
  {/if}
</MotionCard>


