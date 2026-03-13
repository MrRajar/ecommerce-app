import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TEXT = "#111";
const RED = "#ff2d55";

const CouponRow: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name="ticket-outline" size={18} color={TEXT} />
        <Text style={styles.text}>Apply Coupons</Text>
      </View>
      <Text style={styles.select}>Select</Text>
    </TouchableOpacity>
  );
};

export default CouponRow;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  text: { fontSize: 14, color: TEXT, fontWeight: "600" },
  select: { marginLeft: "auto", fontSize: 13, color: RED, fontWeight: "700" },
});
