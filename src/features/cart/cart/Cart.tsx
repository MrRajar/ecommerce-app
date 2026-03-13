import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { cartStore, CartItem } from "./CartStore";

import CartHeader from "../../cart/component/CartHeader";
import CartItemCard from "../../cart/component/CartItemCard";
import BottomBar from "../../cart/component/BottomBar";
import SimplePicker from "../../cart/component/SimplePicker";

type RouteParams = {
  product?: CartItem;    
  cartItems?: CartItem[];  
};

const Cart: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setCartItems(cartStore.getItems());

    const unsubscribe = cartStore.subscribe(() => {
      setCartItems([...cartStore.getItems()]);
    });
    return unsubscribe;
  }, [isFocused]);

  const data = cartItems || [];

  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [selectedQty, setSelectedQty] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!data.length) return;

    setSelectedSize((prev) => {
      const next = { ...prev };
      data.forEach((it) => {
        if (!next[it.id]) next[it.id] = it.size || it.sizes?.[0] || "—";
      });
      return next;
    });

    setSelectedQty((prev) => {
      const next = { ...prev };
      data.forEach((it) => {
        if (next[it.id] == null) next[it.id] = it.qty ?? 1;
      });
      return next;
    });
  }, [data]);

  const [picker, setPicker] = useState<null | { type: "size" | "qty"; id: string }>(null);

  const amounts = useMemo(() => {
    const orderAmount = data.reduce((sum, it) => {
      const q = selectedQty[it.id] || 1;
      return sum + it.price * q;
    }, 0);

    const convenience = 0;
    const deliveryFee = 0;
    const total = orderAmount + convenience + deliveryFee;

    return { orderAmount, convenience, deliveryFee, total };
  }, [data, selectedQty]);

  if (!data.length) {
    return (
      <SafeAreaView style={styles.container}>

        <CartHeader title="Shopping Bag" onBack={() => navigation.goBack()} onHeart={() => { }} />
        <ScrollView>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add a product from Product Detail, then come back.</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const pickerItem = data.find((x) => x.id === picker?.id);

  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
          
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressRow}>
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressLabel}>Address :</Text>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={18} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.addressText}>
                216 St Paul's Rd, London N1 2LL, UK{'\n'}Contact : +44-784232
              </Text>
            </View>
            <TouchableOpacity style={styles.addAddressBtn}>
              <Ionicons name="add-circle-outline" size={32} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shopping List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping List</Text>

          {data.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              size={selectedSize[item.id]}
              qty={selectedQty[item.id]}
              onPressSize={() => setPicker({ type: "size", id: item.id })}
              onPressQty={() => setPicker({ type: "qty", id: item.id })}
            />
          ))}
        </View>

      <BottomBar
        amount={amounts.total}
        onViewDetails={() => { }}
        onProceed={() => {
          navigation.replace("Shipping", { cartItems: data });
        }}
      />

      <SimplePicker
        visible={picker?.type === "size"}
        title="Select Size"
        options={pickerItem?.sizes?.map(String) || []}
        selected={picker?.id ? selectedSize[picker.id] : undefined}
        onClose={() => setPicker(null)}
        onSelect={(v) => {
          if (!picker?.id) return;
          setSelectedSize((p) => ({ ...p, [picker.id]: v }));
        }}
      />

      <SimplePicker
        visible={picker?.type === "qty"}
        title="Select Quantity"
        options={Array.from({ length: 10 }, (_, i) => String(i + 1))}
        selected={picker?.id ? String(selectedQty[picker.id] || 1) : "1"}
        onClose={() => setPicker(null)}
        onSelect={(v) => {
          if (!picker?.id) return;
          const n = Math.max(1, Number(v) || 1);
          setSelectedQty((p) => ({ ...p, [picker.id]: n }));
        }}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffff",paddingTop:"2%" }, // Light gray bg for contrast
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop:25
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  backBtn: { padding: 4 },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 12 },

  addressRow: { flexDirection: 'row', gap: 12 },
  addressCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2, // shadow
  },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  addressLabel: { fontSize: 14, fontWeight: '500', color: '#000' },
  addressText: { fontSize: 12, color: '#666', lineHeight: 18 },

  addAddressBtn: {
    width: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  emptyWrap: { flex: 1, paddingHorizontal: 16, paddingTop: 40, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  emptySub: { marginTop: 8, fontSize: 13, color: "#777" },
});
