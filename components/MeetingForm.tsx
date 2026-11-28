'use client';

import { useActionState } from 'react';
import { createMeeting, updateMeeting } from '@/lib/actions';
import {
  initialActionState,
  type ActionState,
} from '@/lib/meeting-form-state';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

function FieldError({
  field,
  state,
}: {
  field: string;
  state: ActionState;
}) {
  return (
    <p className="meeting-form-error" id={`${field}-error`} aria-live="polite">
      {state.fieldErrors[field]?.join(' ')}
    </p>
  );
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;
  const [state, formAction, isPending] = useActionState(
    action,
    initialActionState,
  );

  const initialValues = {
    date: meeting?.date ?? '',
    meetingType: meeting?.meetingType ?? 'regular',
    presiding: meeting?.presiding ?? '',
    conducting: meeting?.conducting ?? '',
    announcements: meeting?.announcements?.join('\n') ?? '',
    openingHymnNumber: meeting?.openingHymn.number ?? '',
    openingHymnTitle: meeting?.openingHymn.title ?? '',
    openingPrayer: meeting?.openingPrayer ?? '',
    wardBusiness:
      meeting?.wardBusiness.map((item) => item.description).join('\n') ?? '',
    stakeBusiness: meeting?.stakeBusiness ? 'true' : 'false',
    sacramentHymnNumber: meeting?.sacramentHymn.number ?? '',
    sacramentHymnTitle: meeting?.sacramentHymn.title ?? '',
    speakers:
      meeting?.speakers
        .map((item) => `${item.name} | ${item.topic} | ${item.type}`)
        .join('\n') ?? '',
    closingHymnNumber: meeting?.closingHymn.number ?? '',
    closingHymnTitle: meeting?.closingHymn.title ?? '',
    closingPrayer: meeting?.closingPrayer ?? '',
  };

  return (
    <form className="meeting-form" action={formAction}>
      <p className="meeting-form-message" aria-live="polite" role="status">
        {state.message}
      </p>

      <fieldset className="meeting-form-section">
        <legend>Meeting details</legend>
        <div className="meeting-form-grid">
          <div className="meeting-form-field">
            <label htmlFor="date">Meeting date</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={initialValues.date}
              aria-describedby="date-error"
              aria-invalid={Boolean(state.fieldErrors.date)}
            />
            <FieldError field="date" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="meetingType">Meeting type</label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={initialValues.meetingType}
              aria-describedby="meetingType-error"
              aria-invalid={Boolean(state.fieldErrors.meetingType)}
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
            <FieldError field="meetingType" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="presiding">Presiding</label>
            <input
              id="presiding"
              name="presiding"
              required
              defaultValue={initialValues.presiding}
              aria-describedby="presiding-error"
              aria-invalid={Boolean(state.fieldErrors.presiding)}
            />
            <FieldError field="presiding" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="conducting">Conducting</label>
            <input
              id="conducting"
              name="conducting"
              required
              defaultValue={initialValues.conducting}
              aria-describedby="conducting-error"
              aria-invalid={Boolean(state.fieldErrors.conducting)}
            />
            <FieldError field="conducting" state={state} />
          </div>

          <div className="meeting-form-field meeting-form-field-wide">
            <label htmlFor="announcements">Announcements</label>
            <textarea
              id="announcements"
              name="announcements"
              rows={3}
              defaultValue={initialValues.announcements}
              aria-describedby="announcements-error"
              aria-invalid={Boolean(state.fieldErrors.announcements)}
            />
            <span className="meeting-form-hint">Enter one announcement per line.</span>
            <FieldError field="announcements" state={state} />
          </div>
        </div>
      </fieldset>

      <fieldset className="meeting-form-section">
        <legend>Opening of the meeting</legend>
        <div className="meeting-form-grid">
          <div className="meeting-form-field">
            <label htmlFor="openingHymnNumber">Opening hymn number</label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              step="1"
              required
              defaultValue={initialValues.openingHymnNumber}
              aria-describedby="openingHymnNumber-error"
              aria-invalid={Boolean(state.fieldErrors.openingHymnNumber)}
            />
            <FieldError field="openingHymnNumber" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="openingHymnTitle">Opening hymn title</label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              required
              defaultValue={initialValues.openingHymnTitle}
              aria-describedby="openingHymnTitle-error"
              aria-invalid={Boolean(state.fieldErrors.openingHymnTitle)}
            />
            <FieldError field="openingHymnTitle" state={state} />
          </div>

          <div className="meeting-form-field meeting-form-field-wide">
            <label htmlFor="openingPrayer">Opening prayer</label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              required
              defaultValue={initialValues.openingPrayer}
              aria-describedby="openingPrayer-error"
              aria-invalid={Boolean(state.fieldErrors.openingPrayer)}
            />
            <FieldError field="openingPrayer" state={state} />
          </div>
        </div>
      </fieldset>

      <fieldset className="meeting-form-section">
        <legend>Ward business and sacrament</legend>
        <div className="meeting-form-grid">
          <div className="meeting-form-field meeting-form-field-wide">
            <label htmlFor="wardBusiness">Ward business</label>
            <textarea
              id="wardBusiness"
              name="wardBusiness"
              rows={3}
              defaultValue={initialValues.wardBusiness}
              aria-describedby="wardBusiness-error"
              aria-invalid={Boolean(state.fieldErrors.wardBusiness)}
            />
            <span className="meeting-form-hint">Enter one item per line.</span>
            <FieldError field="wardBusiness" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="stakeBusiness">Stake business</label>
            <select
              id="stakeBusiness"
              name="stakeBusiness"
              defaultValue={initialValues.stakeBusiness}
              aria-describedby="stakeBusiness-error"
              aria-invalid={Boolean(state.fieldErrors.stakeBusiness)}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <FieldError field="stakeBusiness" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="sacramentHymnNumber">Sacrament hymn number</label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              step="1"
              required
              defaultValue={initialValues.sacramentHymnNumber}
              aria-describedby="sacramentHymnNumber-error"
              aria-invalid={Boolean(state.fieldErrors.sacramentHymnNumber)}
            />
            <FieldError field="sacramentHymnNumber" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="sacramentHymnTitle">Sacrament hymn title</label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              required
              defaultValue={initialValues.sacramentHymnTitle}
              aria-describedby="sacramentHymnTitle-error"
              aria-invalid={Boolean(state.fieldErrors.sacramentHymnTitle)}
            />
            <FieldError field="sacramentHymnTitle" state={state} />
          </div>
        </div>
      </fieldset>

      <fieldset className="meeting-form-section">
        <legend>Speakers and closing meeting</legend>
        <div className="meeting-form-grid">
          <div className="meeting-form-field meeting-form-field-wide">
            <label htmlFor="speakers">Speakers and musical numbers</label>
            <textarea
              id="speakers"
              name="speakers"
              rows={4}
              defaultValue={initialValues.speakers}
              aria-describedby="speakers-hint speakers-error"
              aria-invalid={Boolean(state.fieldErrors.speakers)}
            />
            <span className="meeting-form-hint" id="speakers-hint">
              One per line: Name | Topic or number | speaker or musical-number.
            </span>
            <FieldError field="speakers" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="closingHymnNumber">Closing hymn number</label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              step="1"
              required
              defaultValue={initialValues.closingHymnNumber}
              aria-describedby="closingHymnNumber-error"
              aria-invalid={Boolean(state.fieldErrors.closingHymnNumber)}
            />
            <FieldError field="closingHymnNumber" state={state} />
          </div>

          <div className="meeting-form-field">
            <label htmlFor="closingHymnTitle">Closing hymn title</label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              required
              defaultValue={initialValues.closingHymnTitle}
              aria-describedby="closingHymnTitle-error"
              aria-invalid={Boolean(state.fieldErrors.closingHymnTitle)}
            />
            <FieldError field="closingHymnTitle" state={state} />
          </div>

          <div className="meeting-form-field meeting-form-field-wide">
            <label htmlFor="closingPrayer">Closing prayer</label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              required
              defaultValue={initialValues.closingPrayer}
              aria-describedby="closingPrayer-error"
              aria-invalid={Boolean(state.fieldErrors.closingPrayer)}
            />
            <FieldError field="closingPrayer" state={state} />
          </div>
        </div>
      </fieldset>

      <div className="meeting-form-actions">
        <button className="button button-primary" type="submit" disabled={isPending}>
          {isPending
            ? meeting
              ? 'Saving changes...'
              : 'Creating meeting...'
            : meeting
              ? 'Save Changes'
              : 'Create Meeting'}
        </button>
      </div>
    </form>
  );
}
