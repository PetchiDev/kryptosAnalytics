# Motion Components - Framer Motion Style for Svelte

This library provides Framer Motion-style animations for Svelte applications. It includes a set of motion components that mimic the API and behavior of Framer Motion while being built specifically for Svelte.

## Components

### Core Components

- **Motion.svelte** - Base motion component with full API support
- **MotionDiv.svelte** - Pre-configured div element with motion
- **MotionButton.svelte** - Pre-configured button with hover/tap effects
- **MotionCard.svelte** - Pre-configured card with common animations
- **AdvancedMotion.svelte** - Advanced features like drag, spring physics, and 3D transforms

## Basic Usage

```svelte
<script>
  import MotionDiv from '$lib/components/MotionDiv.svelte';
  import MotionButton from '$lib/components/MotionButton.svelte';
</script>

<!-- Basic motion div -->
<MotionDiv
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
>
  <p>Hello World!</p>
</MotionDiv>

<!-- Interactive button -->
<MotionButton
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  on:click={() => console.log('Clicked!')}
>
  Click me!
</MotionButton>
```

## API Reference

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | Object | `{}` | Initial animation state |
| `animate` | Object | `{}` | Target animation state |
| `transition` | Object | `{ duration: 300, easing: cubicOut }` | Animation configuration |
| `whileHover` | Object | `{}` | Animation state on hover |
| `whileTap` | Object | `{}` | Animation state on tap/click |
| `className` | String | `''` | CSS classes |
| `style` | String | `''` | Inline styles |
| `inView` | Boolean | `false` | Enable intersection observer |
| `stagger` | Number | `0` | Stagger delay for children |
| `delay` | Number | `0` | Animation delay |

### Advanced Props (AdvancedMotion only)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `drag` | Boolean | `false` | Enable dragging |
| `dragConstraints` | Object | `{}` | Drag boundaries |
| `dragElastic` | Number | `0.2` | Elastic resistance at boundaries |
| `dragMomentum` | Boolean | `true` | Enable momentum after drag |
| `spring` | Boolean | `false` | Enable spring physics |
| `bounce` | Boolean | `false` | Enable bounce effects |
| `elastic` | Boolean | `false` | Enable elastic easing |

### Animation Properties

You can animate any CSS property, but the most common ones are:

- **Transform**: `x`, `y`, `scale`, `scaleX`, `scaleY`, `rotate`, `rotateX`, `rotateY`, `rotateZ`, `skewX`, `skewY`
- **Appearance**: `opacity`, `backgroundColor`, `color`, `borderRadius`, `boxShadow`
- **Layout**: `width`, `height`
- **Effects**: `filter`, `backdropFilter`

### Transition Options

```javascript
{
  duration: 0.5,           // Animation duration in seconds
  delay: 0.1,              // Delay before animation starts
  ease: "easeOut",         // Easing function
  type: "spring",          // Animation type (spring, tween)
  stiffness: 200,          // Spring stiffness (for spring type)
  damping: 20,             // Spring damping (for spring type)
  repeat: Infinity,        // Number of repeats
  repeatType: "reverse"    // How to repeat (reverse, loop)
}
```

### Easing Functions

- `linear` - Constant speed
- `easeIn` - Slow start, fast end
- `easeOut` - Fast start, slow end
- `easeInOut` - Slow start and end
- `spring` - Spring physics
- `bounce` - Bouncy effect
- `elastic` - Elastic effect
- `back` - Overshoot effect

## Examples

### Staggered List Animation

```svelte
<script>
  import MotionDiv from '$lib/components/MotionDiv.svelte';
  
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
</script>

<MotionDiv class="space-y-2">
  {#each items as item, index}
    <MotionDiv
      class="p-4 bg-gray-100 rounded"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {item}
    </MotionDiv>
  {/each}
</MotionDiv>
```

### Draggable Element

```svelte
<script>
  import AdvancedMotion from '$lib/components/AdvancedMotion.svelte';
</script>

<AdvancedMotion
  class="w-20 h-20 bg-blue-500 rounded cursor-grab"
  drag={true}
  dragConstraints={{ left: 0, right: 200, top: 0, bottom: 100 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1, rotate: 5 }}
>
  Drag me!
</AdvancedMotion>
```

### Spring Physics

```svelte
<script>
  import AdvancedMotion from '$lib/components/AdvancedMotion.svelte';
</script>

<AdvancedMotion
  class="w-16 h-16 bg-green-500 rounded-full"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  spring={true}
  whileHover={{ scale: 1.2 }}
>
  Spring!
</AdvancedMotion>
```

### InView Animation

```svelte
<script>
  import MotionDiv from '$lib/components/MotionDiv.svelte';
</script>

<MotionDiv
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  inView={true}
>
  This animates when it comes into view!
</MotionDiv>
```

## Performance Tips

1. **Use `will-change`**: The components automatically add `will-change: transform, opacity` for better performance
2. **Limit simultaneous animations**: Too many animations at once can impact performance
3. **Use `transform` and `opacity`**: These properties are GPU-accelerated
4. **Avoid animating layout properties**: Properties like `width`, `height`, `margin` cause reflow

## Browser Support

- Modern browsers with CSS3 support
- Intersection Observer API for `inView` animations
- CSS transforms and transitions

## Migration from Framer Motion

The API is designed to be as close to Framer Motion as possible:

```javascript
// Framer Motion (React)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.1 }}
>
  Content
</motion.div>

// This library (Svelte)
<MotionDiv
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.1 }}
>
  Content
</MotionDiv>
```

## Troubleshooting

### Animations not working
- Check that the component is properly imported
- Verify that the initial and animate props are different
- Ensure the element is visible when the animation should start

### Performance issues
- Reduce the number of simultaneous animations
- Use `transform` and `opacity` instead of layout properties
- Consider using `inView` for scroll-triggered animations

### Drag not working
- Make sure you're using `AdvancedMotion` component
- Check that `drag={true}` is set
- Verify drag constraints are properly configured
