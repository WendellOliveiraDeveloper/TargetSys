import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
import { Target } from "@/interface/Target";
import { Transacao } from "@/interface/Transacao";
import { targetStorage } from "@/storage/targetStorage";
import { TransacaoStorage } from "@/storage/transacaoStorage";
import { useFocusEffect } from "@react-navigation/native";

const HeaderComponent = () => {
  const [metas, setMetas] = useState<Target[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const getMetas = async () => {
    try {
      const targets = await targetStorage.get();
      setMetas(targets);

      const todasTransacoes: Transacao[] = [];
      for (const target of targets) {
        const logs = await TransacaoStorage.getLogsByTargetId(target.id);
        todasTransacoes.push(...logs);
      }
      setTransacoes(todasTransacoes);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMetas();
    }, []),
  );

  const entradas = transacoes
    .filter((t) => t.tipoTransacao === 0)
    .reduce((acc, t) => acc + (parseFloat(t.valor) || 0), 0);

  const saidas = transacoes
    .filter((t) => t.tipoTransacao === 1)
    .reduce((acc, t) => acc + (parseFloat(t.valor) || 0), 0);

  const total = entradas - saidas;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.text, styles.title]}>Total que você possui</Text>
        <Text style={[styles.text, styles.subtitle]}>
          R$ {total.toFixed(2)}
        </Text>
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
              R$ {entradas.toFixed(2)}
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
            Saídas
          </Text>
          <Text style={[styles.text, styles.subtitle]}>
            R$ {saidas.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;
