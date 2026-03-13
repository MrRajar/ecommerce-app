import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TrendingHeaderProps {
  title: string;
  subtitle?: string;
  onPressViewAll?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const TrendingHeader: React.FC<TrendingHeaderProps> = ({
  title,
  subtitle = '',
  onPressViewAll,
  backgroundColor = '#FD6E87',
  textColor = '#fff',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>

        {subtitle !== '' && (
          <View style={styles.subtitleRow}>
            <Ionicons name="calendar-outline" size={16} color={textColor} />
            <Text style={[styles.subtitle, { color: textColor }]}>
              {subtitle}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.viewAllBtn} onPress={onPressViewAll}>
        <Text style={styles.viewAllText}>View all →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrendingHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },

  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },

  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Montserrat',
  },

  viewAllBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },

  viewAllText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
