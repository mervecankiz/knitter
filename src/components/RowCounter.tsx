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
    <section className="row-counter">
      <h1 className="app-title">Knitting Row Counter</h1>
      <div className="row-display" aria-label={`Current row ${state.currentRow}`}>
        {state.currentRow}
      </div>
      <div className="row-controls">
        <button type="button" onClick={onDecrement} disabled={state.currentRow === 0}>
          -1
        </button>
        <button type="button" onClick={onIncrement}>
          +1
        </button>
        <button type="button" onClick={onReset} disabled={state.currentRow === 0}>
          Reset
        </button>
      </div>
    </section>
  );
}

