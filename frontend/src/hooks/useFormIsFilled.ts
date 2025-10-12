import { useWatch, type FormInstance } from 'rc-field-form';

type HookType = {
  form: FormInstance;
  isLoading: boolean;
};

export const useFormIsFilled = ({ form, isLoading }: HookType): { isDisabled: boolean } => {
  const values = useWatch([], form);

  const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
  const isTouched = form.isFieldsTouched(true);

  const isDisabled = isLoading || !isTouched || hasErrors || !values?.warehouseId || !values?.amount;

  return { isDisabled };
};
