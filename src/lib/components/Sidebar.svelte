<script>
  import { page } from '$app/stores';
  import { BarChart3, TrendingUp, BarChart, Zap, Users, Activity, Target } from 'lucide-svelte';
  
  // Navigation items with Lucide icons and descriptions
  const navItems = [
    { 
      href: '/', 
      label: 'Dashboard', 
      icon: BarChart3,
      description: 'Overview and metrics'
    },
    { 
      href: '/line-chart', 
      label: 'Line Chart', 
      icon: TrendingUp,
      description: 'Sales trends over time'
    },
    { 
      href: '/bar-chart', 
      label: 'Bar Chart', 
      icon: BarChart,
      description: 'Category comparisons'
    },
    { 
      href: '/advanced', 
      label: 'Advanced Features', 
      icon: Zap,
      description: 'Svelte actions & context'
    }
  ];
  
  // Demonstrates Svelte reactivity
  $: currentPath = $page.url.pathname;
</script>

<aside class="w-64 bg-white dark:bg-dark-800 shadow-lg border-r border-gray-200 dark:border-dark-700 min-h-screen">
  <div class="p-6">
    <!-- Logo section -->
    <div class="flex items-center space-x-3 mb-8">
      <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-lg">SD</span>
      </div>
      <div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Svelte D3</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Analytics Dashboard</p>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="space-y-2">
      {#each navItems as item}
        <a 
          href={item.href}
          class="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105
            {currentPath === item.href 
              ? 'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500 shadow-md' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-dark-700 dark:hover:to-dark-600 hover:text-primary-600 dark:hover:text-primary-400'
            }"
        >
          <svelte:component this={item.icon} size={20} class="group-hover:scale-110 transition-transform duration-200" />
          <div class="flex-1">
            <div class="font-medium">{item.label}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400">
              {item.description}
            </div>
          </div>
        </a>
      {/each}
    </nav>
    
    <!-- Stats section -->
    <div class="mt-8 p-4 bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-blue-900/20 rounded-xl border border-primary-200/50 dark:border-primary-700/50 shadow-lg">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        <Activity class="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
        Quick Stats
      </h3>
      <div class="space-y-3 text-xs">
        <div class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-400 flex items-center">
            <Users class="w-3 h-3 mr-1" />
            Total Views
          </span>
          <span class="font-medium text-primary-600 dark:text-primary-400">12.5K</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-400 flex items-center">
            <Activity class="w-3 h-3 mr-1" />
            Active Users
          </span>
          <span class="font-medium text-green-600 dark:text-green-400">892</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-400 flex items-center">
            <Target class="w-3 h-3 mr-1" />
            Conversion
          </span>
          <span class="font-medium text-orange-600 dark:text-orange-400">3.2%</span>
        </div>
      </div>
    </div>
  </div>
</aside>
