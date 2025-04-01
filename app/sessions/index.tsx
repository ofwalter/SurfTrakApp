import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
  Easing,
  useAnimatedProps
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import SessionCard from '../../components/SessionCard';

// Sample data for testing
const sampleSessions = [
  {
    id: '1',
    location: 'Huntington Beach',
    date: 'April 10, 2023',
    time: '10:30 AM - 12:45 PM',
    waveCount: 12,
    maxSpeed: 18,
    duration: '2h 15m'
  },
  {
    id: '2',
    location: 'Newport Beach',
    date: 'April 5, 2023',
    time: '8:15 AM - 11:00 AM',
    waveCount: 9,
    maxSpeed: 15,
    duration: '2h 45m'
  },
  {
    id: '3',
    location: 'Malibu Point',
    date: 'March 28, 2023',
    time: '9:00 AM - 11:30 AM',
    waveCount: 15,
    maxSpeed: 22,
    duration: '2h 30m'
  },
  {
    id: '4',
    location: 'Trestles',
    date: 'March 15, 2023',
    time: '7:45 AM - 10:30 AM',
    waveCount: 8,
    maxSpeed: 20,
    duration: '2h 45m'
  }
];

// Animated gradient component for the add button
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// For simplicity, we'll use a gray box with map marker as placeholder
const MapPlaceholder = () => (
  <View className="w-full h-full bg-gray-200 items-center justify-center">
    <MaterialCommunityIcons name="map-marker" size={28} color="#1A73E8" />
  </View>
);

const SessionsHeader = () => {
  const insets = useSafeAreaInsets();
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.7);
  const buttonScale = useSharedValue(1);
  const colorProgress = useSharedValue(0);
  
  useEffect(() => {
    // Create more interesting pulsing animation for the outer effect
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { 
          duration: 1000, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        }),
        withTiming(1.05, { 
          duration: 800, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        }),
        withTiming(1.15, { 
          duration: 600, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        })
      ),
      -1,
      true
    );
    
    pulseOpacity.value = withRepeat(
      withTiming(0.2, { 
        duration: 2400, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      }),
      -1,
      true
    );
    
    // Subtle scale animation for the button itself
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        })
      ),
      -1,
      true
    );
    
    // Color animation
    colorProgress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      }),
      -1,
      true
    );
  }, []);
  
  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });
  
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });
  
  const animatedGradientProps = useAnimatedProps(() => {
    // Colors to transition between
    const colors = [
      ['#1A73E8', '#4AB1FF'], // Starting gradient
      ['#0056B3', '#1A73E8'], // Middle gradient
      ['#004494', '#0066CC']  // End gradient
    ];
    
    // Interpolate between different color pairs based on progress
    const currentColors = [
      interpolateColor(
        colorProgress.value,
        [0, 0.5, 1],
        [colors[0][0], colors[1][0], colors[2][0]]
      ),
      interpolateColor(
        colorProgress.value,
        [0, 0.5, 1],
        [colors[0][1], colors[1][1], colors[2][1]]
      )
    ];
    
    return {
      colors: currentColors as any
    };
  });
  
  return (
    <BlurView intensity={80} tint="light" className="border-b border-gray-200/50">
      <View style={{ paddingTop: insets.top }} className="flex-row items-center justify-between px-5 py-4">
        <View className="relative">
          <Animated.View style={buttonStyle}>
            <TouchableOpacity className="w-14 h-14 rounded-full overflow-hidden items-center justify-center">
              <AnimatedLinearGradient
                animatedProps={animatedGradientProps}
                colors={['#1A73E8', '#4AB1FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 bottom-0"
              />
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View 
            style={[pulseStyle, {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 28,
              backgroundColor: '#1A73E8',
              zIndex: -1,
            }]}
          />
        </View>
        
        <Text className="text-3xl font-bold text-gray-800">Sessions</Text>
        
        <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center">
          <Ionicons name="filter-outline" size={24} color="#1A73E8" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default function Sessions() {
  const insets = useSafeAreaInsets();
  
  const handleSessionPress = (sessionId: string) => {
    console.log(`Session ${sessionId} pressed`);
  };
  
  return (
    <View className="flex-1 bg-gray-50">
      <SessionsHeader />
      <ScrollView
        className="flex-1 pt-2"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {sampleSessions.map(session => (
          <SessionCard
            key={session.id}
            location={session.location}
            date={session.date}
            time={session.time}
            waveCount={session.waveCount}
            duration={session.duration}
            onPress={() => handleSessionPress(session.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
} 