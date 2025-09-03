<script>
  import AnimatedCounter from './AnimatedCounter.svelte';
  import { fly, fade } from 'svelte/transition';
  
  // Props - demonstrates Svelte component props
  export let title = '';
  export let value = 0;
  export let change = 0;
  export let icon = null; // Now expects a Lucide icon component
  export let color = 'primary';
  export let delay = 0;
  export let prefix = '';
  export let suffix = '';
  
  // Color variants for different metric types
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-orange-500 to-orange-600',
    danger: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  };
  
  // Determines if change is positive or negative
  $: isPositive = change >= 0;
  $: changeColor = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  $: changeIcon = isPositive ? '↗' : '↘';
</script>

<!-- Metric card with Svelte transitions -->
<div 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
  in:fly={{ y: 20, duration: 600, delay }}
  out:fade
>
  <!-- Header with icon and title -->
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center space-x-3">
      <div class="w-12 h-12 bg-gradient-to-r {colorClasses[color]} rounded-lg flex items-center justify-center shadow-lg">
        {#if icon}
          <svelte:component this={icon} size={24} class="text-white" />
        {/if}
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
    </div>
  </div>
  
  <!-- Value with animated counter -->
  <div class="mb-2">
    <AnimatedCounter {value} {prefix} {suffix} />
  </div>
  
  <!-- Change indicator -->
  <div class="flex items-center space-x-1">
    <span class="text-sm {changeColor} font-medium">
      {changeIcon} {Math.abs(change)}%
    </span>
    <span class="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
  </div>
  
  <!-- Progress bar -->
  <div class="mt-4 w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
    <div 
      class="bg-gradient-to-r {colorClasses[color]} h-2 rounded-full transition-all duration-1000"
      style="width: {Math.min(Math.abs(change) * 10, 100)}%"
    ></div>
  </div>
</div>
