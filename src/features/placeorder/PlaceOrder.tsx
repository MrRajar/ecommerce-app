import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppImages from '../../shared/utlis/AppImages';

const PlaceOrder: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const { product } = route.params || {};

    const item = product || {
        id: '1',
        title: "Women's Casual Wear",
        subtitle: "Checked Single-Breasted Blazer",
        price: 0,
        size: 'M',
        qty: 1,
        image: null,
    };

    // Dynamic price calculations from backend data
    const qty = item.qty || 1;
    const unitPrice = Number(item.price) || 0;
    const orderAmount = unitPrice * qty;
    const deliveryFee = 0;
    const convenienceFee = 0;
    const orderTotal = orderAmount + deliveryFee + convenienceFee;

    // Dynamic delivery date (7 days from now)
    const deliveryDate = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `Delivery by ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }, []);

    const normalizeImage = (img: any) => {
        if (typeof img === 'string') return { uri: img };
        return img;
    };

    // Get image from backend data
    const productImage = item.image || item.imageUrl || item.images?.[0];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shopping Bag</Text>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                {/* Product Card - All data from backend */}
                <View style={styles.productCard}>
                    <Image
                        source={productImage ? normalizeImage(productImage) : AppImages.product1}
                        style={styles.productImage}
                        resizeMode="cover"
                    />
                    <View style={styles.productDetails}>
                        <Text style={styles.productTitle}>{item.title || item.name || 'Product'}</Text>
                        <Text style={styles.productSubtitle}>{item.subtitle || item.description || ''}</Text>

                        <View style={styles.optionsRow}>
                            <View style={styles.optionBadge}>
                                <Text style={styles.optionText}>Size {item.size || 'M'}</Text>
                                <Ionicons name="chevron-down" size={12} color="#000" />
                            </View>
                            <View style={styles.optionBadge}>
                                <Text style={styles.optionText}>Qty {qty}</Text>
                                <Ionicons name="chevron-down" size={12} color="#000" />
                            </View>
                        </View>

                        <Text style={styles.deliveryText}>{item.deliveryText || deliveryDate}</Text>
                    </View>
                </View>

                <View style={styles.couponSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name="ticket-outline" size={24} color="#000" />
                        <Text style={styles.couponText}>Apply Coupons</Text>
                    </View>
                    <Text style={styles.selectText}>Select</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.detailsSection}>
                    <Text style={styles.detailsTitle}>Order Payment Details</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Order Amounts</Text>
                        <Text style={styles.value}>₹{orderAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.label}>Convenience</Text>
                            <Text style={styles.knowMore}> Know More</Text>
                        </View>
                        <Text style={styles.applyCoupon}>Apply Coupon</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery Fee</Text>
                        <Text style={styles.freeText}>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toLocaleString('en-IN')}`}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Order Total</Text>
                        <Text style={styles.totalValue}>₹{orderTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            <Text style={styles.label}>EMI Available</Text>
                            <Text style={styles.knowMore}> Details</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>

            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.bottomTotal}>₹{orderTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
                    <Text style={styles.viewDetails}>View Details</Text>
                </View>
                <TouchableOpacity
                    style={styles.proceedBtn}
                    onPress={() => navigation.replace('Shipping', { product: item })}
                >
                    <Text style={styles.proceedText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default PlaceOrder;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 25,
    },
    headerTitle: { fontSize: 18, fontWeight: '700' },

    productCard: {
        flexDirection: 'row',
        padding: 16,
    },
    productImage: {
        width: 100,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    productDetails: {
        flex: 1,
        marginLeft: 16,
    },
    productTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    productSubtitle: { fontSize: 12, color: '#666', marginBottom: 12 },

    optionsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    optionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        gap: 6,
    },
    optionText: { fontSize: 12, fontWeight: '600' },
    deliveryText: { fontSize: 12, color: '#444' },

    couponSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginTop: 10,
    },
    couponText: { fontSize: 14, fontWeight: '600' },
    selectText: { fontSize: 14, color: '#F83758', fontWeight: '700' },

    divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16 },

    detailsSection: {
        padding: 16,
    },
    detailsTitle: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' },
    label: { fontSize: 14, color: '#888' },
    value: { fontSize: 14, fontWeight: '700' },
    knowMore: { fontSize: 12, color: '#F83758', fontWeight: '600' },
    applyCoupon: { fontSize: 12, color: '#F83758', fontWeight: '600' },
    freeText: { fontSize: 14, color: '#ea4c89', fontWeight: '700' },
    totalLabel: { fontSize: 16, fontWeight: '700' },
    totalValue: { fontSize: 16, fontWeight: '700' },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    bottomTotal: { fontSize: 18, fontWeight: '700' },
    viewDetails: { fontSize: 12, color: '#F83758' },
    proceedBtn: {
        backgroundColor: '#F83758',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    proceedText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});