import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
}

interface UsageStats {
  searches: number;
  uploads: number;
  practices: number;
  savedWords: number;
  lastReset: string;
}

interface PaymentSubmission {
  accountNumber: string;
  bankName: string;
  transferImage: File;
  amount: number;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  usageStats: UsageStats;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUsage: (type: 'searches' | 'uploads' | 'practices' | 'savedWords', increment?: number) => void;
  canPerformAction: (type: 'searches' | 'uploads' | 'practices' | 'savedWords') => boolean;
  upgrade: () => void;
  submitPayment: (payment: PaymentSubmission) => Promise<void>;
  approvePayment: (userId: string) => Promise<void>;
  rejectPayment: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    searches: 0,
    uploads: 0,
    practices: 0,
    savedWords: 0,
    lastReset: new Date().toDateString()
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedUsage = localStorage.getItem('usageStats');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsage) {
      const usage = JSON.parse(savedUsage);
      // Reset usage if it's a new day
      if (usage.lastReset !== new Date().toDateString()) {
        setUsageStats({
          searches: 0,
          uploads: 0,
          practices: 0,
          savedWords: usage.savedWords, // Keep saved words count
          lastReset: new Date().toDateString()
        });
      } else {
        setUsageStats(usage);
      }
    }
  }, []);

  // Save to localStorage when user or usage changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('usageStats', JSON.stringify(usageStats));
  }, [usageStats]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAdmin = email === 'admin@example.com' && password === 'admin123';
    
    const mockUser: User = {
      id: isAdmin ? 'admin' : '1',
      name: isAdmin ? 'Admin' : (email.includes('test') ? 'Test User' : 'Người dùng'),
      email: email,
      isPremium: isAdmin ? true : false,
      isAdmin: isAdmin,
      isActive: true
    };
    
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      isPremium: false,
      isAdmin: false,
      isActive: true
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    setUsageStats({
      searches: 0,
      uploads: 0,
      practices: 0,
      savedWords: 0,
      lastReset: new Date().toDateString()
    });
  };

  const updateUsage = (type: 'searches' | 'uploads' | 'practices' | 'savedWords', increment: number = 1) => {
    setUsageStats(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment)
    }));
  };

  const canPerformAction = (type: 'searches' | 'uploads' | 'practices' | 'savedWords'): boolean => {
    if (user?.isPremium) return true;
    
    const limits = user 
      ? { searches: 50, uploads: 3, practices: 3, savedWords: 50 }
      : { searches: 20, uploads: 1, practices: 0, savedWords: 0 };
    
    return usageStats[type] < limits[type];
  };

  const upgrade = () => {
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  const submitPayment = async (payment: PaymentSubmission) => {
    // Simulate API call to submit payment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Payment submitted:', {
      ...payment,
      transferImage: payment.transferImage.name
    });
    
    // In a real app, this would upload the image and save payment data
  };

  const approvePayment = async (userId: string) => {
    // Simulate API call to approve payment and upgrade user
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // If it's the current user, upgrade them
    if (user && user.id === userId) {
      setUser({ ...user, isPremium: true });
    }
    
    console.log('Payment approved for user:', userId);
  };

  const rejectPayment = async (userId: string) => {
    // Simulate API call to reject payment
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Payment rejected for user:', userId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      usageStats,
      login,
      register,
      logout,
      updateUsage,
      canPerformAction,
      upgrade,
      submitPayment,
      approvePayment,
      rejectPayment
    }}>
      {children}
    </AuthContext.Provider>
  );
};
