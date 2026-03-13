import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import CheckoutHeader from '../../components/CheckoutHeader';
import { styles } from './settings.styles';
import ProfileAvatarSection from '../setting/Component/ProfileAvatarSection';
import SettingsInputField from '../setting/Component/SettingsInputField';
import AvatarOptionsSheet from '../setting/Component/AvatarOptionsSheet';
import ProfileImagePreviewModal from '../setting/Component/ProfileImagePreviewModal';

const PROFILE_IMAGE_KEY = '@profile_image_uri';

const SettingsScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const [draftProfileImageUri, setDraftProfileImageUri] = useState<
    string | null | undefined
  >(undefined);

  const [isSaving, setIsSaving] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [avatarSheetVisible, setAvatarSheetVisible] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  const [email, setEmail] = useState('aashifa@gmail.com');
  const [password, setPassword] = useState('************');

  const [pincode, setPincode] = useState('450116');
  const [address, setAddress] = useState("216 St Paul's Rd,");
  const [city, setCity] = useState('London');
  const [stateName, setStateName] = useState('N1 2LL,');
  const [country, setCountry] = useState('United Kingdom');

  const [bankAccountNumber, setBankAccountNumber] = useState('204356XXXXXXX');
  const [accountHolderName, setAccountHolderName] = useState('Abhiraj Sisodiya');
  const [ifscCode, setIfscCode] = useState('SBIN00428');

  useEffect(() => {
    const loadSavedProfileImage = async () => {
      try {
        const savedUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
        setProfileImageUri(savedUri || null);
        setDraftProfileImageUri(undefined);
      } catch (e) {
        console.log('Failed to load profile image', e);
      }
    };

    loadSavedProfileImage();
  }, []);

  const currentPreviewUri = useMemo(
    () => (draftProfileImageUri !== undefined ? draftProfileImageUri : profileImageUri),
    [draftProfileImageUri, profileImageUri]
  );

  const handlePickImage = async () => {
    try {
      setAvatarSheetVisible(false);

      if (Platform.OS !== 'android') {
        Alert.alert('Not supported', 'Profile image crop is enabled on Android only.');
        return;
      }

      setIsPickingImage(true);

      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        width: 600,
        height: 600,
        cropperCircleOverlay: true,
        compressImageQuality: 0.85,
        forceJpg: true,
      });

      const uri = image?.path;
      if (uri) {
        setDraftProfileImageUri(uri);
      }
    } catch (error: any) {
      if (
        error?.code === 'E_PICKER_CANCELLED' ||
        String(error?.message || '').toLowerCase().includes('cancel')
      ) {
        return;
      }

      Alert.alert('Error', 'Something went wrong while picking image');
    } finally {
      setIsPickingImage(false);
    }
  };

  const handleViewProfilePicture = () => {
    setAvatarSheetVisible(false);

    if (!currentPreviewUri) {
      Alert.alert('No Image', 'No profile picture selected.');
      return;
    }

    setImagePreviewVisible(true);
  };

  const handleRemoveProfilePicture = () => {
    setAvatarSheetVisible(false);

    const effectiveImage =
      draftProfileImageUri !== undefined ? draftProfileImageUri : profileImageUri;

    if (!effectiveImage) {
      Alert.alert('No Image', 'No profile picture to remove.');
      return;
    }

    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDraftProfileImageUri(null);
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      if (draftProfileImageUri !== undefined) {
        if (draftProfileImageUri) {
          await AsyncStorage.setItem(PROFILE_IMAGE_KEY, draftProfileImageUri);
          setProfileImageUri(draftProfileImageUri);
        } else {
          await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
          setProfileImageUri(null);
        }

        setDraftProfileImageUri(undefined);
      }
    } catch (e: any) {
      Alert.alert('Save failed', e?.message ?? 'Something went wrong while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    if (isLogoutLoading) return;

    try {
      setIsLogoutLoading(true);

      await auth().signOut();
      await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (e: any) {
      Alert.alert('Logout failed', e?.message ?? 'Something went wrong');
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (isDeleteLoading) return;

    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleteLoading(true);

              const currentUser = auth().currentUser;

              if (!currentUser) {
                throw new Error('No logged in user found');
              }

              await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
              await currentUser.delete();

              navigation.reset({
                index: 0,
                routes: [{ name: 'Signup' }],
              });
            } catch (e: any) {
              if (e?.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'Delete failed',
                  'For security reasons, please login again and then delete your account.'
                );
              } else {
                Alert.alert(
                  'Delete failed',
                  e?.message ?? 'Something went wrong while deleting account'
                );
              }
            } finally {
              setIsDeleteLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.checkoutHeaderWrap}>
          <CheckoutHeader />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ProfileAvatarSection
            imageUri={currentPreviewUri}
            isPickingImage={isPickingImage}
            onPressEdit={() => setAvatarSheetVisible(true)}
          />

          <Text style={styles.sectionTitle}>Personal Details</Text>

          <SettingsInputField
            label="Email Address"
            value={email}
            editable={false}
          />

          <SettingsInputField
            label="Password"
            value=""
          />

          <View style={styles.changePasswordRow}>
            <TouchableOpacity
              onPress={() => Alert.alert('Change Password', 'Change password flow (demo)')}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Business Address Details</Text>

          <SettingsInputField
            label="Pincode"
            value={pincode}
            onChangeText={(t) => setPincode(t.replace(/[^\d]/g, ''))}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={10}
          />

          <SettingsInputField
            label="Address"
            value={address}
            onChangeText={setAddress}
          />

          <SettingsInputField
            label="City"
            value={city}
            onChangeText={setCity}
          />

          <SettingsInputField
            label="State"
            value={stateName}
            onChangeText={setStateName}
            rightIcon={<Ionicons name="chevron-down" size={22} color="#9AA0A6" />}
          />

          <SettingsInputField
            label="Country"
            value={country}
            onChangeText={setCountry}
          />

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Bank Account Details</Text>

          <SettingsInputField
            label="Bank Account Number"
            value={bankAccountNumber}
            onChangeText={setBankAccountNumber}
          />

          <SettingsInputField
            label="Account Holder's Name"
            value={accountHolderName}
            onChangeText={setAccountHolderName}
          />

          <SettingsInputField
            label="IFSC Code"
            value={ifscCode}
            onChangeText={setIfscCode}
            autoCapitalize="characters"
          />

          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            activeOpacity={0.9}
            disabled={isSaving}
          >
            {isSaving ? (
              <View style={styles.saveContentRow}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.saveButtonText}>Saving...</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, isLogoutLoading && styles.saveButtonDisabled]}
            onPress={handleLogout}
            activeOpacity={0.9}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? (
              <View style={styles.saveContentRow}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.saveButtonText}>Logging out...</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>Logout</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButtond, isDeleteLoading && styles.saveButtonDisabled]}
            onPress={handleDeleteAccount}
            activeOpacity={0.9}
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? (
              <View style={styles.saveContentRow}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.saveButtonTextd}>Deleting account...</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonTextd}>Delete Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <AvatarOptionsSheet
        visible={avatarSheetVisible}
        onClose={() => setAvatarSheetVisible(false)}
        onView={handleViewProfilePicture}
        onChooseGallery={handlePickImage}
        onRemove={handleRemoveProfilePicture}
      />

      <ProfileImagePreviewModal
        visible={imagePreviewVisible}
        imageUri={currentPreviewUri}
        onClose={() => setImagePreviewVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;