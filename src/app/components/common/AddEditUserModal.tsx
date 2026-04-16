import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  status: string;
}

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserData) => void;
  user?: UserData | null;
  mode: "add" | "edit";
}

export function AddEditUserModal({
  isOpen,
  onClose,
  onSave,
  user,
  mode,
}: AddEditUserModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData(user);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "user",
        status: "active",
      });
    }
  }, [user, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Thêm người dùng mới" : "Chỉnh sửa người dùng"}
      size="lg"
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-[var(--radius-sm)] border-[var(--border-light)] hover:bg-[var(--card-bg)] font-semibold"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-purple text-white rounded-[var(--radius-sm)] shadow-[var(--shadow-btn)] hover-lift font-semibold"
          >
            {mode === "add" ? "Thêm mới" : "Lưu thay đổi"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[var(--text-dark)] font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
              Họ và tên *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              required
              className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:border-[var(--purple-deep)] focus-visible:ring-[var(--purple-deep)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[var(--text-dark)] font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              required
              className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:border-[var(--purple-deep)] focus-visible:ring-[var(--purple-deep)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[var(--text-dark)] font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
              Số điện thoại
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0123456789"
              className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:border-[var(--purple-deep)] focus-visible:ring-[var(--purple-deep)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-[var(--text-dark)] font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
              Vai trò *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus:border-[var(--purple-deep)] focus:ring-[var(--purple-deep)]">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent className="rounded-[var(--radius-sm)]">
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
                <SelectItem value="moderator">Người kiểm duyệt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-[var(--text-dark)] font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--purple-deep)]" strokeWidth={2.5} />
            Địa chỉ
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Nhập địa chỉ"
            className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:border-[var(--purple-deep)] focus-visible:ring-[var(--purple-deep)]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-[var(--text-dark)] font-semibold">
            Trạng thái *
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="h-11 rounded-[var(--radius-sm)] border-[var(--border-light)] focus:border-[var(--purple-deep)] focus:ring-[var(--purple-deep)]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent className="rounded-[var(--radius-sm)]">
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Tạm ngưng</SelectItem>
              <SelectItem value="banned">Bị cấm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </Modal>
  );
}
