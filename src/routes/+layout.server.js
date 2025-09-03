// Server-side layout for SSR demonstration
export const load = async ({ cookies }) => {
  // Get theme from cookies for SSR
  const theme = cookies.get('theme') || 'light';
  
  return {
    theme
  };
};
