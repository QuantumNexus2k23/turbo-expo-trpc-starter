import { Pressable, Text } from "react-native";
import { ButtonProps } from "./types";
import { FC } from "react";

export const Button: FC<ButtonProps> = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{children}</Text>
    </Pressable>
  );
};
