// Client-side data loading for bar chart page (CSR demonstration)
export const load = async ({ fetch }) => {
  // Simulate client-side data fetching
  const clientData = [
    { category: 'Electronics', value: 35, color: '#3b82f6' },
    { category: 'Clothing', value: 25, color: '#ef4444' },
    { category: 'Books', value: 20, color: '#10b981' },
    { category: 'Home & Garden', value: 15, color: '#f59e0b' },
    { category: 'Sports', value: 5, color: '#8b5cf6' }
  ];
  
  return {
    clientData,
    loadedAt: new Date().toISOString()
  };
};
