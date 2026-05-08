import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TEXT = "#111";
const RED = "#ff2d55";
const BORDER = "#ededed";

function formatINR(amount: number) {
  try {
    // @ts-ignore
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const fixed = amount.toFixed(2);
    const parts = fixed.split(".");
    const x = parts[0];
    const last3 = x.slice(-3);
    const other = x.slice(0, -3);
    const withCommas =
      other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (other ? "," : "") + last3;
    return `₹ ${withCommas}.${parts[1]}`;
  }
}

const BottomBar: React.FC<{
  amount: number;
  onViewDetails: () => void;
  onProceed: () => void;
}> = ({ amount, onViewDetails, onProceed }) => {
  return (
    <View style={styles.bar}>
      <View style={{ flex: 1 }}>
        <Text style={styles.amount}>{formatINR(amount)}</Text>
        <TouchableOpacity onPress={onViewDetails} activeOpacity={0.8}>
          <Text style={styles.link}>View Details</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} activeOpacity={0.9} onPress={onProceed}>
        <Text style={styles.btnText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 22 : 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  amount: { fontSize: 14, fontWeight: "800", color: TEXT },
  link: { marginTop: 4, fontSize: 12, color: RED, fontWeight: "700" },
  btn: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 14 },
});
