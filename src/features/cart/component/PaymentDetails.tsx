import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TEXT = "#111";
const MUTED = "#8d8d8d";
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

const PaymentDetails: React.FC<{
  orderAmount: number;
  deliveryFee: number;
  total: number;
  onKnowMore: () => void;
  onApplyCoupon: () => void;
  onEmiDetails: () => void;
}> = ({ orderAmount, deliveryFee, total, onKnowMore, onApplyCoupon, onEmiDetails }) => {
  return (
    <View>
      <Text style={styles.title}>Order Payment Details</Text>

      <Row label="Order Amounts" right={formatINR(orderAmount)} />

      <View style={styles.row}>
        <View style={styles.leftInline}>
          <Text style={styles.label}>Convenience</Text>
          <TouchableOpacity onPress={onKnowMore} activeOpacity={0.8}>
            <Text style={styles.link}>  Know More</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onApplyCoupon} activeOpacity={0.8}>
          <Text style={styles.link}>Apply Coupon</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.free}>Free</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Order Total</Text>
        <Text style={styles.totalValue}>{formatINR(total)}</Text>
      </View>

      <View style={[styles.row, { marginTop: 6 }]}>
        <Text style={styles.label}>EMI Available</Text>
        <TouchableOpacity onPress={onEmiDetails} activeOpacity={0.8}>
          <Text style={styles.link}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentDetails;

function Row({ label, right }: { label: string; right: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{right}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "800",
    color: TEXT,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leftInline: { flexDirection: "row", alignItems: "center" },
  label: { fontSize: 13, color: MUTED },
  value: { fontSize: 13, color: TEXT, fontWeight: "700" },
  link: { fontSize: 12, color: RED, fontWeight: "700" },
  free: { fontSize: 13, color: RED, fontWeight: "700" },
  divider: { height: 1, backgroundColor: BORDER, marginHorizontal: 16, marginVertical: 8 },
  totalLabel: { fontSize: 14, color: TEXT, fontWeight: "800" },
  totalValue: { fontSize: 14, color: TEXT, fontWeight: "800" },
});
