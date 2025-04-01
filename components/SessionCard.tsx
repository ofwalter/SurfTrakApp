import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Get screen dimensions for responsive sizing
const { width: screenWidth } = Dimensions.get('window');

interface SessionCardProps {
  location: string;
  date: string;
  time: string;
  waveCount: number;
  duration: string;
  onPress?: () => void;
}

// Simple map placeholder component
const MapPlaceholder = () => (
  <View className="w-full h-full bg-gray-300 items-center justify-center opacity-80">
    <MaterialCommunityIcons name="map" size={36} color="#1A73E8" style={{ opacity: 0.7 }} />
  </View>
);

const SessionCard: React.FC<SessionCardProps> = ({
  location,
  date,
  time,
  waveCount,
  duration,
  onPress
}) => {
  return (
    <TouchableOpacity 
      className="mx-4 my-3 rounded-3xl overflow-hidden shadow-lg"
      style={{ height: 180 }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="flex-row h-full">
        {/* Left Side - Gradient with Session Info */}
        <LinearGradient
          colors={['#0056B3', '#1A73E8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-3/5 p-5 justify-between"
        >
          <View>
            <Text className="text-white text-xl font-bold" numberOfLines={1}>
              {location}
            </Text>
            <Text className="text-blue-100 text-sm mt-1">
              {date}
            </Text>
            <Text className="text-blue-100 text-sm">
              {time}
            </Text>
          </View>
          
          <View className="flex-row mt-2">
            <View className="mr-4">
              <Text className="text-blue-100 text-xs">Waves</Text>
              <Text className="text-white text-lg font-bold">{waveCount}</Text>
            </View>
            <View>
              <Text className="text-blue-100 text-xs">Duration</Text>
              <Text className="text-white text-lg font-bold">{duration}</Text>
            </View>
          </View>
        </LinearGradient>
        
        {/* Right Side - Map Overlay */}
        <View className="w-2/5 relative">
          <MapPlaceholder />
          <LinearGradient
            colors={['rgba(0,86,179,0.4)', 'rgba(26,115,232,0.4)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute top-0 left-0 w-full h-full"
          />
          <View className="absolute top-5 right-5 bg-white/20 rounded-full p-2">
            <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SessionCard; 