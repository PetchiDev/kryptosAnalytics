<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade, scale, draw } from 'svelte/transition';
  import { cubicOut, cubicInOut, elasticOut, backOut } from 'svelte/easing';
  
  export let tag = 'div';
  export let initial = {};
  export let animate = {};
  export let transition = { duration: 300, easing: cubicOut };
  export let whileHover = {};
  export let whileTap = {};
  export let className = '';
  export let style = '';
  export let inView = false;
  export let stagger = 0;
  export let delay = 0;
  
  let element;
  let isVisible = false;
  let isHovered = false;
  let isTapped = false;
  let currentStyle = '';
  
  // Convert Framer Motion style props to CSS
  function convertMotionProps(props) {
    const cssProps = {};
    
    if (props.x !== undefined) cssProps.transform = `translateX(${props.x}px)`;
    if (props.y !== undefined) cssProps.transform = `translateY(${props.y}px)`;
    if (props.scale !== undefined) cssProps.transform = `scale(${props.scale})`;
    if (props.rotate !== undefined) cssProps.transform = `rotate(${props.rotate}deg)`;
    if (props.opacity !== undefined) cssProps.opacity = props.opacity;
    if (props.backgroundColor) cssProps.backgroundColor = props.backgroundColor;
    if (props.color) cssProps.color = props.color;
    if (props.borderRadius) cssProps.borderRadius = props.borderRadius;
    if (props.width) cssProps.width = props.width;
    if (props.height) cssProps.height = props.height;
    
    return cssProps;
  }
  
  // Get current animation state
  $: currentAnimation = isTapped ? whileTap : (isHovered ? whileHover : animate);
  $: currentProps = convertMotionProps(currentAnimation);
  $: currentStyle = Object.entries(currentProps)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ') + '; ' + style;
  
  // Handle hover states
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
  
  // Handle tap states
  function handleMouseDown() {
    isTapped = true;
  }
  
  function handleMouseUp() {
    isTapped = false;
  }
  
  // Intersection Observer for inView animations
  onMount(() => {
    if (inView) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.1 }
      );
      
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  });
</script>

<svelte:element 
  this={tag} 
  bind:this={element}
  class={className}
  style={currentStyle}
  on:click
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
  :global(.motion-element) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }
</style>
