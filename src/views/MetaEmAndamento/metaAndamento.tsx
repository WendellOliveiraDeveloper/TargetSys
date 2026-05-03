import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
// import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import HeaderComponent from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { DEFAULT_THEME_COLORS, FONT_SIZE } from "@/utils/themeColors";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "MetaAndamento"
>;

const metaficticia = {
  id: "1",
  nome: "Apple Watch",
  valor: 1000,
  atual: 250,
};

interface barraDeProgressoProps {
  progresso: number;
}

const barraDeProgresso = ({ progresso }: barraDeProgressoProps) => {
  const porcentagem = Math.min(Math.max(progresso, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar}>
        <View style={[styles.progressBar, { width: `${porcentagem}%` }]} />
      </View>
      <Text style={styles.progressText}>{porcentagem}% concluído</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  backgroundBar: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: DEFAULT_THEME_COLORS.backgroundColor,
    borderRadius: 10,
  },
  progressText: {
    marginTop: 5,
    textAlign: "right",
    fontSize: 14,
    color: "#666",
  },
});

const MetaAndamento = () => {
  const navigation = useNavigation<NavigationProps>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name={"pencil"} size={22} color={"#ffff"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View>
          <Text>{metaficticia.nome}</Text>
        </View>

        <ButtonComponent
          title="Nova Transação"
          style={{ width: 400 }}
          onPress={() => navigation.navigate("Transacao")}
        />
      </View>
    </View>
  );
};

export default MetaAndamento;
