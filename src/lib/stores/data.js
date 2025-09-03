import { writable, derived } from 'svelte/store';

// Sample data stores - demonstrates Svelte stores for data management
export const salesData = writable([
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
]);

export const categoryData = writable([
  { category: 'Electronics', value: 35, color: '#3b82f6' },
  { category: 'Clothing', value: 25, color: '#ef4444' },
  { category: 'Books', value: 20, color: '#10b981' },
  { category: 'Home & Garden', value: 15, color: '#f59e0b' },
  { category: 'Sports', value: 5, color: '#8b5cf6' }
]);

export const userData = writable([
  { name: 'John Doe', age: 28, score: 85 },
  { name: 'Jane Smith', age: 32, score: 92 },
  { name: 'Mike Johnson', age: 25, score: 78 },
  { name: 'Sarah Wilson', age: 30, score: 88 },
  { name: 'David Brown', age: 35, score: 95 },
  { name: 'Lisa Davis', age: 27, score: 82 },
  { name: 'Tom Miller', age: 29, score: 90 },
  { name: 'Emma Garcia', age: 31, score: 87 }
]);

// Derived store for total sales - demonstrates derived stores
export const totalSales = derived(
  salesData,
  $salesData => $salesData.reduce((sum, item) => sum + item.sales, 0)
);

// Derived store for average profit - demonstrates derived stores
export const averageProfit = derived(
  salesData,
  $salesData => $salesData.reduce((sum, item) => sum + item.profit, 0) / $salesData.length
);

// Dashboard metrics store
export const dashboardMetrics = writable({
  totalUsers: 1247,
  totalRevenue: 125000,
  conversionRate: 3.2,
  activeUsers: 892
});
