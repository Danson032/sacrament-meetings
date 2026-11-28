export interface ActionState {
  message: string;
  fieldErrors: Record<string, string[]>;
}

export const initialActionState: ActionState = {
  message: '',
  fieldErrors: {},
};
