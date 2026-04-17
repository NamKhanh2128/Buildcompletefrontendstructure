import { useState } from "react";
import { FileText, Search, Filter, Clock, User, Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { PageHeader } from "../../../components/common/PageHeader";

const auditLogs = [
  {
    id: "1",
    user: "Nguyễn Văn A",
    action: "Đăng nhập",
    type: "auth",
    status: "success",
    description: "Đăng nhập thành công vào hệ thống",
    ip: "192.168.1.100",
    timestamp: "2026-04-16 10:30:45",
  },
  {
    id: "2",
    user: "Trần Thị B",
    action: "Cập nhật người dùng",
    type: "user",
    status: "success",
    description: "Cập nhật thông tin người dùng ID: 123",
    ip: "192.168.1.101",
    timestamp: "2026-04-16 10:25:12",
  },
  {
    id: "3",
    user: "Admin System",
    action: "Xóa dữ liệu",
    type: "data",
    status: "error",
    description: "Thất bại khi xóa dữ liệu: Permission denied",
    ip: "192.168.1.1",
    timestamp: "2026-04-16 10:20:33",
  },
  {
    id: "4",
    user: "Lê Văn C",
    action: "Tạo công thức",
    type: "recipe",
    status: "success",
    description: "Tạo công thức mới: Canh chua cá lóc",
    ip: "192.168.1.102",
    timestamp: "2026-04-16 10:15:08",
  },
  {
    id: "5",
    user: "Phạm Thị D",
    action: "Thay đổi cài đặt",
    type: "settings",
    status: "warning",
    description: "Thay đổi cấu hình hệ thống: Timeout = 3600s",
    ip: "192.168.1.103",
    timestamp: "2026-04-16 10:10:22",
  },
  {
    id: "6",
    user: "Hoàng Văn E",
    action: "Xuất báo cáo",
    type: "report",
    status: "success",
    description: "Xuất báo cáo doanh thu tháng 3",
    ip: "192.168.1.104",
    timestamp: "2026-04-16 10:05:54",
  },
];

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "all" || log.type === filterType;
    const matchStatus = filterStatus === "all" || log.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2.5} />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" strokeWidth={2.5} />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" strokeWidth={2.5} />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" strokeWidth={2.5} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-100 text-green-700 border-green-200",
      error: "bg-red-100 text-red-700 border-red-200",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    const labels = {
      success: "Thành công",
      error: "Lỗi",
      warning: "Cảnh báo",
    };
    return (
      <Badge className={`${variants[status as keyof typeof variants]} rounded-full px-3 py-1 font-semibold`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      auth: { class: "bg-purple-100 text-[var(--purple-deep)] border-purple-200", label: "Xác thực" },
      user: { class: "bg-blue-100 text-blue-700 border-blue-200", label: "Người dùng" },
      data: { class: "bg-orange-100 text-orange-700 border-orange-200", label: "Dữ liệu" },
      recipe: { class: "bg-green-100 text-green-700 border-green-200", label: "Công thức" },
      settings: { class: "bg-pink-100 text-pink-700 border-pink-200", label: "Cài đặt" },
      report: { class: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Báo cáo" },
    };
    const variant = variants[type as keyof typeof variants] || variants.data;
    return <Badge className={`${variant.class} rounded-full px-3 py-1 font-semibold text-xs`}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nhật ký hệ thống"
        description="Theo dõi tất cả hoạt động và thay đổi trong hệ thống"
        icon={FileText}
      />

      {/* Filters */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] animate-slide-up bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <Input
                placeholder="Tìm kiếm nhật ký..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[var(--purple-deep)] focus-visible:border-[var(--purple-deep)]"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 h-11 rounded-[var(--radius-sm)] border-[var(--border-light)]">
                <SelectValue placeholder="Loại hoạt động" />
              </SelectTrigger>
              <SelectContent className="rounded-[var(--radius-sm)]">
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="auth">Xác thực</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
                <SelectItem value="data">Dữ liệu</SelectItem>
                <SelectItem value="recipe">Công thức</SelectItem>
                <SelectItem value="settings">Cài đặt</SelectItem>
                <SelectItem value="report">Báo cáo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 h-11 rounded-[var(--radius-sm)] border-[var(--border-light)]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="rounded-[var(--radius-sm)]">
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="success">Thành công</SelectItem>
                <SelectItem value="error">Lỗi</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card
            key={log.id}
            className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--card-bg)] rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-sm">
                  {getStatusIcon(log.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-black text-[var(--text-dark)]">{log.action}</h3>
                        {getTypeBadge(log.type)}
                        {getStatusBadge(log.status)}
                      </div>
                      <p className="text-[var(--text-muted)] leading-relaxed mb-3">{log.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <User className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
                          <span className="font-semibold">{log.user}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Activity className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
                          <span className="font-semibold">{log.ip}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Clock className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
                          <span className="font-semibold">{log.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] bg-white">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-black text-[var(--text-dark)] mb-2">Không tìm thấy nhật ký</h3>
            <p className="text-[var(--text-muted)]">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
