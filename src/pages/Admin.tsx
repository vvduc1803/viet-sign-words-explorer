
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, BookOpen, CheckCircle, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/admin/UserManagement';
import VocabularyManagement from '@/components/admin/VocabularyManagement';
import ContributionApproval from '@/components/admin/ContributionApproval';
import PaymentManagement from '@/components/admin/PaymentManagement';

const Admin = () => {
  const { user } = useAuth();

  // Redirect if not admin
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý hệ thống</h1>
              <p className="text-gray-600">Chào mừng, {user.name}</p>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Quản lý người dùng</span>
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Quản lý từ vựng</span>
            </TabsTrigger>
            <TabsTrigger value="contributions" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Phê duyệt đóng góp</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Quản lý thanh toán</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="vocabulary">
            <VocabularyManagement />
          </TabsContent>

          <TabsContent value="contributions">
            <ContributionApproval />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
