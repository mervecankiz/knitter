import { useEffect, useState } from 'react';
import './App.css';
import { RowCounter } from './components/RowCounter';
import { ReminderSettings } from './components/ReminderSettings';
import { ReminderBanner } from './components/ReminderBanner';
import { usePersistentCounter } from './hooks/usePersistentCounter';

type Screen = 'counter' | 'settings';

function App() {
  const {
    state,
    increment,
    decrement,
    reset,
    setReminderInterval,
    setRemindersEnabled,
  } = usePersistentCounter();

  const [screen, setScreen] = useState<Screen>('counter');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (screen !== 'counter') return;

      switch (event.key) {
        case ' ':
        case 'Spacebar':
        case 'ArrowUp':
        case '+':
          event.preventDefault();
          increment();
          break;
        case 'ArrowDown':
        case '-':
          event.preventDefault();
          decrement();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          reset();
          break;
        default:
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, increment, decrement, reset]);

  return (
    <main className="app-root">
      <div className="app-card">
        <header className="app-header">
          <h1 className="app-title">Knitting Row Counter</h1>
          <nav className="app-nav">
            <button
              type="button"
              className={screen === 'counter' ? 'nav-button nav-button-active' : 'nav-button'}
              onClick={() => setScreen('counter')}
            >
              Counter
            </button>
            <button
              type="button"
              className={screen === 'settings' ? 'nav-button nav-button-active' : 'nav-button'}
              onClick={() => setScreen('settings')}
            >
              Settings
            </button>
          </nav>
        </header>

        {screen === 'counter' ? (
          <>
            <ReminderBanner state={state} />
            <RowCounter state={state} onIncrement={increment} onDecrement={decrement} onReset={reset} />
            <p className="counter-hint">
              Use space or ↑ to add a row, ↓ to remove, and R to reset.
            </p>
          </>
        ) : (
          <ReminderSettings
            reminderInterval={state.reminderInterval}
            remindersEnabled={state.remindersEnabled}
            onChangeInterval={setReminderInterval}
            onToggleEnabled={setRemindersEnabled}
          />
        )}
      </div>
    </main>
  );
}

export default App;
