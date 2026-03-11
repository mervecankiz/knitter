import { isReminderActive, type KnittingCounterState } from '../types';

interface ReminderBannerProps {
  state: KnittingCounterState;
}

export function ReminderBanner({ state }: ReminderBannerProps) {
  const active = isReminderActive(state);

  if (!active || !state.reminderInterval) {
    return null;
  }

  return (
    <div className="reminder-banner" aria-live="polite">
      <p>
        Row {state.currentRow} – time to change (every {state.reminderInterval}th row).
      </p>
    </div>
  );
}

