'use client';

export default function PrintProgramButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="button button-primary"
      aria-label="Print this sacrament meeting program"
    >
      Print Meeting Program
    </button>
  );
}
