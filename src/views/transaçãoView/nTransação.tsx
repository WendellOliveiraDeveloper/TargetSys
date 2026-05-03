import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Transacao">;

const NovaTransacaoView = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>
      <Text style={styles.subtitle}>
        A cada valor guardado você fica mais próximo da sua meta. Se esforçe
        para guardar e evite retirar
      </Text>
      <View style={{ gap: 30 }}>
        <InputComponent
          label="Valor (R$)"
          placeholder="EX: 10,00"
          keyboardType="decimal-pad"
          required
        />
        <InputComponent
          label="Meta (opcional)"
          placeholder="EX: Investir em CDB com 10% ao ano"
        />
      </View>
      <View style={styles.button}>
        <ButtonComponent title={"Salvar"} />
      </View>
    </View>
  );
};

export default NovaTransacaoView;
