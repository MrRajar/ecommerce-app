import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingBottom:20
  },

  keyboardWrap: {
    flex: 1,
    paddingBottom: '7%',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },

  checkoutHeaderWrap: {
    paddingTop: '7%',
    paddingLeft:10
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginTop: 10,
    marginBottom: 10,
  },

  fieldWrap: {
    marginTop: 8,
  },

  fieldLabel: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    marginLeft: 1,
  },

  inputBox: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
    paddingVertical: 0,
  },

  inputText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },

  changePasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 8,
  },

  changePasswordText: {
    fontSize: 14,
    color: '#F83758',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },

  separator: {
    height: 1,
    backgroundColor: '#DFDFDF',
    marginTop: 18,
    marginBottom: 12,
  },

  saveButton: {
    marginTop: 24,
    backgroundColor: '#F83758',
    height: 58,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.75,
  },

  saveContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  saveButtond: {
    marginTop: 24,
    backgroundColor: '#ffff',
    height: 58,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
   saveButtonTextd: {
    color: '#F83758',
    fontSize: 16,
    fontWeight: '700',
  },


  bottomSpacer: {
    height: 20,
  },

  // Avatar section
  avatarWrapper: {
    width: 106,
    height: 106,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#E5E7EB',
  },

  avatarEdit: {
    position: 'absolute',
    right: 6,
    bottom: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F6F6F6',
    elevation: 2,
  },

  // Bottom sheet
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  sheetCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },

  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 10,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },

  sheetSubtitle: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },

  sheetOption: {
    minHeight: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#FBFDFF',
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sheetOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  sheetIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  sheetIconDangerWrap: {
    backgroundColor: '#FEF2F2',
  },

  sheetOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  sheetDangerText: {
    color: '#DC2626',
  },

  sheetCancelBtn: {
    marginTop: 4,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sheetCancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  // Preview modal
  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  previewCloseBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  previewImageWrap: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },
});