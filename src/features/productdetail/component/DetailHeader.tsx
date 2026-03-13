import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DetailHeader: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <View/>

            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Ionicons name="bag-handle-outline" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

export default DetailHeader;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    headerTitle: { fontSize: 18, fontWeight: '700' },
});