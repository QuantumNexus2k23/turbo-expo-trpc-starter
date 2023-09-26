import { FieldValues, useController } from "react-hook-form";
import { Pressable, Text, View, TextInput } from "react-native";
import { ControlledTextInputProps } from "./types";
import { FC, ReactElement } from "react";

export const ControlledTextInput = <T extends FieldValues>({
  label,
  control,
  name,
  secure,
}: ControlledTextInputProps<T>): ReactElement => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <View>
      <Text>{label}</Text>
      <TextInput secureTextEntry={secure} onChangeText={onChange}>
        {value}
      </TextInput>
    </View>
  );
};
