'use client';

export default function PrintProgramButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="button button-primary"
    >
      Print Meeting Program
    </button>
  );
}
