import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Session } from '../types';

interface SessionCardProps {
  session: Session;
  onPress: (sessionId: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(session.sessionId)}>
      <View className="p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold">{new Date(session.startTime).toLocaleDateString()}</Text>
        <Text className="text-gray-600">Waves: {session.waveCount}</Text>
        <Text className="text-gray-600">Max Speed: {session.maxSpeed} mph</Text>
      </View>
    </TouchableOpacity>
  );
}; 