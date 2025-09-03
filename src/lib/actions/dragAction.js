// Svelte action for drag functionality
export function dragAction(node, options = {}) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  
  const {
    onDragStart = () => {},
    onDrag = () => {},
    onDragEnd = () => {},
    threshold = 5
  } = options;
  
  function handleMouseDown(event) {
    isDragging = false;
    startX = event.clientX;
    startY = event.clientY;
    currentX = startX;
    currentY = startY;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    event.preventDefault();
  }
  
  function handleMouseMove(event) {
    currentX = event.clientX;
    currentY = event.clientY;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (!isDragging && distance > threshold) {
      isDragging = true;
      onDragStart({ startX, startY, currentX, currentY });
    }
    
    if (isDragging) {
      onDrag({ 
        startX, 
        startY, 
        currentX, 
        currentY, 
        deltaX, 
        deltaY,
        distance 
      });
    }
  }
  
  function handleMouseUp(event) {
    if (isDragging) {
      onDragEnd({ 
        startX, 
        startY, 
        currentX, 
        currentY,
        deltaX: currentX - startX,
        deltaY: currentY - startY
      });
    }
    
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
  
  node.addEventListener('mousedown', handleMouseDown);
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };
}
