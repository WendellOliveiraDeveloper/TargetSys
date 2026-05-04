import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";
import HeaderComponent from "@/components/header";
import { targetStorage } from "@/storage/targetStorage";
import { Target } from "@/interface/Target";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeView = () => {
  const navigation = useNavigation<NavigationProps>();
  const [metas, setMetas] = useState<Target[]>([]);

  const getMetas = async () => {
    try {
      const target = await targetStorage.get();
      setMetas(target);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMetas();
    }, []),
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="wallet-outline" size={48} color="#ccc" />
      <Text style={styles.emptyText}>Nenhuma meta encontrada.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent />

      <FlatList
        data={metas}
        keyExtractor={(item) => String(item.id || Math.random())}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardValue}>R$ {String(item.valorTotal)}</Text>
            </View>
            <TouchableOpacity
              style={styles.cardAction}
              onPress={() =>
                navigation.navigate("MetaAndamento", {
                  target: item,
                })
              }
            >
              <Ionicons name="arrow-up-right-box" size={22} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <ButtonComponent
          title="Nova Meta"
          onPress={() => navigation.navigate("Meta")}
        />
      </View>
    </View>
  );
};

export default HomeView;
