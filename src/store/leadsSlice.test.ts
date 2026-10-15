import { expect, jest, test } from '@jest/globals';
import leadsReducer, { addActivity, selectLead } from './leadsSlice';
import type { Activity } from './leadsSlice';

test('selects the requested lead', () => {
  const state = leadsReducer(undefined, selectLead('2'));

  expect(state.selectedLeadId).toBe('2');
});

test('adds an activity to the specified lead only', () => {
  const activity = {
    text: 'Called customer',
    timestamp: '2026-10-15T12:00:00.000Z',
  };

  const state = leadsReducer(
    undefined,
    addActivity({ leadId: '1', activity })
  );

  expect(state.leads.find((lead) => lead.id === '1')?.activities).toEqual([
    activity,
  ]);
  expect(state.leads.find((lead) => lead.id === '2')?.activities).toEqual([]);
});

test('persists and restores activities through localStorage', () => {
  const activity: Activity = {
    text: 'Called customer',
    timestamp: '2026-10-15T12:00:00.000Z',
  };
  window.localStorage.clear();

  jest.isolateModules(() => {
    const { store: testStore } = require('./index') as typeof import('./index');
    testStore.dispatch(addActivity({ leadId: '1', activity }));
  });

  expect(window.localStorage.getItem('leads')).not.toBeNull();

  let restoredActivities: Activity[] = [];
  jest.isolateModules(() => {
    const reducer = require('./leadsSlice').default as typeof leadsReducer;
    const state = reducer(undefined, { type: 'test/reload' });
    restoredActivities =
      state.leads.find((lead) => lead.id === '1')?.activities ?? [];
  });

  expect(restoredActivities).toEqual([activity]);
});
