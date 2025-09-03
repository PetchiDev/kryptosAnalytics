<script>
  import Motion from './Motion.svelte';
  
  export let initial = { opacity: 0, y: 20 };
  export let animate = { opacity: 1, y: 0 };
  export let transition = { duration: 300, ease: "easeOut" };
  export let whileHover = { y: -5, scale: 1.02 };
  export let whileTap = { scale: 0.98 };
  export let className = '';
  export let style = '';
  export let inView = true;
  export let stagger = 0;
  export let delay = 0;
</script>

<Motion 
  tag="div"
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
