
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserCheck, UserX, Crown, User } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isActive: boolean;
  joinDate: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      isPremium: false,
      isActive: true,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Premium User',
      email: 'premium@example.com',
      isPremium: true,
      isActive: true,
      joinDate: '2024-02-10'
    },
    {
      id: '3',
      name: 'Inactive User',
      email: 'inactive@example.com',
      isPremium: false,
      isActive: false,
      joinDate: '2024-01-20'
    }
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const togglePremiumStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isPremium: !user.isPremium } : user
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Quản lý người dùng</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.isActive).length}</div>
              <div className="text-sm text-blue-600">Người dùng hoạt động</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{users.filter(u => u.isPremium).length}</div>
              <div className="text-sm text-yellow-600">Tài khoản Premium</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{users.filter(u => !u.isActive).length}</div>
              <div className="text-sm text-red-600">Tài khoản bị khóa</div>
            </div>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Loại tài khoản</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.isPremium ? "default" : "secondary"}>
                      {user.isPremium ? (
                        <div className="flex items-center space-x-1">
                          <Crown className="w-3 h-3" />
                          <span>Premium</span>
                        </div>
                      ) : (
                        'Thường'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? 'Hoạt động' : 'Bị khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePremiumStatus(user.id)}
                      >
                        {user.isPremium ? 'Hủy Premium' : 'Nâng Premium'}
                      </Button>
                      <Button
                        size="sm"
                        variant={user.isActive ? "destructive" : "default"}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? (
                          <><UserX className="w-4 h-4 mr-1" />Khóa</>
                        ) : (
                          <><UserCheck className="w-4 h-4 mr-1" />Mở khóa</>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
