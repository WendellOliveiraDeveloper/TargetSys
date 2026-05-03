import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import { styles } from "./styles";
import CheckboxComponent from "@/components/checkbox";
import { TipoTransacao } from "@/enums/TipoTransacao";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Transacao"
>;

const NovaTransacaoView = () => {
  const navigation = useNavigation<NavigationProps>();

  const [isGuardar, setIsGuardar] = useState<boolean>(true);

  const [valor, setIsValor] = useState<string>("");
  const [motivo, setIsMotivo] = useState<string>("");

  const mudarTipoCheckbox = () => {
    setIsGuardar((prev) => !prev);
  };

  const generateHashId = (input: string): number => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const submit = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.random().toString();
    const input = timestamp + randomPart;
    const id = generateHashId(input);

    const tipoTransacao = isGuardar
      ? TipoTransacao.ADICIONAR
      : TipoTransacao.RETIRAR;

    if (!valor)
      return Alert.alert("Prencha o valor que deseja retirar ou guardar");

    const payload = {
      id,
      idTarget: 0,
      tipoTransacao,
      motivo,
    };

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>
      <Text style={styles.subtitle}>
        A cada valor guardado você fica mais próximo da sua meta. Se esforçe
        para guardar e evite retirar
      </Text>
      <View style={{ gap: 40 }}>
        <View style={{ flexDirection: "row" }}>
          <CheckboxComponent
            label="Guardar"
            tipoTransacao="GUARDAR"
            value={isGuardar}
            onChange={mudarTipoCheckbox}
            style={{ flex: 1 }}
          />
          <CheckboxComponent
            label="Retirar"
            tipoTransacao="RETIRAR"
            value={!isGuardar}
            onChange={mudarTipoCheckbox}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ gap: 30 }}>
          <InputComponent
            label="Valor (R$)"
            placeholder="EX: 10,00"
            keyboardType="decimal-pad"
            required
            value={valor}
            onChangeText={setIsValor}
          />
          <InputComponent
            label="Motivo (opcional)"
            placeholder="EX: Investir em CDB com 10% ao ano"
            value={motivo}
            onChangeText={setIsMotivo}
          />
        </View>
      </View>
      <View style={styles.button}>
        <ButtonComponent title={"Salvar"} onPress={submit} />
      </View>
    </View>
  );
};

export default NovaTransacaoView;
