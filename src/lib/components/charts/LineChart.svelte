<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  
  // Props - demonstrates Svelte component props
  export let data = [];
  export let width = 800;
  export let height = 400;
  export let margin = { top: 20, right: 30, bottom: 40, left: 40 };
  export let color = '#3b82f6';
  export let showGrid = true;
  export let animated = true;
  
  let svg;
  let chartContainer;
  
  // D3 scales and generators
  let xScale, yScale, lineGenerator;
  
  // Reactive statement to redraw chart when data changes
  $: if (data.length > 0) {
    drawChart();
  }
  
  function drawChart() {
    if (!svg || !data.length) return;
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Calculate dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create scales
    xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, innerWidth])
      .padding(0.1);
    
    yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sales)])
      .range([innerHeight, 0]);
    
    // Create line generator
    lineGenerator = d3.line()
      .x(d => xScale(d.month) + xScale.bandwidth() / 2)
      .y(d => yScale(d.sales))
      .curve(d3.curveMonotoneX);
    
    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add grid lines if enabled
    if (showGrid) {
      g.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat('')
        )
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.3)
        .style('stroke', 'currentColor');
      
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat('')
        )
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.3)
        .style('stroke', 'currentColor');
    }
    
    // Add axes with better styling
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style('color', 'currentColor')
      .style('font-size', '12px');
    
    g.append('g')
      .call(d3.axisLeft(yScale))
      .style('color', 'currentColor')
      .style('font-size', '12px');
    
    // Add line path with gradient
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', 0).attr('y2', innerHeight);
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color)
      .attr('stop-opacity', 0.8);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color)
      .attr('stop-opacity', 0.1);
    
    // Add area under the line
    const area = d3.area()
      .x(d => xScale(d.month) + xScale.bandwidth() / 2)
      .y0(innerHeight)
      .y1(d => yScale(d.sales))
      .curve(d3.curveMonotoneX);
    
    g.append('path')
      .datum(data)
      .attr('fill', 'url(#line-gradient)')
      .attr('d', area)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);
    
    // Add line path
    const path = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 3)
      .attr('d', lineGenerator);
    
    // Add animation if enabled
    if (animated) {
      const totalLength = path.node().getTotalLength();
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }
    
    // Add data points with better animation
    g.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.month) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.sales))
      .attr('r', 0)
      .attr('fill', color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 150 + 1000)
      .duration(300)
      .attr('r', 5)
      .style('opacity', 1)
      .transition()
      .duration(200)
      .attr('r', 4);
  }
  
  onMount(() => {
    if (data.length > 0) {
      drawChart();
    }
  });
</script>

<div class="w-full">
  <svg 
    bind:this={svg}
    {width}
    {height}
    class="w-full h-auto"
  ></svg>
</div>

<style>
  :global(.grid line) {
    stroke: currentColor;
    opacity: 0.3;
  }
  
  :global(.dot:hover) {
    r: 6;
    cursor: pointer;
  }
</style>
