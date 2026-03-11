interface ReminderSettingsProps {
  reminderInterval: number | null;
  remindersEnabled: boolean;
  onChangeInterval: (value: number | null) => void;
  onToggleEnabled: (value: boolean) => void;
}

export function ReminderSettings({
  reminderInterval,
  remindersEnabled,
  onChangeInterval,
  onToggleEnabled,
}: ReminderSettingsProps) {
  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.trim();
    if (raw === '') {
      onChangeInterval(null);
      return;
    }

    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 1) {
      return;
    }

    onChangeInterval(parsed);
  };

  const displayValue = reminderInterval ?? '';

  return (
    <section className="reminder-settings">
      <h2>Reminder settings</h2>
      <label className="field">
        <span>Every Xth row, remind me to change</span>
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={displayValue}
          onChange={handleIntervalChange}
          placeholder="e.g. 4"
        />
      </label>
      <label className="toggle">
        <input
          type="checkbox"
          checked={remindersEnabled}
          onChange={(e) => onToggleEnabled(e.target.checked)}
        />
        <span>Enable reminders</span>
      </label>
      <p className="helper-text">
        Set a number like 4 to get a reminder on rows 4, 8, 12, and so on.
      </p>
    </section>
  );
}

