import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10 },
  btn: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#9CA3AF" },
  label: { fontSize: 15, fontWeight: "500", color: "#6B7280" },
});
