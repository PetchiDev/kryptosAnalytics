<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  // Props - demonstrates Svelte component props
  export let value = 0;
  export let duration = 2000;
  export let prefix = '';
  export let suffix = '';
  export let decimals = 0;
  
  // Tweened store for smooth animation - demonstrates Svelte motion
  const animatedValue = tweened(0, {
    duration,
    easing: cubicOut
  });
  
  // Animate to target value when component mounts or value changes
  onMount(() => {
    animatedValue.set(value);
  });
  
  // Reactive statement to update animation when value changes
  $: animatedValue.set(value);
  
  // Format the animated value
  $: formattedValue = $animatedValue.toFixed(decimals);
</script>

<div class="text-3xl font-bold text-gray-900 dark:text-white">
  {prefix}{formattedValue}{suffix}
</div>
