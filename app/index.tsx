import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

// Get screen dimensions for responsive design
const { width: screenWidth } = Dimensions.get('window');

// New image imports
const profilePlaceholder = require('../assets/images/placeholder-profilephoto.png');
const logoImage = require('../assets/images/Surftrak logo white bg.jpeg');

const TopBar = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <BlurView intensity={80} tint="light" className="border-b border-gray-200/50">
      <View style={{ paddingTop: insets.top }} className="flex-row items-center justify-between px-5 py-4">
        <Image
          source={profilePlaceholder}
          className="w-14 h-14 rounded-full"
        />
        <Image 
          source={logoImage} 
          className="h-12 w-40"
          resizeMode="contain"
        />
        <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center">
          <Ionicons name="settings-outline" size={24} color="#1A73E8" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const GoalCard = () => {
  // Animation values
  const progressValue = useSharedValue(0);
  const rippleOpacity = useSharedValue(0.7);
  const rippleScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const [messageIndex, setMessageIndex] = React.useState(0);
  
  // Motivational messages
  const motivationalMessages = [
    "Every wave is a step toward mastery",
    "Focus on progress, not perfection",
    "The best surfers simply surf more",
    "Consistency builds excellence over time",
    "Small improvements compound into greatness"
  ];
  
  useEffect(() => {
    // Animate progress bar on load with spring effect
    progressValue.value = withTiming(0.3, { 
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });
    
    // Create ripple effect
    rippleScale.value = withRepeat(
      withTiming(1.2, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      true
    );
    
    rippleOpacity.value = withRepeat(
      withTiming(0.1, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      true
    );
    
    // Create glow pulsing effect
    glowOpacity.value = withRepeat(
      withTiming(0.6, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      true
    );
    
    // Rotate through motivational messages
    const messageInterval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % motivationalMessages.length);
    }, 5000);
    
    return () => clearInterval(messageInterval);
  }, []);
  
  // Create animated styles for progress bar
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });
  
  const rippleStyle = useAnimatedStyle(() => {
    return {
      opacity: rippleOpacity.value,
      transform: [{ scale: rippleScale.value }],
    };
  });
  
  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });
  
  return (
    <View className="mx-4 mt-5 mb-3">
      <LinearGradient
        colors={['#0056B3', '#1A73E8', '#4AB1FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-5 rounded-3xl shadow-lg"
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-xl font-bold">Weekly Goal</Text>
            <Text className="text-blue-100 text-sm">5 days left</Text>
          </View>
          <TouchableOpacity 
            className="bg-white/20 rounded-full h-8 w-8 items-center justify-center"
          >
            <Ionicons name="options-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View className="items-center justify-center py-2">
          <Text className="text-white text-center text-2xl font-bold mb-2">
            15/50 waves
          </Text>
          
          <View className="w-full h-5 bg-white/20 rounded-full overflow-hidden">
            <Animated.View 
              style={[progressStyle, { height: '100%' }]}
              className="bg-white/80 rounded-full"
            />
            <Animated.View 
              style={[progressStyle, glowStyle, { 
                position: 'absolute', 
                height: '100%',
                shadowColor: "#fff",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
              }]}
              className="bg-transparent rounded-full"
            />
          </View>
        </View>
        
        <Text className="text-white text-center text-sm mt-3">
          {motivationalMessages[messageIndex]}
        </Text>
      </LinearGradient>
    </View>
  );
};

const StatCard = ({ title, value, icon, color, gradient }: 
  { title: string; value: string; icon: string; color: string; gradient: [string, string] }
) => {
  const scale = useSharedValue(0.95);
  
  useEffect(() => {
    scale.value = withSpring(1);
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  return (
    <Animated.View style={animatedStyle} className="mr-4">
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5 rounded-2xl shadow-md"
        style={{ width: screenWidth * 0.4, height: 130 }}
      >
        <View className="flex-1 justify-between">
          <View className="bg-white/20 p-2 rounded-lg self-start">
            <MaterialCommunityIcons name={icon as any} size={20} color="#fff" />
          </View>
          
          <View>
            <Text className="text-white font-medium text-sm mb-1">{title}</Text>
            <Text className="text-white text-2xl font-bold">{value}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const LifetimeStats = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
      contentContainerStyle={{ paddingRight: 20 }}
      decelerationRate="fast"
      snapToInterval={screenWidth * 0.4 + 16}
      snapToAlignment="start"
    >
      <StatCard 
        title="Avg Speed" 
        value="15 mph" 
        icon="speedometer" 
        color="#1A73E8" 
        gradient={['#1A73E8', '#0056B3']}
      />
      <StatCard 
        title="Longest Wave" 
        value="45 sec" 
        icon="clock-outline" 
        color="#0056B3" 
        gradient={['#0056B3', '#003B7A']}
      />
      <StatCard 
        title="Total Distance" 
        value="1.2 mi" 
        icon="map-marker-distance" 
        color="#2F95DC" 
        gradient={['#2F95DC', '#2576AD']}
      />
      <StatCard 
        title="Best Speed" 
        value="25 mph" 
        icon="lightning-bolt" 
        color="#4AB1FF" 
        gradient={['#4AB1FF', '#3A8ED0']}
      />
    </ScrollView>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <View className="flex-row items-center justify-between px-4 mb-3">
    <Text className="text-xl font-bold text-gray-800">{title}</Text>
    <TouchableOpacity>
      <Text className="text-ocean-blue font-medium">See All</Text>
    </TouchableOpacity>
  </View>
);

const PlaceholderCard = ({ title, description, icon }: 
  { title: string; description: string; icon: string }
) => (
  <View className="mx-4 mb-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
    <View className="flex-row items-start">
      <View className="bg-blue-50 p-3 rounded-xl mr-4">
        <MaterialCommunityIcons name={icon as any} size={24} color="#1A73E8" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
        <Text className="text-gray-500">{description}</Text>
      </View>
    </View>
  </View>
);

export default function Home() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-gray-50">
      <TopBar />
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <GoalCard />
        
        <View className="mt-5">
          <SectionHeader title="Lifetime Stats" />
          <LifetimeStats />
        </View>
        
        <View className="mt-5">
          <SectionHeader title="Recommended" />
          <PlaceholderCard 
            title="News" 
            description="View the newest SurfTrak news and updates" 
            icon="newspaper"
          />
          <PlaceholderCard 
            title="User Guide" 
            description="Learn how to use SurfTrak with our comprehensive guide" 
            icon="book-open-variant"
          />
        </View>
      </ScrollView>
    </View>
  );
}
