import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";

type Props = {
  total: string;
  entradas: string;
  saidas: string;
};

const HeaderComponent = () => {
  const valores = {
    total: "2.500",
    entradas: "350",
    saidas: "500",
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.text, styles.title]}>Total que você possui</Text>
        <Text style={[styles.text, styles.subtitle]}>R$ {valores.total}</Text>
      </View>
      <View style={styles.headerDivisor}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <View>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={[styles.text, styles.title]}>
              <Ionicons
                name="arrow-up"
                color={"#0CF52F"}
                size={FONT_SIZE.title}
              />
              Entradas
            </Text>
            <Text style={[styles.text, styles.subtitle]}>
              R$ {valores.entradas}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.text, styles.title]}>
            <Ionicons
              name="arrow-down"
              color={"#FC1C1C"}
              size={FONT_SIZE.title}
            />
            Vendas
          </Text>
          <Text style={[styles.text, styles.subtitle]}>
            R$ {valores.saidas}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;
