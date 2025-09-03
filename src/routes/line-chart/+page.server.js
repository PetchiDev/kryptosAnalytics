// Server-side data loading for line chart page (SSR demonstration)
export const load = async () => {
  // Simulate server-side data fetching
  const serverData = [
    { month: 'Jan', sales: 12000, profit: 8000 },
    { month: 'Feb', sales: 19000, profit: 12000 },
    { month: 'Mar', sales: 30000, profit: 18000 },
    { month: 'Apr', sales: 28000, profit: 16000 },
    { month: 'May', sales: 45000, profit: 25000 },
    { month: 'Jun', sales: 38000, profit: 22000 }
  ];
  
  return {
    serverData,
    loadedAt: new Date().toISOString()
  };
};
