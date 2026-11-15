export default function MeetingsLoading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-indicator" aria-hidden="true" />
      <p>Loading meeting programs...</p>
    </div>
  );
}
