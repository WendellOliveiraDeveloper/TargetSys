import { FONT_SIZE } from "@/utils/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: FONT_SIZE.title,
    color: "#0000",
    marginBottom: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FONT_SIZE.subtitle,
    color: "#0000",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
});
