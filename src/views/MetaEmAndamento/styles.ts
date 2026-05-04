import { StyleSheet } from "react-native";
import { DEFAULT_THEME_COLORS } from "@/utils/themeColors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    paddingTop: 50,
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  section: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection:"row",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
    fontWeight: "500",
  },
  progressContainer: {
    width: "100%",
  },
  backgroundBar: {
    height: 9,           
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 6,      
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: DEFAULT_THEME_COLORS.mainColor,
    borderRadius: 6,      
  },
  progressText: {
    marginTop: 3,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d47ff",
  },
  footer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  transacoesContainer: {
    width: "90%",
    marginTop: 40,
  },
  transacoesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});