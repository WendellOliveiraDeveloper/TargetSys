import ButtonComponent from "@/components/button";
import React, { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { DEFAULT_THEME_COLORS } from "@/utils/themeColors";
import { TransacaoStorage } from "../../storage/transacaoStorage";
import { Transacao } from "@/interface/Transacao";
import { targetStorage } from "@/storage/targetStorage";
import { Target } from "@/interface/Target";

type NavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MetaAndamento">;
  route: any;
};

interface BarraDeProgressoProps {
  progresso: number;
}

const BarraDeProgresso = ({ progresso }: BarraDeProgressoProps) => {
  const porcentagem = Math.min(Math.max(progresso, 0), 100);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.backgroundBar}>
        <View style={[styles.progressBar, { width: `${porcentagem}%` }]} />
      </View>
    </View>
  );
};

const MetaAndamento = ({ route, navigation }: NavigationProps) => {
  const { target } = route.params ?? {};

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [meta, setMeta] = useState<Target>();

  // const percentual = (/) * 100;

  const carregarDadosById = async () => {
    try {
      if (!target?.id) return;

      const dados = await TransacaoStorage.getLogsByTargetId(target.id);

      setTransacoes(dados);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDadosById();
    }, []),
  );

  const handleRemove = async (item: Transacao) => {
    Alert.alert(
      "Remover Transação",
      `Deseja excluir "${item.motivo} de R$ ${item.valor}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const listaCompleta = await TransacaoStorage.remove(item);
            const listaFiltrada = listaCompleta.filter(
              (t) => t.idTarget === target.id,
            );
            setTransacoes(listaFiltrada);
          },
        },
      ],
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate("Meta", { target: target, isEditing: true })
            }
            style={{}}
          >
            <Ionicons name={"pencil"} size={22} color={"#ffff"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{target.nome}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Valor Guardado</Text>
          {/* <Text style={styles.progressText}>{percentual.toFixed(0)}%</Text> */}
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>
            R$ {target.atual} de R$ {target.valor}
          </Text>
        </View>
        <View style={styles.section}>
          {/* <BarraDeProgresso progresso={percentual} /> */}
        </View>

        <View style={styles.transacoesContainer}>
          <Text style={styles.transacoesTitle}>Transações</Text>

          <FlatList
            data={transacoes}
            keyExtractor={(item) => String(item.id || Math.random())}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name={item.tipoTransacao === 1 ? "arrow-down" : "arrow-up"}
                    color={
                      item.tipoTransacao === 1
                        ? "red"
                        : DEFAULT_THEME_COLORS.mainColor
                    }
                    size={30}
                  />
                  <View>
                    <Text style={{ fontWeight: "bold" }}>R$ {item.valor}</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Text style={{ color: "#666" }}>{String(item.Date)}</Text>
                      <Text>{item.motivo}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{ padding: 5, marginBottom: 15 }}
                  onPress={() => handleRemove(item)}
                >
                  <Ionicons name="close" size={21} color="#000" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text
                style={{ textAlign: "center", marginTop: 20, color: "#999" }}
              >
                Nenhuma transação encontrada.
              </Text>
            )}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonComponent
          title="Nova Transação"
          style={{ width: "100%" }}
          onPress={() => navigation.navigate("Transacao", { target: target })}
        />
      </View>
    </View>
  );
};

export default MetaAndamento;
