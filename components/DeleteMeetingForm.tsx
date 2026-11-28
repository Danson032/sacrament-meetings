'use client';

import { useActionState, type FormEvent } from 'react';
import { deleteMeeting } from '@/lib/actions';
import { initialActionState } from '@/lib/meeting-form-state';

export default function DeleteMeetingForm({ meetingId }: { meetingId: number }) {
  const [state, formAction, isPending] = useActionState(
    deleteMeeting,
    initialActionState,
  );

  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm(`Delete meeting program #${meetingId}? This cannot be undone.`)) {
      event.preventDefault();
    }
  }

  return (
    <form
      className="meeting-delete-form"
      action={formAction}
      onSubmit={confirmDelete}
    >
      <input type="hidden" name="id" value={meetingId} />
      {state.message && (
        <p className="meeting-form-error" role="status" aria-live="polite">
          {state.message}
        </p>
      )}
      <button
        className="button button-danger"
        type="submit"
        disabled={isPending}
        aria-label={`Delete meeting program ${meetingId}`}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}
