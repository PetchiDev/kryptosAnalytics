import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

// Chart context key
const CHART_CONTEXT_KEY = 'chart-context';

// Chart context store
export function createChartContext() {
  const chartStore = writable({
    selectedData: null,
    hoveredData: null,
    animationSpeed: 1000,
    theme: 'light'
  });
  
  return {
    chartStore,
    selectData: (data) => {
      chartStore.update(state => ({ ...state, selectedData: data }));
    },
    hoverData: (data) => {
      chartStore.update(state => ({ ...state, hoveredData: data }));
    },
    setAnimationSpeed: (speed) => {
      chartStore.update(state => ({ ...state, animationSpeed: speed }));
    }
  };
}

// Set chart context
export function setChartContext(context) {
  setContext(CHART_CONTEXT_KEY, context);
}

// Get chart context
export function getChartContext() {
  return getContext(CHART_CONTEXT_KEY);
}
