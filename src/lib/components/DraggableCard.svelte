<script>
  import { dragAction } from '$lib/actions/dragAction.js';
  import { clickOutsideAction } from '$lib/actions/clickOutsideAction.js';
  import { fly, fade } from 'svelte/transition';
  
  // Props
  export let title = '';
  export let content = '';
  export let color = 'primary';
  export let initialX = 0;
  export let initialY = 0;
  
  // Local state
  let x = initialX;
  let y = initialY;
  let isSelected = false;
  let isDragging = false;
  
  // Color variants
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-orange-500 to-orange-600',
    danger: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  };
  
  // Drag handlers
  function handleDragStart({ startX, startY }) {
    isDragging = true;
    console.log('Drag started at:', startX, startY);
  }
  
  function handleDrag({ deltaX, deltaY }) {
    x += deltaX;
    y += deltaY;
  }
  
  function handleDragEnd({ deltaX, deltaY }) {
    isDragging = false;
    console.log('Drag ended. Total movement:', deltaX, deltaY);
  }
  
  function handleClickOutside() {
    isSelected = false;
  }
  
  function toggleSelection() {
    isSelected = !isSelected;
  }
</script>

<button 
  class="absolute bg-white dark:bg-dark-800 rounded-xl shadow-lg border-2 transition-all duration-200 cursor-move
    {isSelected ? 'border-primary-500 shadow-xl' : 'border-gray-200 dark:border-dark-700'}
    {isDragging ? 'scale-105 shadow-2xl' : ''}"
  style="transform: translate({x}px, {y}px);"
  use:dragAction={{ onDragStart: handleDragStart, onDrag: handleDrag, onDragEnd: handleDragEnd }}
  use:clickOutsideAction={handleClickOutside}
  on:click={toggleSelection}
  type="button"
  in:fly={{ y: 20, duration: 600 }}
  out:fade
>
  <!-- Header -->
  <div class="bg-gradient-to-r {colorClasses[color]} rounded-t-xl p-4 text-white">
    <h3 class="text-lg font-semibold">{title}</h3>
  </div>
  
  <!-- Content -->
  <div class="p-4">
    <p class="text-gray-700 dark:text-gray-300 text-sm">{content}</p>
    
    <!-- Position indicator -->
    <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
      Position: ({Math.round(x)}, {Math.round(y)})
    </div>
  </div>
  
  <!-- Selection indicator -->
  {#if isSelected}
    <div class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
      <span class="text-white text-xs">✓</span>
    </div>
  {/if}
</button>
