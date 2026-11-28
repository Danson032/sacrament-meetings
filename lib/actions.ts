'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  deleteMeetingRecord,
  insertMeeting,
  updateMeetingRecord,
} from './meetings-db';
import {
  getFieldErrors,
  getMeetingFormData,
  meetingFormSchema,
} from './meeting-validation';
import {
  initialActionState,
  type ActionState,
} from './meeting-form-state';

const meetingIdSchema = z
  .string()
  .regex(/^[1-9]\d*$/, 'Meeting ID must be a positive whole number.')
  .transform(Number)
  .refine(Number.isSafeInteger, 'Meeting ID is outside the safe range.');

function getValidationState(
  issues: readonly z.core.$ZodIssue[],
): ActionState {
  return {
    message: 'Please correct the highlighted fields and try again.',
    fieldErrors: getFieldErrors(issues),
  };
}

export async function createMeeting(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = meetingFormSchema.safeParse(getMeetingFormData(formData));
  if (!parsed.success) {
    return getValidationState(parsed.error.issues);
  }

  try {
    await insertMeeting(parsed.data);
  } catch (error) {
    console.error('[meetings] Unable to create meeting.', error);
    return {
      ...initialActionState,
      message: 'We could not save this meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  meetingId: number,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedId = meetingIdSchema.safeParse(String(meetingId));
  if (!parsedId.success) {
    return {
      ...initialActionState,
      message: 'This meeting could not be identified. Return to the meeting list and try again.',
    };
  }

  const parsed = meetingFormSchema.safeParse(getMeetingFormData(formData));
  if (!parsed.success) {
    return getValidationState(parsed.error.issues);
  }

  try {
    const updated = await updateMeetingRecord(parsedId.data, parsed.data);
    if (!updated) {
      return {
        ...initialActionState,
        message: 'This meeting no longer exists. Return to the meeting list.',
      };
    }
  } catch (error) {
    console.error(`[meetings] Unable to update meeting ${parsedId.data}.`, error);
    return {
      ...initialActionState,
      message: 'We could not save this meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${parsedId.data}`);
  redirect('/meetings');
}

export async function deleteMeeting(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedId = meetingIdSchema.safeParse(formData.get('id'));
  if (!parsedId.success) {
    return {
      ...initialActionState,
      message: 'This meeting could not be identified and was not deleted.',
    };
  }

  try {
    const deleted = await deleteMeetingRecord(parsedId.data);
    if (!deleted) {
      return {
        ...initialActionState,
        message: 'This meeting no longer exists.',
      };
    }
  } catch (error) {
    console.error(`[meetings] Unable to delete meeting ${parsedId.data}.`, error);
    return {
      ...initialActionState,
      message: 'We could not delete this meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
