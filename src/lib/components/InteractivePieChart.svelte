<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import * as d3 from 'd3';
  import { getChartContext } from '$lib/contexts/ChartContext.js';
  
  // Props
  export let data = [];
  export let width = 400;
  export let height = 400;
  export let innerRadius = 0;
  export let outerRadius = 150;
  export let animated = true;
  
  // Event dispatcher for custom events
  const dispatch = createEventDispatcher();
  
  // Get chart context
  const chartContext = getChartContext();
  
  let svg;
  let tooltip;
  
  // Reactive statement to redraw chart when data changes
  $: if (data.length > 0) {
    drawChart();
  }
  
  function drawChart() {
    if (!svg || !data.length) return;
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Create pie generator
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);
    
    // Create arc generator
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    
    // Calculate center
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);
    
    // Generate pie data
    const pieData = pie(data);
    
    // Create arcs
    const arcs = g.selectAll('.arc')
      .data(pieData)
      .enter().append('g')
      .attr('class', 'arc');
    
    // Add path elements
    const paths = arcs.append('path')
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);
    
    // Add animation if enabled
    if (animated) {
      paths
        .attr('d', arc)
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .style('opacity', 1);
    } else {
      paths.attr('d', arc);
    }
    
    // Add hover effects and custom events
    paths
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.05)');
        
        // Update context
        if (chartContext) {
          chartContext.hoverData(d.data);
        }
        
        // Dispatch custom event
        dispatch('segmentHover', { data: d.data, event });
        
        // Show tooltip
        if (tooltip) {
          tooltip
            .style('opacity', 1)
            .html(`
              <div class="p-2">
                <div class="font-semibold">${d.data.category}</div>
                <div>Value: ${d.data.value}%</div>
              </div>
            `);
        }
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1)');
        
        // Clear context
        if (chartContext) {
          chartContext.hoverData(null);
        }
        
        // Dispatch custom event
        dispatch('segmentLeave', { data: d.data, event });
        
        // Hide tooltip
        if (tooltip) {
          tooltip.style('opacity', 0);
        }
      })
      .on('click', function(event, d) {
        // Update context
        if (chartContext) {
          chartContext.selectData(d.data);
        }
        
        // Dispatch custom event
        dispatch('segmentClick', { data: d.data, event });
      });
  }
  
  onMount(() => {
    if (data.length > 0) {
      drawChart();
    }
  });
</script>

<div class="w-full">
  <!-- Chart container -->
  <div class="relative">
    <svg 
      bind:this={svg}
      {width}
      {height}
      class="w-full h-auto"
    ></svg>
    
    <!-- Tooltip -->
    <div 
      bind:this={tooltip}
      class="absolute bg-gray-900 text-white rounded-lg shadow-lg pointer-events-none opacity-0 transition-opacity duration-200 z-10"
      style="top: 0; left: 0;"
    ></div>
  </div>
</div>
