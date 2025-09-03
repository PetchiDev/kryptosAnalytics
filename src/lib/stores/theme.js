import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme store - demonstrates Svelte stores for global state management
export const theme = writable('light');

// Initialize theme from localStorage or system preference
if (browser) {
  const stored = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (stored) {
    theme.set(stored);
  } else if (systemPrefersDark) {
    theme.set('dark');
  }
  
  // Apply theme to document
  theme.subscribe((value) => {
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', value);
  });
}
