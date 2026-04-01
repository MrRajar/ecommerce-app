import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ScrollView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

interface Filters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
}

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: Filters) => void;
    onReset?: () => void;
}

const categories = ['Men', 'Women', 'Beauty', 'Fashion', 'Kids'];
const ratings = [5, 4, 3, 2, 1];

const FilterModal: React.FC<FilterModalProps> = ({
    visible,
    onClose,
    onApply,
    onReset,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | undefined>();

    const onlyDigits = (text: string) => text.replace(/[^\d]/g, '');

    const resetFilters = () => {
        setSelectedCategory(undefined);
        setMinPrice('');
        setMaxPrice('');
        setSelectedRating(undefined);

        if (onReset) {
            onReset();
        } else {
            onApply({});
        }

        onClose();
    };

    const applyFilters = () => {
        onApply({
            category: selectedCategory,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minRating: selectedRating,
        });

        onClose();
    };

    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
        >
            <Pressable style={styles.overlay} onPress={onClose} />

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >
                <Text style={styles.title}>Filter</Text>

                <ScrollView>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.optionContainer}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.optionButton,
                                    selectedCategory === cat && styles.optionSelected,
                                ]}
                                onPress={() =>
                                    setSelectedCategory(selectedCategory === cat ? undefined : cat)
                                }
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedCategory === cat && styles.optionTextSelected,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Price Range</Text>
                    <View style={styles.priceRow}>
                        <TextInput
                            placeholder="Min"
                            placeholderTextColor="#999"
                            style={styles.priceInput}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            inputMode="numeric"
                            value={minPrice}
                            maxLength={8}
                            onChangeText={(text) => setMinPrice(onlyDigits(text))}
                        />

                        <Text style={{ marginHorizontal: 8 }}>-</Text>

                        <TextInput
                            placeholder="Max"
                            placeholderTextColor="#999"
                            style={styles.priceInput}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            inputMode="numeric"
                            value={maxPrice}
                            maxLength={8}
                            onChangeText={(text) => setMaxPrice(onlyDigits(text))}
                        />
                    </View>

                    <Text style={styles.label}>Minimum Rating</Text>
                    <View style={styles.optionContainer}>
                        {ratings.map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={[
                                    styles.optionButton,
                                    selectedRating === r && styles.optionSelected,
                                ]}
                                onPress={() =>
                                    setSelectedRating(selectedRating === r ? undefined : r)
                                }
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedRating === r && styles.optionTextSelected,
                                    ]}
                                >
                                    {r}⭐
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                        <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        maxHeight: '80%',
        backgroundColor: '#FDFDFD',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
    },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#000' },
    label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
    optionContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    optionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
    },
    optionSelected: {
        backgroundColor: '#FF4B26',
        borderColor: '#FF4B26',
    },
    optionText: { fontSize: 13, color: '#000' },
    optionTextSelected: { color: '#fff', fontWeight: '600' },
    priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 36,
        fontSize: 13,
        color: '#000',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    resetButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#FF4B26',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginRight: 10,
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#FF4B26',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginLeft: 10,
    },
    resetText: { color: '#FF4B26', fontWeight: '600' },
    applyText: { color: '#fff', fontWeight: '600' },
});