<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  
  // Props - demonstrates Svelte component props
  export let data = [];
  export let width = 800;
  export let height = 400;
  export let margin = { top: 20, right: 30, bottom: 40, left: 40 };
  export let sortBy = 'value'; // 'value', 'name', or 'none'
  export let filterValue = '';
  export let animated = true;
  
  let svg;
  let filteredData = data;
  
  // Reactive statements for data filtering and sorting
  $: {
    filteredData = data.filter(d => 
      d.category.toLowerCase().includes(filterValue.toLowerCase())
    );
    
    if (sortBy === 'value') {
      filteredData = [...filteredData].sort((a, b) => b.value - a.value);
    } else if (sortBy === 'name') {
      filteredData = [...filteredData].sort((a, b) => a.category.localeCompare(b.category));
    }
  }
  
  $: if (filteredData.length > 0) {
    drawChart();
  }
  
  function drawChart() {
    if (!svg || !filteredData.length) return;
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Calculate dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(filteredData.map(d => d.category))
      .range([0, innerWidth])
      .padding(0.1);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.value)])
      .range([innerHeight, 0]);
    
    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));
    
    g.append('g')
      .call(d3.axisLeft(yScale));
    
    // Add bars
    const bars = g.selectAll('.bar')
      .data(filteredData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category))
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', d => d.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 1);
    
    // Add animation if enabled
    if (animated) {
      bars.transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('y', d => yScale(d.value))
        .attr('height', d => innerHeight - yScale(d.value));
    } else {
      bars
        .attr('y', d => yScale(d.value))
        .attr('height', d => innerHeight - yScale(d.value));
    }
    
    // Add value labels
    g.selectAll('.label')
      .data(filteredData)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .text(d => d.value + '%')
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 100 + 500)
      .duration(500)
      .style('opacity', 1);
  }
  
  onMount(() => {
    if (filteredData.length > 0) {
      drawChart();
    }
  });
</script>

<div class="w-full">
  <!-- Controls -->
  <div class="mb-4 flex flex-wrap gap-4 items-center">
         <div class="flex items-center space-x-2">
       <label for="sort-select" class="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
       <select 
         id="sort-select"
         bind:value={sortBy}
         class="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
       >
        <option value="none">None</option>
        <option value="value">Value</option>
        <option value="name">Name</option>
      </select>
    </div>
    
         <div class="flex items-center space-x-2">
       <label for="filter-input" class="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</label>
       <input 
         id="filter-input"
         type="text"
         bind:value={filterValue}
         placeholder="Search categories..."
         class="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
       />
    </div>
  </div>
  
  <!-- Chart -->
  <svg 
    bind:this={svg}
    {width}
    {height}
    class="w-full h-auto"
  ></svg>
</div>

<style>
  :global(.bar:hover) {
    opacity: 0.8;
    cursor: pointer;
  }
</style>
