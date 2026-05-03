import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import HeaderComponent from "@/components/header";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeView = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={{ alignItems: "center" }}>
        <ButtonComponent
          title="Nova Meta"
          onPress={() => navigation.navigate("Meta")}
          style={{ width: 400 }}
        />
        <ButtonComponent 
          title={"TESTE DESSA DESGRAÇA"}
          onPress={() => navigation.navigate("MetaAndamento")}
        />
      </View>
    </View>
  );
};

export default HomeView;
