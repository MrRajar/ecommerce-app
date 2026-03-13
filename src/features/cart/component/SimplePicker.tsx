import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TEXT = "#111";
const RED = "#ff2d55";
const BORDER = "#ededed";

const SimplePicker: React.FC<{
  visible: boolean;
  title: string;
  options: string[];
  selected?: string;
  onClose: () => void;
  onSelect: (v: string) => void;
}> = ({ visible, title, options, selected, onClose, onSelect }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={20} color={TEXT} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={options}
            keyExtractor={(it) => it}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => {
              const active = item === selected;
              return (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={[styles.rowText, active && styles.activeText]}>{item}</Text>
                  {active ? <Ionicons name="checkmark" size={18} color={RED} /> : null}
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SimplePicker;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 18,
    maxHeight: "55%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  title: { fontSize: 14, fontWeight: "800", color: TEXT },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowText: { fontSize: 14, color: TEXT },
  activeText: { color: RED, fontWeight: "700" },
  sep: { height: 1, backgroundColor: BORDER, marginLeft: 16 },
});
