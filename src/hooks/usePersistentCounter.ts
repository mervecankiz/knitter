import { useEffect, useState } from 'react';
import type { KnittingCounterState } from '../types';

const STORAGE_KEY = 'knitting-counter:v1';

const defaultState: KnittingCounterState = {
  currentRow: 0,
  reminderInterval: null,
  remindersEnabled: false,
};

function loadInitialState(): KnittingCounterState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw) as Partial<KnittingCounterState>;

    return {
      currentRow: typeof parsed.currentRow === 'number' && parsed.currentRow >= 0 ? parsed.currentRow : 0,
      reminderInterval:
        typeof parsed.reminderInterval === 'number' && parsed.reminderInterval > 0
          ? parsed.reminderInterval
          : null,
      remindersEnabled: Boolean(parsed.remindersEnabled),
    };
  } catch {
    return defaultState;
  }
}

export function usePersistentCounter() {
  const [state, setState] = useState<KnittingCounterState>(() => loadInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors
    }
  }, [state]);

  const increment = () =>
    setState((prev) => ({
      ...prev,
      currentRow: prev.currentRow + 1,
    }));

  const decrement = () =>
    setState((prev) => ({
      ...prev,
      currentRow: prev.currentRow > 0 ? prev.currentRow - 1 : 0,
    }));

  const reset = () =>
    setState((prev) => ({
      ...prev,
      currentRow: 0,
    }));

  const setReminderInterval = (interval: number | null) =>
    setState((prev) => ({
      ...prev,
      reminderInterval: interval,
    }));

  const setRemindersEnabled = (enabled: boolean) =>
    setState((prev) => ({
      ...prev,
      remindersEnabled: enabled,
    }));

  return {
    state,
    increment,
    decrement,
    reset,
    setReminderInterval,
    setRemindersEnabled,
  };
}

