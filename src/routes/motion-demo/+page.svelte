<script>
  import { onMount } from 'svelte';
  import MotionDiv from '$lib/components/MotionDiv.svelte';
  import MotionButton from '$lib/components/MotionButton.svelte';
  import MotionCard from '$lib/components/MotionCard.svelte';
  import AdvancedMotion from '$lib/components/AdvancedMotion.svelte';
  import { Play, Pause, RotateCcw, Move, Zap } from 'lucide-svelte';
  
  let showAdvanced = false;
  let dragEnabled = false;
  let springEnabled = false;
  let bounceEnabled = false;
  let elasticEnabled = false;
  
  // Sample data for animations
  const items = [
    { id: 1, name: 'Item 1', color: '#3b82f6' },
    { id: 2, name: 'Item 2', color: '#ef4444' },
    { id: 3, name: 'Item 3', color: '#10b981' },
    { id: 4, name: 'Item 4', color: '#f59e0b' },
    { id: 5, name: 'Item 5', color: '#8b5cf6' },
    { id: 6, name: 'Item 6', color: '#ec4899' }
  ];
  
  function toggleAdvanced() {
    showAdvanced = !showAdvanced;
  }
  
  function resetAnimations() {
    // Force re-render by toggling visibility
    showAdvanced = false;
    setTimeout(() => {
      showAdvanced = true;
    }, 100);
  }
</script>

<svelte:head>
  <title>Motion Demo - Framer Motion Style Animations</title>
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
      class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <Zap class="w-6 h-6 text-white" />
    </MotionDiv>
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        Motion Demo
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Framer Motion-style animations built with Svelte
      </p>
    </div>
  </div>
</MotionDiv>

<!-- Controls -->
<MotionCard 
  class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-dark-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center space-x-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Animation Controls
      </h2>
    </div>
    
    <div class="flex items-center space-x-3">
      <MotionButton
        on:click={toggleAdvanced}
        class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showAdvanced ? <Pause class="w-4 h-4 mr-2" /> : <Play class="w-4 h-4 mr-2" />}
        {showAdvanced ? 'Pause' : 'Play'} Animations
      </MotionButton>
      
      <MotionButton
        on:click={resetAnimations}
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw class="w-4 h-4 mr-2" />
        Reset
      </MotionButton>
    </div>
  </div>
</MotionCard>

<!-- Basic Motion Examples -->
<MotionDiv 
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {#each items as item, index}
    <MotionCard
      class="p-6 rounded-xl text-white relative overflow-hidden"
      style="background: linear-gradient(135deg, {item.color}, {item.color}dd)"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      whileHover={{ y: -10, scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      <MotionDiv
        class="text-2xl font-bold mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), type: "spring", stiffness: 200 }}
      >
        {item.name}
      </MotionDiv>
      <MotionDiv
        class="text-sm opacity-90"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
      >
        Hover me for effects!
      </MotionDiv>
    </MotionCard>
  {/each}
</MotionDiv>

<!-- Advanced Motion Examples -->
{#if showAdvanced}
  <MotionDiv
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <MotionCard 
      class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-dark-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Advanced Motion Features
      </h2>
      
      <!-- Draggable Elements -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Draggable Elements
        </h3>
        <div class="flex space-x-4">
          <AdvancedMotion
            class="w-20 h-20 bg-blue-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold"
            drag={true}
            dragConstraints={{ left: 0, right: 200, top: 0, bottom: 100 }}
            dragElastic={0.2}
            dragMomentum={true}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileDrag={{ scale: 1.1, rotate: 5 }}
            whileHover={{ scale: 1.05 }}
          >
            Drag
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-20 h-20 bg-green-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold"
            drag={true}
            dragConstraints={{ left: 0, right: 200, top: 0, bottom: 100 }}
            dragElastic={0.5}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileDrag={{ scale: 1.2, rotate: -5 }}
            whileHover={{ scale: 1.05 }}
          >
            Elastic
          </AdvancedMotion>
        </div>
      </div>
      
      <!-- Spring Physics -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Spring Physics
        </h3>
        <div class="flex space-x-4">
          <AdvancedMotion
            class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            spring={true}
            whileHover={{ scale: 1.2, rotate: 0 }}
          >
            ∞
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold"
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            bounce={true}
            whileHover={{ scale: 1.2 }}
          >
            ↑
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1.2, rotate: 180 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            elastic={true}
            whileHover={{ scale: 1.5, rotate: 0 }}
          >
            ⚡
          </AdvancedMotion>
        </div>
      </div>
      
      <!-- Complex Animations -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Complex Animations
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AdvancedMotion
            class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.9, rotate: -5 }}
          >
            Spin
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            initial={{ opacity: 0, x: -100, skewX: -15 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
            whileHover={{ x: 10, skewX: 5, scale: 1.05 }}
          >
            Slide
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ y: -10, scale: 1.1, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.2)" }}
          >
            Bounce
          </AdvancedMotion>
          
          <AdvancedMotion
            class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "elasticOut" }}
            whileHover={{ scale: 1.15, rotate: 10, filter: "brightness(1.2)" }}
          >
            Pop
          </AdvancedMotion>
        </div>
      </div>
    </MotionCard>
  </MotionDiv>
{/if}

<!-- Features List -->
<MotionCard 
  class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
>
  <h3 class="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
    Motion Features Implemented
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800 dark:text-indigo-200">
    <ul class="space-y-2">
      <li>✅ <strong>Initial & Animate:</strong> Entry animations with custom delays</li>
      <li>✅ <strong>WhileHover:</strong> Interactive hover effects</li>
      <li>✅ <strong>WhileTap:</strong> Click/tap feedback</li>
      <li>✅ <strong>Transitions:</strong> Custom easing and duration</li>
      <li>✅ <strong>Stagger:</strong> Sequential animations</li>
    </ul>
    <ul class="space-y-2">
      <li>✅ <strong>Drag:</strong> Draggable elements with constraints</li>
      <li>✅ <strong>Spring Physics:</strong> Natural motion with elastic effects</li>
      <li>✅ <strong>3D Transforms:</strong> Rotate, scale, skew animations</li>
      <li>✅ <strong>InView:</strong> Scroll-triggered animations</li>
      <li>✅ <strong>Momentum:</strong> Physics-based drag behavior</li>
    </ul>
  </div>
</MotionCard>
