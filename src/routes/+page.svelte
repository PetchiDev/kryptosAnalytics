<script>
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import { dashboardMetrics } from '$lib/stores/data.js';
  import { Users, DollarSign, TrendingUp, Zap, ArrowRight, Download, Settings } from 'lucide-svelte';
  
  // Demonstrates Svelte reactivity and lifecycle
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
  
  // Sample dashboard data with Lucide icons
  const metrics = [
    {
      title: 'Total Users',
      value: 1247,
      change: 12.5,
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Total Revenue',
      value: 125000,
      change: 8.2,
      icon: DollarSign,
      color: 'success',
      prefix: '$',
      suffix: 'K'
    },
    {
      title: 'Conversion Rate',
      value: 3.2,
      change: -2.1,
      icon: TrendingUp,
      color: 'warning',
      suffix: '%'
    },
    {
      title: 'Active Users',
      value: 892,
      change: 15.3,
      icon: Zap,
      color: 'purple'
    }
  ];
  
  // Reactive metrics from store
  $: storeMetrics = $dashboardMetrics;
  
  // Recent activity data
  const recentActivity = [
    { action: 'New user registered', time: '2 minutes ago', type: 'success' },
    { action: 'Payment processed', time: '5 minutes ago', type: 'info' },
    { action: 'System backup completed', time: '1 hour ago', type: 'success' },
    { action: 'API rate limit reached', time: '2 hours ago', type: 'warning' },
    { action: 'Database optimized', time: '3 hours ago', type: 'info' }
  ];
</script>

<svelte:head>
  <title>Dashboard - Svelte D3 Analytics</title>
</svelte:head>

<!-- Main dashboard container -->
<div class="max-w-7xl mx-auto">
  <!-- Page header with Svelte transitions -->
  <div 
    class="mb-8 relative"
    in:fly={{ y: -20, duration: 600 }}
    out:fade
  >
    <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
    <div class="relative bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-dark-700/50 shadow-2xl">
      <h1 class="text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Dashboard Overview
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
        Welcome to your analytics dashboard. Here's what's happening with your data.
      </p>
      <div class="flex justify-center space-x-4">
        <button class="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2">
          <Download class="w-5 h-5" />
          <span>Export Data</span>
        </button>
        <button class="px-6 py-3 bg-white/20 dark:bg-dark-700/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-white/30 dark:hover:bg-dark-600/50 transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-white/30 dark:border-dark-600/50 flex items-center space-x-2">
          <Settings class="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Metrics grid with staggered animations -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {#each metrics as metric, index}
      <MetricCard 
        {...metric}
        delay={index * 100}
      />
    {/each}
  </div>
  
  <!-- Charts and activity section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Quick stats chart placeholder -->
    <div 
      class="lg:col-span-2 bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
      in:scale={{ duration: 600, delay: 400, easing: quintOut }}
      out:fade
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Performance Overview
      </h2>
      
      <!-- Mini chart visualization -->
      <div class="h-64 flex items-end justify-between space-x-2">
        {#each Array(12) as _, i}
          <div 
            class="bg-gradient-to-t from-primary-500 to-primary-300 rounded-t flex-1 transition-all duration-1000 hover:from-primary-600 hover:to-primary-400"
            style="height: {Math.random() * 80 + 20}%"
            in:fly={{ y: 50, duration: 800, delay: 500 + i * 50 }}
          ></div>
        {/each}
      </div>
      
      <!-- Chart legend -->
      <div class="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
    
    <!-- Recent activity -->
    <div 
      class="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-700"
      in:fly={{ x: 20, duration: 600, delay: 600 }}
      out:fade
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h2>
      
      <div class="space-y-4">
        {#each recentActivity as activity, index}
          <div 
            class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200"
            in:fly={{ x: 20, duration: 400, delay: 700 + index * 100 }}
          >
            <div class="w-2 h-2 rounded-full mt-2
              {activity.type === 'success' ? 'bg-green-500' : 
               activity.type === 'warning' ? 'bg-orange-500' : 
               'bg-blue-500'}"
            ></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {activity.action}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Quick actions -->
  <div 
    class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
    in:fly={{ y: 20, duration: 600, delay: 800 }}
    out:fade
  >
    <div class="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white">
      <h3 class="text-lg font-semibold mb-2">View Analytics</h3>
      <p class="text-primary-100 mb-4">Explore detailed charts and insights</p>
      <a href="/line-chart" class="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
        Go to Charts →
      </a>
    </div>
    
    <div class="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
      <h3 class="text-lg font-semibold mb-2">Export Data</h3>
      <p class="text-green-100 mb-4">Download your data in various formats</p>
      <button class="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
        Export Now →
      </button>
    </div>
    
    <div class="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
      <h3 class="text-lg font-semibold mb-2">Advanced Features</h3>
      <p class="text-orange-100 mb-4">Try out Svelte's advanced capabilities</p>
      <a href="/advanced" class="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
        Explore →
      </a>
    </div>
  </div>
</div>

<!-- Loading state demonstration -->
{#if !mounted}
  <div class="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
    </div>
  </div>
{/if}