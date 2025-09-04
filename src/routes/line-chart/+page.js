// Client-side data loading for line chart page (CSR demonstration)
export const load = async ({ fetch }) => {
  // Simulate client-side data fetching
  const clientData = [
    { month: 'Jan', sales: 12000, profit: 8000 },
    { month: 'Feb', sales: 19000, profit: 12000 },
    { month: 'Mar', sales: 30000, profit: 18000 },
    { month: 'Apr', sales: 28000, profit: 16000 },
    { month: 'May', sales: 45000, profit: 25000 },
    { month: 'Jun', sales: 38000, profit: 22000 },
    { month: 'Jul', sales: 52000, profit: 30000 },
    { month: 'Aug', sales: 48000, profit: 28000 },
    { month: 'Sep', sales: 55000, profit: 32000 },
    { month: 'Oct', sales: 62000, profit: 36000 },
    { month: 'Nov', sales: 58000, profit: 34000 },
    { month: 'Dec', sales: 65000, profit: 38000 }
  ];
  
  return {
    clientData,
    loadedAt: new Date().toISOString()
  };
};
