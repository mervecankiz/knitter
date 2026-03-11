export interface KnittingCounterState {
  currentRow: number;
  reminderInterval: number | null;
  remindersEnabled: boolean;
}

export function isReminderActive(state: KnittingCounterState): boolean {
  const { currentRow, reminderInterval, remindersEnabled } = state;

  if (!remindersEnabled) return false;
  if (!reminderInterval || reminderInterval <= 0) return false;
  if (currentRow <= 0) return false;

  return currentRow % reminderInterval === 0;
}

