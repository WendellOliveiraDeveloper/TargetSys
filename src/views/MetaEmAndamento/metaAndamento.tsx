import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import HeaderComponent from "@/components/header";
import { Ionicons } from "@expo/vector-icons";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "MetaAndamento"
>;

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
