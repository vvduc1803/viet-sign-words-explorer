
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Check, X, Eye, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentData {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  accountNumber: string;
  bankName: string;
  transferImage: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const PaymentManagement = () => {
  const { approvePayment, rejectPayment } = useAuth();
  const [payments, setPayments] = useState<PaymentData[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Test User',
      userEmail: 'test@example.com',
      amount: 299000,
      accountNumber: '9876543210',
      bankName: 'Vietcombank',
      transferImage: '/placeholder.svg',
      status: 'pending',
      createdAt: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Premium User',
      userEmail: 'premium@example.com',
      amount: 299000,
      accountNumber: '1111222233',
      bankName: 'Techcombank',
      transferImage: '/placeholder.svg',
      status: 'approved',
      createdAt: '2024-01-14 10:20:00'
    }
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleApprove = async (paymentId: string) => {
    try {
      const payment = payments.find(p => p.id === paymentId);
      if (payment) {
        await approvePayment(payment.userId);
        setPayments(prev => prev.map(p => 
          p.id === paymentId ? { ...p, status: 'approved' as const } : p
        ));
      }
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  const handleReject = async (paymentId: string) => {
    try {
      const payment = payments.find(p => p.id === paymentId);
      if (payment) {
        await rejectPayment(payment.userId);
        setPayments(prev => prev.map(p => 
          p.id === paymentId ? { ...p, status: 'rejected' as const } : p
        ));
      }
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  const getStatusBadge = (status: PaymentData['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Chờ xử lý</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Từ chối</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Quản lý thanh toán</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {payments.filter(p => p.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Chờ xử lý</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {payments.filter(p => p.status === 'approved').length}
              </div>
              <div className="text-sm text-green-600">Đã duyệt</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {payments.filter(p => p.status === 'rejected').length}
              </div>
              <div className="text-sm text-red-600">Từ chối</div>
            </div>
          </div>

          {/* Payments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Thông tin TK</TableHead>
                <TableHead>Ảnh CK</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.userName}</div>
                      <div className="text-sm text-gray-500">{payment.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{payment.accountNumber}</div>
                      <div className="text-xs text-gray-500">{payment.bankName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedImage(payment.transferImage)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Xem
                    </Button>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{payment.createdAt}</div>
                  </TableCell>
                  <TableCell>
                    {payment.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(payment.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Duyệt
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(payment.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Từ chối
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ảnh chuyển khoản</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Ảnh chuyển khoản"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PaymentManagement;
