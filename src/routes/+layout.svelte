<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { theme } from '$lib/stores/theme.js';
  
  // Demonstrates Svelte reactivity and conditional rendering
  $: isDark = $theme === 'dark';
</script>

<svelte:head>
  <title>Crayon Dashboard</title>
  <meta name="description" content="Modern SvelteKit application with D3.js visualizations" />
</svelte:head>

<!-- Main layout with responsive design -->
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-all duration-500 relative overflow-hidden">
  <!-- Animated background elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-primary-400/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
  </div>
  
  <!-- Top navigation bar -->
  <div class="relative z-10">
    <Navbar />
  </div>
  
  <!-- Main content area with sidebar -->
  <div class="flex relative z-10">
    <!-- Sidebar - hidden on mobile, visible on desktop -->
    <div class="hidden lg:block">
      <Sidebar />
    </div>
    
    <!-- Main content -->
    <main class="flex-1 lg:ml-0">
      <div class="p-6">
        <!-- Page content with smooth transitions -->
        <div 
          class="animate-fade-in backdrop-blur-sm"
          class:dark={isDark}
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</div>

<!-- Mobile sidebar overlay (can be implemented with additional state management) -->
<div class="lg:hidden">
  <!-- Mobile sidebar would go here with proper state management -->
</div>

<style>
  /* Global styles for smooth transitions */
  :global(.animate-fade-in) {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>