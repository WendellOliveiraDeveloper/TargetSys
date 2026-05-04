import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import { Ionicons } from "@expo/vector-icons";
import { targetStorage } from "@/storage/targetStorage";

type NavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Meta">;
  route: any;
};

const MetaView = ({ navigation, route }: NavigationProps) => {
  const { target, isEditing } = route.params ?? {};

  const [metaName, setMetaName] = useState<string>("");
  const [metaValue, setMetaValue] = useState<string>("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => onExclude()}>
            {isEditing && <Ionicons name={"trash"} size={22} color={"#ffff"} />}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!target) return;

    setMetaName(target.nome);
    setMetaValue(target.valorTotal);
  }, [target]);

  const onExclude = async () => {
    Alert.alert("Remover Transação", `Deseja excluir "${target.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await targetStorage.remove(target);
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          } catch (err) {
            console.log("Error: ", err);
          }
        },
      },
    ]);
  };

  const submit = async () => {
    if (!metaName && !metaValue) {
      Alert.alert("Preencha o nome da meta e o valor!");
      return;
    }

    if (isEditing) {
      const updatedPayload = {
        id: target.id,
        nome: metaName,
        valorTotal: metaValue,
      };
      await targetStorage.update(updatedPayload);
      navigation.goBack();
      return;
    }

    const payload = {
      id: Date.now(),
      nome: metaName,
      valorTotal: metaValue,
    };

    await targetStorage.add(payload);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Economize para alcançar sua meta financeira
      </Text>
      <View style={{ gap: 50 }}>
        <InputComponent
          label="Nome da Meta"
          placeholder="EX: Celular novo"
          required
          value={metaName}
          onChangeText={setMetaName}
        />
        <InputComponent
          label="Valor da Meta"
          placeholder="EX: R$1000,00"
          keyboardType="decimal-pad"
          required
          value={metaValue}
          onChangeText={setMetaValue}
        />
      </View>
      <View style={styles.button}>
        <ButtonComponent
          title={"Salvar"}
          onPress={() => {
            submit();
          }}
        />
      </View>
    </View>
  );
};

export default MetaView;
