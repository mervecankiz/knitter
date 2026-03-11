import './App.css';
import { RowCounter } from './components/RowCounter';
import { ReminderSettings } from './components/ReminderSettings';
import { ReminderBanner } from './components/ReminderBanner';
import { usePersistentCounter } from './hooks/usePersistentCounter';

function App() {
  const {
    state,
    increment,
    decrement,
    reset,
    setReminderInterval,
    setRemindersEnabled,
  } = usePersistentCounter();

  return (
    <main className="app-root">
      <div className="app-card">
        <ReminderBanner state={state} />
        <RowCounter state={state} onIncrement={increment} onDecrement={decrement} onReset={reset} />
        <ReminderSettings
          reminderInterval={state.reminderInterval}
          remindersEnabled={state.remindersEnabled}
          onChangeInterval={setReminderInterval}
          onToggleEnabled={setRemindersEnabled}
        />
      </div>
    </main>
  );
}

export default App;
