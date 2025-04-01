import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

// Get screen dimensions for responsive design
const { width: screenWidth } = Dimensions.get('window');

// New image imports
const profilePlaceholder = require('../../assets/images/placeholder-profilephoto.png');

const ProfileHeader = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <BlurView intensity={80} tint="light" className="border-b border-gray-200/50">
      <View style={{ paddingTop: insets.top }} className="flex-row items-center justify-between px-5 py-4">
        <View className="w-12" />
        <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center">
          <Ionicons name="settings-outline" size={24} color="#1A73E8" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const ProfileCard = () => {
  const { user } = useAuth();
  
  // Mock user data for development
  const mockUser = {
    displayName: user?.displayName || "John Doe",
    email: user?.email || "johndoe@surftrak.com",
    photoURL: user?.photoURL
  };
  
  return (
    <View className="items-center px-6 pt-6 pb-2">
      {/* Profile Picture */}
      <View className="mb-4 shadow-lg">
        <Image
          source={mockUser.photoURL ? { uri: mockUser.photoURL } : profilePlaceholder}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </View>
      
      {/* User Info */}
      <Text className="text-2xl font-bold text-gray-800">{mockUser.displayName}</Text>
      <Text className="text-gray-500 mt-1 mb-4">{mockUser.email}</Text>
      
      {/* Stats Summary (optional) */}
      <View className="flex-row justify-between w-full mt-2 mb-6">
        <View className="items-center">
          <Text className="text-2xl font-bold text-blue-600">36</Text>
          <Text className="text-gray-500 text-sm">Sessions</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-blue-600">245</Text>
          <Text className="text-gray-500 text-sm">Waves</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-blue-600">25mph</Text>
          <Text className="text-gray-500 text-sm">Top Speed</Text>
        </View>
      </View>
    </View>
  );
};

const MenuCard = ({ title, icon, color, onPress }: { 
  title: string; 
  icon: string; 
  color: string;
  onPress: () => void;
}) => {
  // Map color strings to background colors
  const getBgColor = (color: string) => {
    switch (color) {
      case '#1A73E8': return '#E0F2FE'; // blue-100
      case '#16A34A': return '#DCFCE7'; // green-100
      case '#EA580C': return '#FFEDD5'; // orange-100
      case '#DC2626': return '#FEE2E2'; // red-100
      default: return '#F3F4F6'; // gray-100
    }
  };

  return (
    <TouchableOpacity 
      className="mx-4 my-2 rounded-2xl overflow-hidden shadow-md"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4 flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center" 
            style={{ backgroundColor: getBgColor(color) }}
          >
            <MaterialCommunityIcons name={icon as any} size={22} color={color} />
          </View>
          <Text className="ml-4 text-lg font-medium text-gray-800">{title}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <View className="flex-1 bg-gray-50">
      <ProfileHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard />
        
        {/* Menu Cards */}
        <View className="mt-2">
          <MenuCard 
            title="Settings" 
            icon="cog-outline" 
            color="#1A73E8" 
            onPress={() => console.log('Settings pressed')}
          />
          <MenuCard 
            title="Device Manager" 
            icon="devices" 
            color="#16A34A" 
            onPress={() => console.log('Device Manager pressed')}
          />
          <MenuCard 
            title="Help & Support" 
            icon="help-circle-outline" 
            color="#EA580C" 
            onPress={() => console.log('Help pressed')}
          />
          <MenuCard 
            title="Log Out" 
            icon="logout-variant" 
            color="#DC2626" 
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
} 