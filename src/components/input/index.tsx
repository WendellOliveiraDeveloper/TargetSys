import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
  required?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
} & TextInputProps;

const InputComponent = ({
  label,
  required = false,
  style,
  inputStyle,
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.label}>{label}</Text>
        {required && <View style={styles.required} />}
      </View>
      <TextInput
        style={styles.textStyle}
        placeholderTextColor="#c4c4c4"
        {...rest}
      />
    </View>
  );
};

export default InputComponent;
