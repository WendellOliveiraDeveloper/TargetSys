import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeView from "@/views/homeView/HomeView";
import { DEFAULT_THEME_COLORS } from "@/utils/themeColors";
import MetaView from "@/views/Meta/metaN";
import MetaAndamento from "@/views/MetaEmAndamento/metaAndamento";
import NovaTransacaoView from "@/views/transaçãoView/nTransação";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: DEFAULT_THEME_COLORS.mainColor,
        },
        headerTintColor: DEFAULT_THEME_COLORS.headerTextColor,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={{ title: "Página Inicial", headerShown: false }}
      />
      <Stack.Screen
        name="Meta"
        component={MetaView}
        options={{ title: "", headerShown: true }}
      />
      <Stack.Screen
        name="MetaAndamento"
        component={MetaAndamento}
        options={{
          title: "",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Transacao"
        component={NovaTransacaoView}
        options={{ title: "", headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
