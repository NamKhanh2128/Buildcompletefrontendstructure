import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import Modal from "./Modal";

interface AddInventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const locationOptions = ["Tủ lạnh", "Ngăn đông", "Tủ bếp", "Kệ đồ"];
const categoryOptions = ["Thịt", "Rau củ", "Hải sản", "Trái cây", "Gia vị", "Đồ khô", "Sữa"];

export default function AddInventoryItemModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: AddInventoryItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    location: "Tủ lạnh",
    category: "Thịt",
    expiryDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      quantity: "",
      unit: "",
      location: "Tủ lạnh",
      category: "Thịt",
      expiryDate: "",
      notes: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] w-full max-w-md shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white p-6 rounded-t-[var(--radius-lg)] sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Thêm thực phẩm</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/90 text-sm mt-1">
            Thêm thực phẩm mới vào kho
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
              Tên thực phẩm
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Sữa tươi Vinamilk"
              className="rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[#22C55E] focus-visible:border-[#22C55E]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
                Số lượng
              </Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="VD: 2"
                className="rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[#22C55E] focus-visible:border-[#22C55E]"
                required
              />
            </div>

            <div>
              <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
                Đơn vị
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="rounded-[var(--radius-sm)] border-[var(--border-light)]">
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hộp">Hộp</SelectItem>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="gram">Gram</SelectItem>
                  <SelectItem value="quả">Quả</SelectItem>
                  <SelectItem value="củ">Củ</SelectItem>
                  <SelectItem value="bó">Bó</SelectItem>
                  <SelectItem value="gói">Gói</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
              Vị trí lưu trữ
            </Label>
            <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
              <SelectTrigger className="rounded-[var(--radius-sm)] border-[var(--border-light)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
              Danh mục
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="rounded-[var(--radius-sm)] border-[var(--border-light)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
              Ngày hết hạn
            </Label>
            <Input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[#22C55E] focus-visible:border-[#22C55E]"
              required
            />
          </div>

          <div>
            <Label className="text-[var(--text-dark)] font-semibold mb-2 block">
              Ghi chú (tùy chọn)
            </Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Thêm ghi chú về thực phẩm..."
              className="rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[#22C55E] focus-visible:border-[#22C55E] resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-[var(--radius-btn)] border-[var(--border-light)] hover:bg-[var(--card-bg)] font-semibold"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold rounded-[var(--radius-btn)] shadow-lg hover:shadow-xl transition-smooth"
            >
              Thêm thực phẩm
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
