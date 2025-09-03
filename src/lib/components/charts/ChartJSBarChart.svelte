<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  
  // Register Chart.js components
  Chart.register(...registerables);
  
  export let data = [];
  export let width = 800;
  export let height = 400;
  export let animated = true;
  
  let canvas;
  let chart;
  let chartContext;
  let isLoading = true;
  let error = null;
  
  // Create beautiful gradient for bars
  function createGradient(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color + 'FF'); // Full opacity at top
    gradient.addColorStop(0.7, color + 'CC'); // 80% opacity in middle
    gradient.addColorStop(1, color + '80'); // 50% opacity at bottom
    return gradient;
  }
  
  // Chart configuration with modern styling
  function getChartConfig() {
    return {
      type: 'bar',
      data: {
        labels: data.map(d => d.category),
        datasets: [{
          label: 'Value (%)',
          data: data.map(d => d.value),
          backgroundColor: data.map((d, index) => {
            if (chartContext) {
              return createGradient(chartContext, d.color);
            }
            return d.color + '80';
          }),
          borderColor: data.map(d => d.color),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
          hoverBackgroundColor: data.map(d => d.color),
          hoverBorderColor: data.map(d => d.color),
          hoverBorderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3b82f6',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context) {
                return `${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
                weight: '500'
              },
              padding: 10,
              maxRotation: 45
            }
          },
          y: {
            display: true,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
                weight: '500'
              },
              padding: 10,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        animation: animated ? {
          duration: 2000,
          easing: 'easeInOutQuart',
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
              delay = context.dataIndex * 150;
            }
            return delay;
          }
        } : false,
        hover: {
          animationDuration: 200
        }
      }
    };
  }
  
  onMount(() => {
    // Wait for DOM to be ready
    const initChart = () => {
      try {
        if (canvas && canvas.getContext) {
          chartContext = canvas.getContext('2d');
          if (data && data.length > 0) {
            chart = new Chart(canvas, getChartConfig());
            isLoading = false;
            error = null;
            console.log('Bar chart initialized successfully');
          } else {
            isLoading = false;
            error = 'No data available';
          }
        } else {
          // Retry after a short delay
          setTimeout(initChart, 50);
        }
      } catch (err) {
        console.error('Chart initialization error:', err);
        error = err.message;
        isLoading = false;
      }
    };
    
    // Start initialization
    initChart();
  });
  
  // Update chart when data changes
  $: if (chart && data && data.length > 0) {
    try {
      chart.data.labels = data.map(d => d.category);
      chart.data.datasets[0].data = data.map(d => d.value);
      chart.data.datasets[0].backgroundColor = data.map((d, index) => {
        if (chartContext) {
          return createGradient(chartContext, d.color);
        }
        return d.color + '80';
      });
      chart.data.datasets[0].borderColor = data.map(d => d.color);
      chart.data.datasets[0].hoverBackgroundColor = data.map(d => d.color);
      chart.data.datasets[0].hoverBorderColor = data.map(d => d.color);
      
      chart.update('active');
    } catch (err) {
      console.error('Chart update error:', err);
    }
  }
  
  // Create chart when data becomes available
  $: if (!chart && canvas && canvas.getContext && data && data.length > 0) {
    try {
      chartContext = canvas.getContext('2d');
      chart = new Chart(canvas, getChartConfig());
      isLoading = false;
      error = null;
      console.log('Bar chart created from reactive statement');
    } catch (err) {
      console.error('Chart creation error:', err);
      error = err.message;
      isLoading = false;
    }
  }
  
  // Debug: Log data changes
  $: if (data) {
    console.log('Bar chart data updated:', data);
    console.log('Data length:', data.length);
    console.log('First item:', data[0]);
  }
  
  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div class="chart-container" style="width: {width}px; height: {height}px; position: relative;">
  <!-- Always render canvas for proper binding -->
  <canvas 
    bind:this={canvas}
    width={width}
    height={height}
    style="display: {isLoading || error ? 'none' : 'block'};"
  ></canvas>
  
  {#if isLoading}
    <div class="flex items-center justify-center h-full absolute inset-0">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Loading chart...</p>
      </div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-full absolute inset-0">
      <div class="text-center text-red-600 dark:text-red-400">
        <p class="text-sm">Error: {error}</p>
        <p class="text-xs mt-1">Canvas available: {canvas ? 'Yes' : 'No'}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .chart-container {
    position: relative;
    margin: 0 auto;
  }
  
  :global(.chart-container canvas) {
    border-radius: 12px;
  }
</style>
