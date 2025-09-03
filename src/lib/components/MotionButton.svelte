<script>
  import Motion from './Motion.svelte';
  
  export let initial = {};
  export let animate = {};
  export let transition = {};
  export let whileHover = { scale: 1.05 };
  export let whileTap = { scale: 0.95 };
  export let className = '';
  export let style = '';
  export let inView = false;
  export let stagger = 0;
  export let delay = 0;
</script>

<Motion 
  tag="button"
  {initial}
  {animate}
  {transition}
  {whileHover}
  {whileTap}
  {className}
  {style}
  {inView}
  {stagger}
  {delay}
  {...$$restProps}
>
  <slot />
</Motion>
