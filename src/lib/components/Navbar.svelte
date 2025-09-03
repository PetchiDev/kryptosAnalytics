<script>
  import { theme } from '$lib/stores/theme.js';
  import { page } from '$app/stores';
  import { BarChart3, TrendingUp, BarChart, Zap, Moon, Sun, Menu } from 'lucide-svelte';
  
  // Demonstrates Svelte reactivity and event handling
  function toggleTheme() {
    theme.update(current => current === 'light' ? 'dark' : 'light');
  }
  
  // Navigation items with Lucide icons
  const navItems = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/line-chart', label: 'Line Chart', icon: TrendingUp },
    { href: '/bar-chart', label: 'Bar Chart', icon: BarChart },
    { href: '/advanced', label: 'Advanced', icon: Zap }
  ];
</script>

<nav class="bg-white dark:bg-dark-800 shadow-lg border-b border-gray-200 dark:border-dark-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo and title -->
      <div class="flex items-center">
        <div class="flex-shrink-0 flex items-center space-x-3">
      
          <div class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Crayon 
          </div>
        </div>
      </div>
      
      <!-- Navigation items -->
      <div class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a 
            href={item.href}
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative
              {$page.url.pathname === item.href 
                ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg transform scale-105' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700'
              }"
          >
            <svelte:component this={item.icon} size={18} class="transition-transform duration-200" />
            <span>{item.label}</span>
          </a>
        {/each}
      </div>
      
      <!-- Theme toggle and mobile menu -->
      <div class="flex items-center space-x-4">
        <!-- Theme toggle button -->
        <button
          on:click={toggleTheme}
          class="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-dark-600 dark:hover:to-dark-500 transition-all duration-200 hover:scale-110 shadow-md"
          aria-label="Toggle theme"
        >
          {#if $theme === 'light'}
            <Moon class="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-200" />
          {:else}
            <Sun class="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-200" />
          {/if}
        </button>
        
        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-dark-600 dark:hover:to-dark-500 transition-all duration-200 hover:scale-110 shadow-md"
          aria-label="Open mobile menu"
        >
          <Menu class="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-200" />
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile navigation menu -->
  <div class="md:hidden border-t border-gray-200 dark:border-dark-700">
    <div class="px-2 pt-2 pb-3 space-y-1">
      {#each navItems as item}
        <a 
          href={item.href}
          class="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105
            {$page.url.pathname === item.href 
              ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg transform scale-105' 
              : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700'
            }"
        >
          <svelte:component this={item.icon} size={20} class="transition-transform duration-200" />
          <span>{item.label}</span>
        </a>
      {/each}
    </div>
  </div>
</nav>
