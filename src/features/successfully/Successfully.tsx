import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Successfully: React.FC = () => {
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.dimmedBackground}>
                <Text style={styles.bgTitle}>Checkout</Text>
            </View>

            <View style={styles.popup}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark" size={40} color="#fff" />
                </View>
                <Text style={styles.successText}>Payment done successfully.</Text>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Successfully;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    dimmedBackground: {
        position: 'absolute',
        top: 60,
        width: '100%',
        alignItems: 'center',
        opacity: 0.3,
    },
    bgTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },

    popup: {
        backgroundColor: '#fff',
        width: width * 0.8,
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F83758', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#F83758",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 }
    },
    successText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 20,
    },
    continueBtn: {
        backgroundColor: '#F83758',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
