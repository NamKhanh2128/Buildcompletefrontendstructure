import { X, ShoppingCart, Package, Utensils, ChefHat, FileText, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Modal from "./Modal";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

const quickActions = [
  {
    id: "add-shopping",
    icon: ShoppingCart,
    label: "Thêm danh sách mua sắm",
    description: "Tạo danh sách mua sắm mới",
    color: "from-[var(--gold)] to-[#D4941C]",
  },
  {
    id: "add-inventory",
    icon: Package,
    label: "Thêm thực phẩm vào kho",
    description: "Cập nhật kho thực phẩm",
    color: "from-[#22C55E] to-[#16A34A]",
  },
  {
    id: "add-meal",
    icon: Utensils,
    label: "Lên kế hoạch ăn uống",
    description: "Thêm kế hoạch bữa ăn",
    color: "from-[var(--purple)] to-[var(--purple-dark)]",
  },
  {
    id: "add-recipe",
    icon: ChefHat,
    label: "Tạo công thức nấu ăn",
    description: "Lưu công thức mới",
    color: "from-[#F97316] to-[#EA580C]",
  },
  {
    id: "view-reports",
    icon: FileText,
    label: "Xem báo cáo",
    description: "Thống kê chi tiêu",
    color: "from-[#3B82F6] to-[#2563EB]",
  },
  {
    id: "invite-member",
    icon: Users,
    label: "Mời thành viên",
    description: "Thêm người vào gia đình",
    color: "from-[#EC4899] to-[#DB2777]",
  },
];

export default function QuickActionModal({ 
  isOpen, 
  onClose, 
  onAction 
}: QuickActionModalProps) {
  const handleAction = (actionId: string) => {
    onAction(actionId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] w-full max-w-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-purple text-white p-6 rounded-t-[var(--radius-lg)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-black">Hành động nhanh</h2>
                <p className="text-white/90 text-sm mt-1">
                  Chọn hành động bạn muốn thực hiện
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="group relative p-6 text-left rounded-[var(--radius-sm)] border border-[var(--border-light)] hover:border-transparent hover:shadow-xl transition-smooth bg-white overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-smooth`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-[var(--radius-sm)] bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:bg-white/20 transition-smooth`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--text-dark)] group-hover:text-white transition-smooth mb-1">
                          {action.label}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] group-hover:text-white/90 transition-smooth">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-[var(--radius-btn)] border-[var(--border-light)] hover:bg-[var(--card-bg)] font-semibold"
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
