import type { KnittingCounterState } from '../types';

interface RowCounterProps {
  state: KnittingCounterState;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export function RowCounter({
  state,
  onIncrement,
  onDecrement,
  onReset,
}: RowCounterProps) {
  return (
    <section className="row-counter" aria-label="Row counter">
      <div className="row-display" aria-live="polite" aria-label={`Current row ${state.currentRow}`}>
        {state.currentRow}
      </div>
      <div className="row-controls">
        <button
          type="button"
          onClick={onDecrement}
          disabled={state.currentRow === 0}
          aria-label="Decrease row"
        >
          -1
        </button>
        <button type="button" onClick={onIncrement} aria-label="Increase row">
          +1
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={state.currentRow === 0}
          aria-label="Reset counter"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

