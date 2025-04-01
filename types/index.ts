export interface User {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  sessionId: string;
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  startTime: Date;
  endTime: Date;
  waveCount: number;
  averageSpeed: number;
  maxSpeed: number;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wave {
  waveId: string;
  sessionId: string;
  waveNumber: number;
  startTime: Date;
  endTime: Date;
  duration: number;
  topSpeed: number;
  averageSpeed: number;
  path: Array<{
    latitude: number;
    longitude: number;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
} 