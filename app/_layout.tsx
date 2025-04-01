import React from 'react';
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
}
