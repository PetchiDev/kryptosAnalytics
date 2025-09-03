<script>
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade, scale, draw } from 'svelte/transition';
  import { cubicOut, cubicInOut, elasticOut, backOut, bounceOut } from 'svelte/easing';
  
  export let tag = 'div';
  export let initial = {};
  export let animate = {};
  export let transition = { duration: 300, easing: cubicOut };
  export let whileHover = {};
  export let whileTap = {};
  export let whileDrag = {};
  export let drag = false;
  export let dragConstraints = {};
  export let dragElastic = 0.2;
  export let dragMomentum = true;
  export let dragPropagation = false;
  export let className = '';
  export let style = '';
  export let inView = false;
  export let stagger = 0;
  export let delay = 0;
  export let spring = false;
  export let bounce = false;
  export let elastic = false;
  
  let element;
  let isVisible = false;
  let isHovered = false;
  let isTapped = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentStyle = '';
  let animationFrame;
  
  // Enhanced easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeIn: cubicInOut,
    easeOut: cubicOut,
    easeInOut: cubicInOut,
    spring: elasticOut,
    bounce: bounceOut,
    elastic: elasticOut,
    back: backOut
  };
  
  // Convert Framer Motion style props to CSS with advanced transforms
  function convertMotionProps(props) {
    const cssProps = {};
    const transforms = [];
    
    if (props.x !== undefined) transforms.push(`translateX(${props.x}px)`);
    if (props.y !== undefined) transforms.push(`translateY(${props.y}px)`);
    if (props.scale !== undefined) transforms.push(`scale(${props.scale})`);
    if (props.scaleX !== undefined) transforms.push(`scaleX(${props.scaleX})`);
    if (props.scaleY !== undefined) transforms.push(`scaleY(${props.scaleY})`);
    if (props.rotate !== undefined) transforms.push(`rotate(${props.rotate}deg)`);
    if (props.rotateX !== undefined) transforms.push(`rotateX(${props.rotateX}deg)`);
    if (props.rotateY !== undefined) transforms.push(`rotateY(${props.rotateY}deg)`);
    if (props.rotateZ !== undefined) transforms.push(`rotateZ(${props.rotateZ}deg)`);
    if (props.skewX !== undefined) transforms.push(`skewX(${props.skewX}deg)`);
    if (props.skewY !== undefined) transforms.push(`skewY(${props.skewY}deg)`);
    
    if (transforms.length > 0) {
      cssProps.transform = transforms.join(' ');
    }
    
    if (props.opacity !== undefined) cssProps.opacity = props.opacity;
    if (props.backgroundColor) cssProps.backgroundColor = props.backgroundColor;
    if (props.color) cssProps.color = props.color;
    if (props.borderRadius) cssProps.borderRadius = props.borderRadius;
    if (props.width) cssProps.width = props.width;
    if (props.height) cssProps.height = props.height;
    if (props.boxShadow) cssProps.boxShadow = props.boxShadow;
    if (props.filter) cssProps.filter = props.filter;
    if (props.backdropFilter) cssProps.backdropFilter = props.backdropFilter;
    
    return cssProps;
  }
  
  // Get current animation state
  $: currentAnimation = isDragging ? whileDrag : (isTapped ? whileTap : (isHovered ? whileHover : animate));
  $: currentProps = convertMotionProps(currentAnimation);
  $: currentStyle = Object.entries(currentProps)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ') + '; ' + style;
  
  // Enhanced transition with spring physics
  $: enhancedTransition = {
    ...transition,
    easing: spring ? elasticOut : (bounce ? bounceOut : (elastic ? elasticOut : easingFunctions[transition.easing] || cubicOut))
  };
  
  // Handle hover states
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
  
  // Handle tap states
  function handleMouseDown(event) {
    isTapped = true;
    if (drag) {
      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      currentX = 0;
      currentY = 0;
    }
  }
  
  function handleMouseUp() {
    isTapped = false;
    if (drag && isDragging) {
      isDragging = false;
      // Apply momentum if enabled
      if (dragMomentum) {
        // Simple momentum calculation
        const momentumX = currentX * 0.8;
        const momentumY = currentY * 0.8;
        // Apply elastic constraints
        if (dragConstraints.left !== undefined && momentumX < dragConstraints.left) {
          currentX = dragConstraints.left;
        }
        if (dragConstraints.right !== undefined && momentumX > dragConstraints.right) {
          currentX = dragConstraints.right;
        }
        if (dragConstraints.top !== undefined && momentumY < dragConstraints.top) {
          currentY = dragConstraints.top;
        }
        if (dragConstraints.bottom !== undefined && momentumY > dragConstraints.bottom) {
          currentY = dragConstraints.bottom;
        }
      }
    }
  }
  
  // Handle drag movement
  function handleMouseMove(event) {
    if (isDragging && drag) {
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      
      // Apply constraints
      if (dragConstraints.left !== undefined && deltaX < dragConstraints.left) {
        currentX = dragConstraints.left + (deltaX - dragConstraints.left) * dragElastic;
      } else if (dragConstraints.right !== undefined && deltaX > dragConstraints.right) {
        currentX = dragConstraints.right + (deltaX - dragConstraints.right) * dragElastic;
      } else {
        currentX = deltaX;
      }
      
      if (dragConstraints.top !== undefined && deltaY < dragConstraints.top) {
        currentY = dragConstraints.top + (deltaY - dragConstraints.top) * dragElastic;
      } else if (dragConstraints.bottom !== undefined && deltaY > dragConstraints.bottom) {
        currentY = dragConstraints.bottom + (deltaY - dragConstraints.bottom) * dragElastic;
      } else {
        currentY = deltaY;
      }
    }
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
    
    // Add global mouse move listener for drag
    if (drag) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
    transform-style: preserve-3d;
  }
  
  :global(.motion-element.dragging) {
    cursor: grabbing;
    user-select: none;
  }
  
  :global(.motion-element.draggable) {
    cursor: grab;
  }
</style>
