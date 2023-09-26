import type { Control, FieldValues, Path } from "react-hook-form";

export type ControlledTextInputProps<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  secure?: boolean;
};
