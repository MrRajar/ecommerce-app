import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TEXT = "#111";

const CartHeader: React.FC<{
  title: string;
  onBack: () => void;
  onHeart?: () => void;
}> = ({ title, onBack, onHeart }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.icon}>
        <Ionicons name="arrow-back" size={22} color={TEXT} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onHeart} style={styles.icon}>
        <Ionicons name="heart-outline" size={22} color={TEXT} />
      </TouchableOpacity>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 20 },
  icon: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "700", color: TEXT },
});
