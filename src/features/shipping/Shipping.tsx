import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Shipping: React.FC = () => {
    const navigation = useNavigation<any>();
    const [selectedMethod, setSelectedMethod] = useState('visa');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>

                <View style={styles.summarySection}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Order</Text>
                        <Text style={styles.value}>₹ 7,000</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Shipping</Text>
                        <Text style={styles.value}>₹ 30</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labeltotal}>Total</Text>
                        <Text style={styles.valuetotal}>₹ 7,030</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Payment</Text>

                <PaymentOption
                    id="visa"
                    label="**** **** **** 2109"
                    icon="card-outline" 
                    brand="Visa"
                    selected={selectedMethod === 'visa'}
                    onSelect={() => setSelectedMethod('visa')}
                />

                <PaymentOption
                    id="paypal"
                    label="**** **** **** 2109"
                    icon="logo-paypal"
                    brand="PayPal"
                    selected={selectedMethod === 'paypal'}
                    onSelect={() => setSelectedMethod('paypal')}
                />

                <PaymentOption
                    id="maestro"
                    label="**** **** **** 2109"
                    icon="card"
                    brand="Maestro"
                    selected={selectedMethod === 'maestro'}
                    onSelect={() => setSelectedMethod('maestro')}
                />

                <PaymentOption
                    id="apple"
                    label="**** **** **** 2109"
                    icon="logo-apple"
                    brand="Apple"
                    selected={selectedMethod === 'apple'}
                    onSelect={() => setSelectedMethod('apple')}
                />

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() => navigation.replace('Successfully')}
                >
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const PaymentOption = ({ id, label, icon, brand, selected, onSelect }: any) => (
    <TouchableOpacity
        style={[styles.paymentCard, selected && styles.paymentCardSelected]}
        onPress={onSelect}
        activeOpacity={0.9}
    >
        <View style={styles.cardInfo}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={selected ? "#F83758" : "#000"} />
                {brand && <Text style={{ fontSize: 10, fontWeight: '700', marginLeft: 4 }}>{brand}</Text>}
            </View>
            <Text style={styles.cardNumber}>{label}</Text>
        </View>
    </TouchableOpacity>
);

export default Shipping;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop:25
    },
    headerTitle: { fontSize: 18, fontWeight: '700', fontFamily:"Montserrat" },

    summarySection: {
        marginBottom: 20,
        gap: 12,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { fontSize: 16,fontFamily:"Montserrat", color: '#4C5059' },
    value: { fontSize: 16,fontFamily:"Montserrat", color:  '#4C5059', fontWeight: '700' },
     
    labeltotal: { fontSize: 16,fontFamily:"Montserrat", color: '#0000' },
    valuetotal: { fontSize: 16, fontFamily:"Montserrat",color:'#0000', fontWeight: '700' },

    divider: { height: 1, backgroundColor: '#eee', marginBottom: 24 },

    sectionTitle: { fontSize: 18,fontFamily:"Montserrat", fontWeight: '700', marginBottom: 16 },

    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    paymentCardSelected: {
        backgroundColor: '#fff',
        borderColor: '#F83758',
        borderWidth: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
    },
    cardNumber: {
        fontSize: 14, fontFamily:"Montserrat",
        color: '#333',
        letterSpacing: 1,
    },

    footer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    continueBtn: {
        backgroundColor: '#F83758',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#F83758',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        fontFamily:"Montserrat",
    },
});
