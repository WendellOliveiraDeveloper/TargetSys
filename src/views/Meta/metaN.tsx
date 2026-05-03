import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import { Ionicons } from "@expo/vector-icons";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Meta">;

const MetaView = () => {
  const navigation = useNavigation<NavigationProps>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Home")}
          >
            {isEditing && <Ionicons name={"trash"} size={22} color={"#ffff"} />}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
        />
        <InputComponent
          label="Valor da Meta"
          placeholder="EX: R$1000,00"
          keyboardType="decimal-pad"
          required
        />
      </View>
      <View style={styles.button}>
        <ButtonComponent title={"Salvar"} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default MetaView;
