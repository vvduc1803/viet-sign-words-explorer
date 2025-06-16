
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

interface ContributionData {
  id: string;
  type: 'new' | 'edit';
  word: string;
  category: string;
  subcategory: string;
  description?: string;
  contributor: string;
  contributorEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  hasImage: boolean;
  hasVideo: boolean;
  hasSignVideo: boolean;
}

const ContributionApproval = () => {
  const [contributions, setContributions] = useState<ContributionData[]>([
    {
      id: '1',
      type: 'new',
      word: 'con vịt',
      category: 'Động vật',
      subcategory: 'Gia cầm',
      description: 'Loài chim nước được nuôi để lấy thịt và trứng',
      contributor: 'Test User',
      contributorEmail: 'test@example.com',
      submittedAt: '2024-06-15',
      status: 'pending',
      hasImage: true,
      hasVideo: false,
      hasSignVideo: true
    },
    {
      id: '2',
      type: 'edit',
      word: 'con gà',
      category: 'Động vật',
      subcategory: 'Gia cầm',
      description: 'Cập nhật mô tả: Loài chim nhà được nuôi để lấy thịt, trứng và lông',
      contributor: 'Premium User',
      contributorEmail: 'premium@example.com',
      submittedAt: '2024-06-14',
      status: 'pending',
      hasImage: false,
      hasVideo: true,
      hasSignVideo: false
    },
    {
      id: '3',
      type: 'new',
      word: 'con ngựa',
      category: 'Động vật',
      subcategory: 'Động vật hoang dã',
      description: 'Động vật có vú, được sử dụng để cưỡi và kéo xe',
      contributor: 'Test User',
      contributorEmail: 'test@example.com',
      submittedAt: '2024-06-13',
      status: 'approved',
      hasImage: true,
      hasVideo: true,
      hasSignVideo: true
    }
  ]);

  const [selectedContribution, setSelectedContribution] = useState<ContributionData | null>(null);

  const handleApprove = (contributionId: string) => {
    setContributions(prev => prev.map(c => 
      c.id === contributionId ? { ...c, status: 'approved' as const } : c
    ));
  };

  const handleReject = (contributionId: string) => {
    setContributions(prev => prev.map(c => 
      c.id === contributionId ? { ...c, status: 'rejected' as const } : c
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Chờ duyệt</Badge>;
      case 'approved':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Từ chối</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'new' ? 
      <Badge variant="outline">Từ mới</Badge> : 
      <Badge variant="outline">Chỉnh sửa</Badge>;
  };

  const pendingCount = contributions.filter(c => c.status === 'pending').length;
  const approvedCount = contributions.filter(c => c.status === 'approved').length;
  const rejectedCount = contributions.filter(c => c.status === 'rejected').length;

  if (selectedContribution) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Chi tiết đóng góp</span>
            </div>
            <Button variant="outline" onClick={() => setSelectedContribution(null)}>
              Quay lại
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại đóng góp</label>
                <div>{getTypeBadge(selectedContribution.type)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <div>{getStatusBadge(selectedContribution.status)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Từ vựng</label>
                <p className="text-lg font-semibold">{selectedContribution.word}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <p>{selectedContribution.category} → {selectedContribution.subcategory}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Người đóng góp</label>
                <p>{selectedContribution.contributor}</p>
                <p className="text-sm text-gray-600">{selectedContribution.contributorEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày gửi</label>
                <p>{selectedContribution.submittedAt}</p>
              </div>
            </div>

            {selectedContribution.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả/Định nghĩa</label>
                <p className="bg-gray-50 p-3 rounded-lg">{selectedContribution.description}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tài liệu đính kèm</label>
              <div className="flex space-x-2">
                {selectedContribution.hasImage && <Badge variant="secondary">Hình ảnh</Badge>}
                {selectedContribution.hasVideo && <Badge variant="secondary">Video minh họa</Badge>}
                {selectedContribution.hasSignVideo && <Badge variant="secondary">Video ký hiệu</Badge>}
                {!selectedContribution.hasImage && !selectedContribution.hasVideo && !selectedContribution.hasSignVideo && (
                  <span className="text-gray-500">Không có tài liệu đính kèm</span>
                )}
              </div>
            </div>

            {selectedContribution.status === 'pending' && (
              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  onClick={() => handleReject(selectedContribution.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </Button>
                <Button
                  onClick={() => handleApprove(selectedContribution.id)}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Phê duyệt
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Phê duyệt đóng góp</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-yellow-600">Chờ duyệt</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-green-600">Đã duyệt</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-sm text-red-600">Từ chối</div>
            </div>
          </div>

          {/* Contributions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại</TableHead>
                <TableHead>Từ vựng</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Người đóng góp</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell>{getTypeBadge(contribution.type)}</TableCell>
                  <TableCell className="font-medium">{contribution.word}</TableCell>
                  <TableCell>{contribution.category}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contribution.contributor}</div>
                      <div className="text-sm text-gray-600">{contribution.contributorEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contribution.submittedAt}</TableCell>
                  <TableCell>{getStatusBadge(contribution.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedContribution(contribution)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {contribution.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(contribution.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(contribution.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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

export default ContributionApproval;
