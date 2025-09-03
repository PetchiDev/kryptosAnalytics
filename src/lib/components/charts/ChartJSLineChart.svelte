<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  
  // Register Chart.js components
  Chart.register(...registerables);
  
  export let data = [];
  export let width = 800;
  export let height = 400;
  export let animated = true;
  export let color = '#3b82f6';
  
  let canvas;
  let chart;
  let chartContext;
  let isLoading = true;
  let error = null;
  
  // Create gradient for beautiful line fill
  function createGradient(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color + '40'); // 25% opacity
    gradient.addColorStop(1, color + '05'); // 2% opacity
    return gradient;
  }
  
  // Chart configuration with modern styling
  function getChartConfig() {
    return {
      type: 'line',
      data: {
        labels: data.map(d => d.month),
        datasets: [{
          label: 'Sales',
          data: data.map(d => d.sales),
          borderColor: color,
          backgroundColor: chartContext ? createGradient(chartContext, color) : color + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
        }, {
          label: 'Profit',
          data: data.map(d => d.profit),
          borderColor: '#10b981',
          backgroundColor: chartContext ? createGradient(chartContext, '#10b981') : '#10b98120',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#10b981',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3,
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
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                size: 14,
                weight: '500'
              },
              color: '#374151'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: color,
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
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
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
              padding: 10
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
                return '$' + value.toLocaleString();
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
              delay = context.dataIndex * 100;
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
            console.log('Line chart initialized successfully');
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
      chart.data.labels = data.map(d => d.month);
      chart.data.datasets[0].data = data.map(d => d.sales);
      chart.data.datasets[1].data = data.map(d => d.profit);
      
      // Update gradient if context is available
      if (chartContext) {
        chart.data.datasets[0].backgroundColor = createGradient(chartContext, color);
        chart.data.datasets[1].backgroundColor = createGradient(chartContext, '#10b981');
      }
      
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
      console.log('Line chart created from reactive statement');
    } catch (err) {
      console.error('Chart creation error:', err);
      error = err.message;
      isLoading = false;
    }
  }
  
  // Debug: Log data changes
  $: if (data) {
    console.log('Line chart data updated:', data);
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
