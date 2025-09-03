<script>
  import MotionDiv from './MotionDiv.svelte';
  import MotionButton from './MotionButton.svelte';
  import MotionCard from './MotionCard.svelte';
  
  let testVisible = true;
  
  function toggleTest() {
    testVisible = !testVisible;
  }
</script>

<div class="p-4">
  <h2 class="text-xl font-bold mb-4">Motion Component Test</h2>
  
  <MotionButton
    on:click={toggleTest}
    class="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    Toggle Test
  </MotionButton>
  
  {#if testVisible}
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionCard
        class="p-4 bg-gray-100 rounded"
        whileHover={{ scale: 1.05 }}
      >
        <p>This is a test of the motion components!</p>
      </MotionCard>
    </MotionDiv>
  {/if}
</div>
