import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});
// Save leads to localStorage when state changes
store.subscribe(() => {
  try {
    if (typeof window === 'undefined') return;
    const state = store.getState();
    window.localStorage.setItem('leads', JSON.stringify(state.leads.leads));
  } catch (error) {
    console.error('Could not save leads to local storage.', error);
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
