import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, Users as UsersIcon, Mail, Phone, MapPin, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddEditUserModal } from "../../../components/common/AddEditUserModal";
import { ViewDetailsModal } from "../../../components/common/ViewDetailsModal";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";
import { toast } from "../../../components/common/Toast";

const initialUsers = [
  { id: "1", name: "Nguyễn Văn A", email: "vana@email.com", phone: "0123456789", address: "Hà Nội", role: "user", status: "active", groups: 2, avatar: "NA" },
  { id: "2", name: "Trần Thị B", email: "thib@email.com", phone: "0987654321", address: "Hồ Chí Minh", role: "admin", status: "active", groups: 1, avatar: "TB" },
  { id: "3", name: "Lê Văn C", email: "vanc@email.com", phone: "0369852147", address: "Đà Nẵng", role: "user", status: "inactive", groups: 3, avatar: "LC" },
  { id: "4", name: "Phạm Thị D", email: "thid@email.com", phone: "0147258369", address: "Cần Thơ", role: "moderator", status: "active", groups: 2, avatar: "PD" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode("add");
    setIsAddEditModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsAddEditModalOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUser = (userData: any) => {
    if (modalMode === "add") {
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        groups: 0,
        avatar: userData.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };
      setUsers([...users, newUser]);
      toast.success("Đã thêm người dùng mới thành công!");
    } else {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...userData } : u)));
      toast.success("Đã cập nhật thông tin người dùng!");
    }
    setIsAddEditModalOpen(false);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    toast.success("Đã xóa người dùng thành công!");
    setIsDeleteDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { class: "bg-green-100 text-green-700 border-green-200", label: "Hoạt động" },
      inactive: { class: "bg-gray-100 text-gray-700 border-gray-200", label: "Tạm ngưng" },
      banned: { class: "bg-red-100 text-red-700 border-red-200", label: "Bị cấm" },
    };
    const variant = variants[status as keyof typeof variants] || variants.active;
    return <Badge className={`${variant.class} rounded-full px-3 py-1 font-semibold`}>{variant.label}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { class: "bg-purple-100 text-[var(--purple-deep)] border-purple-200", label: "Quản trị viên" },
      moderator: { class: "bg-blue-100 text-blue-700 border-blue-200", label: "Kiểm duyệt viên" },
      user: { class: "bg-gray-100 text-gray-700 border-gray-200", label: "Người dùng" },
    };
    const variant = variants[role as keyof typeof variants] || variants.user;
    return <Badge className={`${variant.class} rounded-full px-3 py-1 font-semibold`}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý người dùng"
        description="Danh sách tất cả người dùng trong hệ thống"
        icon={UsersIcon}
        action={
          <Button
            onClick={handleAddUser}
            className="bg-gradient-purple text-white rounded-[var(--radius-sm)] shadow-[var(--shadow-btn)] hover-lift font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Thêm người dùng
          </Button>
        }
      />

      {/* Search & Filter */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] animate-slide-up bg-white">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <Input
                placeholder="Tìm kiếm theo tên, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[var(--purple-deep)] focus-visible:border-[var(--purple-deep)]"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-[10px] border-[var(--border-light)] text-[var(--text-dark)] hover:bg-[var(--card-bg)] hover:text-[var(--purple-deep)] h-11 w-11"
            >
              <Filter className="w-5 h-5" strokeWidth={2.5} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--border-light)] hover:bg-transparent">
                  <TableHead className="text-[var(--text-dark)] font-bold">Người dùng</TableHead>
                  <TableHead className="text-[var(--text-dark)] font-bold">Liên hệ</TableHead>
                  <TableHead className="text-[var(--text-dark)] font-bold">Vai trò</TableHead>
                  <TableHead className="text-[var(--text-dark)] font-bold">Nhóm</TableHead>
                  <TableHead className="text-[var(--text-dark)] font-bold">Trạng thái</TableHead>
                  <TableHead className="text-[var(--text-dark)] font-bold text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-[var(--border-light)] hover:bg-[var(--card-bg)] transition-smooth">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-[var(--purple-light)]">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-purple text-white font-bold text-sm">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-[var(--text-dark)]">{user.name}</p>
                          <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[var(--text-dark)] flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[var(--purple-deep)]" />
                          {user.phone}
                        </p>
                        <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                          {user.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <span className="font-bold text-[var(--purple-deep)]">{user.groups}</span>
                      <span className="text-sm text-[var(--text-muted)] ml-1">nhóm</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-[8px] hover:bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--purple-deep)]"
                          >
                            <MoreVertical className="w-4 h-4" strokeWidth={2.5} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[var(--radius-sm)] shadow-[var(--shadow-card)] border-[var(--border-light)] w-48">
                          <DropdownMenuItem
                            onClick={() => handleViewUser(user)}
                            className="cursor-pointer rounded-[8px] font-medium focus:bg-[var(--card-bg)] focus:text-[var(--purple-deep)]"
                          >
                            <Eye className="w-4 h-4 mr-2" strokeWidth={2.5} />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditUser(user)}
                            className="cursor-pointer rounded-[8px] font-medium focus:bg-[var(--card-bg)] focus:text-[var(--purple-deep)]"
                          >
                            <Edit className="w-4 h-4 mr-2" strokeWidth={2.5} />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user)}
                            className="cursor-pointer rounded-[8px] font-medium text-red-600 focus:bg-red-50 focus:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" strokeWidth={2.5} />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Modal */}
      <AddEditUserModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
        mode={modalMode}
      />

      {/* View User Details Modal */}
      {selectedUser && (
        <ViewDetailsModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Thông tin: ${selectedUser.name}`}
          details={[
            { label: "Họ và tên", value: selectedUser.name, icon: UsersIcon },
            { label: "Email", value: selectedUser.email, icon: Mail },
            { label: "Số điện thoại", value: selectedUser.phone, icon: Phone },
            { label: "Địa chỉ", value: selectedUser.address, icon: MapPin },
            {
              label: "Vai trò",
              value: selectedUser.role === "admin" ? "Quản trị viên" : selectedUser.role === "moderator" ? "Kiểm duyệt viên" : "Người dùng",
              icon: Shield,
              type: "badge",
              badgeVariant: selectedUser.role === "admin" ? "default" : "success",
            },
            {
              label: "Trạng thái",
              value: selectedUser.status === "active" ? "Đang hoạt động" : "Tạm ngưng",
              type: "badge",
              badgeVariant: selectedUser.status === "active" ? "success" : "warning",
            },
          ]}
          onEdit={() => {
            setIsViewModalOpen(false);
            handleEditUser(selectedUser);
          }}
          onDelete={() => {
            setIsViewModalOpen(false);
            handleDeleteUser(selectedUser);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa người dùng"
        description={`Bạn có chắc chắn muốn xóa người dùng "${selectedUser?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        variant="danger"
      />
    </div>
  );
}
