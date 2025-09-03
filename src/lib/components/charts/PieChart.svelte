<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  
  // Props - demonstrates Svelte component props
  export let data = [];
  export let width = 400;
  export let height = 400;
  export let innerRadius = 0;
  export let outerRadius = 150;
  export let animated = true;
  export let showLabels = true;
  export let showLegend = true;
  
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
    
    // Create label arc generator
    const labelArc = d3.arc()
      .innerRadius(outerRadius + 20)
      .outerRadius(outerRadius + 20);
    
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
    
    // Add labels if enabled
    if (showLabels) {
      const labels = arcs.append('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text(d => d.data.value + '%')
        .style('opacity', 0)
        .transition()
        .delay((d, i) => i * 200 + 500)
        .duration(500)
        .style('opacity', 1);
    }
    
    // Add hover effects
    paths
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.05)');
        
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
        
        // Hide tooltip
        if (tooltip) {
          tooltip.style('opacity', 0);
        }
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
  
  <!-- Legend -->
  {#if showLegend}
    <div class="mt-4 flex flex-wrap justify-center gap-4">
      {#each data as item}
        <div class="flex items-center space-x-2">
          <div 
            class="w-4 h-4 rounded-full"
            style="background-color: {item.color}"
          ></div>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {item.category}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>
