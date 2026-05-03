import { DEFAULT_THEME_COLORS } from "@/utils/themeColors";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

type FUNDO = "AZUL" | "CINZA";

type TIPO_TRANSACAO = "GUARDAR" | "RETIRAR";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  tipoTransacao: TIPO_TRANSACAO;
  fundo?: FUNDO;
  style?: ViewStyle;
};

const fundoStyles = {
  AZUL: {
    active: {
      backgroundColor: DEFAULT_THEME_COLORS.mainColor,
      borderColor: DEFAULT_THEME_COLORS.mainColor,
    },
    dot: { backgroundColor: DEFAULT_THEME_COLORS.mainColor },
    label: { color: "#000000" },
  },
  CINZA: {
    active: {
      backgroundColor: DEFAULT_THEME_COLORS.mainColor,
      borderColor: DEFAULT_THEME_COLORS.mainColor,
    },
    dot: { backgroundColor: DEFAULT_THEME_COLORS.mainColor },
    label: { color: "#ffffff" },
  },
};

const CheckboxComponent = ({
  value,
  label,
  fundo = "CINZA",
  tipoTransacao,
  style,
  onChange,
}: Props) => {
  const currentStyle = fundoStyles[fundo];

  const isGuardar = tipoTransacao === "GUARDAR";

  const iconName = isGuardar ? "arrow-up" : "arrow-down";
  const iconColor = value ? "#fff" : "#000";
  
  return (
    <View style={[style]}>
      <TouchableOpacity
        style={[styles.btn, value && currentStyle.active]}
        onPress={() => onChange(!value)}
        accessibilityRole="radio"
        accessibilityState={{ checked: value }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
        <Text style={[styles.label, value && currentStyle.label]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxComponent;
