import { useState, useMemo } from "react";
import { Plus, Search, Filter, AlertTriangle, Calendar, MapPin, Eye, Pencil, Trash2, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useToastContext } from "../../context/ToastContext";
import {
  AddInventoryItemModal,
  ViewInventoryDetailsModal,
  UseInventoryModal,
  FilterModal,
  ConfirmDialog,
} from "../../components/common";

type FoodItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  expiry: string;
  expiryStatus: string;
  image: string;
  category?: string;
};

const initialFoodItems: FoodItem[] = [
  { id: 1, name: "Sữa tươi Vinamilk", quantity: 2, unit: "hộp", location: "Tủ lạnh", expiry: "2 ngày", expiryStatus: "critical", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400", category: "Sữa" },
  { id: 2, name: "Thịt ba chỉ", quantity: 500, unit: "gram", location: "Ngăn đông", expiry: "3 ngày", expiryStatus: "warning", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400", category: "Thịt" },
  { id: 3, name: "Cà chua bi", quantity: 1, unit: "kg", location: "Tủ lạnh", expiry: "5 ngày", expiryStatus: "good", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400", category: "Rau củ" },
  { id: 4, name: "Trứng gà", quantity: 10, unit: "quả", location: "Tủ lạnh", expiry: "10 ngày", expiryStatus: "good", image: "https://images.unsplash.com/photo-1489761258370-c6da19f66da0?w=400", category: "Trứng" },
  { id: 5, name: "Gạo tám thơm", quantity: 5, unit: "kg", location: "Tủ bếp", expiry: "30 ngày", expiryStatus: "good", image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b4a2?w=400", category: "Gạo" },
  { id: 6, name: "Dưa leo", quantity: 3, unit: "củ", location: "Tủ lạnh", expiry: "7 ngày", expiryStatus: "good", image: "https://images.unsplash.com/photo-1566486169078-4f40ec9e57fc?w=400", category: "Rau củ" },
];

const expiryColors: Record<string, string> = {
  critical: "var(--danger)",
  warning: "var(--warning)",
  good: "var(--success)",
};

const expiryLabels: Record<string, string> = {
  critical: "Gấp",
  warning: "Sắp hết hạn",
  good: "Tốt",
};

export function Inventory() {
  const { success, error, info } = useToastContext();
  const [items, setItems] = useState<FoodItem[]>(initialFoodItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [viewItem, setViewItem] = useState<FoodItem | null>(null);
  const [useItem, setUseItem] = useState<FoodItem | null>(null);
  const [editItem, setEditItem] = useState<FoodItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<FoodItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" ||
        (activeTab === "fridge" && item.location === "Tủ lạnh") ||
        (activeTab === "freezer" && item.location === "Ngăn đông") ||
        (activeTab === "pantry" && item.location === "Tủ bếp");
      return matchesSearch && matchesTab;
    });
  }, [items, searchQuery, activeTab]);

  const handleAddItem = (data: any) => {
    const newItem: FoodItem = {
      id: Date.now(),
      name: data.name,
      quantity: parseFloat(data.quantity),
      unit: data.unit,
      location: data.location || "Tủ lạnh",
      expiry: "15 ngày",
      expiryStatus: "good",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      category: data.category,
    };
    setItems(prev => [...prev, newItem]);
    success("✅ Thêm thực phẩm thành công!", `"${newItem.name}" đã được thêm vào kho.`);
  };

  const handleUseItem = (data: any) => {
    if (!useItem) return;
    const amount = parseFloat(data.quantity || data.amount || 1);
    setItems(prev => prev.map(item => {
      if (item.id !== useItem.id) return item;
      const newQty = Math.max(0, item.quantity - amount);
      return { ...item, quantity: newQty };
    }));
    success("✅ Đã cập nhật kho!", `Đã dùng ${amount} ${useItem.unit} "${useItem.name}".`);
    setUseItem(null);
  };

  const handleDeleteItem = () => {
    if (!deleteItem) return;
    setItems(prev => prev.filter(i => i.id !== deleteItem.id));
    success(`🗑️ Đã xóa "${deleteItem.name}"`, "Thực phẩm đã được xóa khỏi kho.");
    setDeleteItem(null);
  };

  const handleAddToShoppingList = (item: FoodItem) => {
    info("🛒 Đã thêm vào danh sách mua!", `"${item.name}" đã được thêm vào danh sách mua sắm.`);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-dark)] mb-2">
            Kho thực phẩm
          </h1>
          <p className="text-[var(--text-muted)]">
            Quản lý và theo dõi thực phẩm trong nhà 🏪
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[var(--success)] to-[#16A34A] text-white font-semibold shadow-lg hover-lift rounded-[var(--radius-btn)] px-6 py-6 self-start md:self-auto"
          onClick={() => setShowAddItem(true)}
        >
          <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
          Thêm thực phẩm
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                placeholder="Tìm kiếm thực phẩm..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[var(--success)] focus-visible:border-[var(--success)]"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-[var(--radius-sm)] border-[var(--border-light)] hover:border-[var(--success)] hover:text-[var(--success)] transition-smooth"
              onClick={() => setShowFilter(true)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng thực phẩm", value: items.length, color: "var(--purple-deep)" },
          { label: "Sắp hết hạn", value: items.filter(i => i.expiryStatus !== "good").length, color: "var(--danger)" },
          { label: "Vị trí lưu trữ", value: [...new Set(items.map(i => i.location))].length, color: "var(--success)" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[var(--radius)] p-4 shadow-[var(--shadow-card)] text-center hover-lift transition-smooth">
            <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)] font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Location Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--card-bg)] p-1 rounded-[var(--radius-sm)]">
          <TabsTrigger value="all" className="rounded-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">
            Tất cả ({items.length})
          </TabsTrigger>
          <TabsTrigger value="fridge" className="rounded-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">
            Tủ lạnh 🧊
          </TabsTrigger>
          <TabsTrigger value="freezer" className="rounded-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">
            Ngăn đông ❄️
          </TabsTrigger>
          <TabsTrigger value="pantry" className="rounded-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">
            Tủ bếp 🍳
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-[var(--text-muted)]">
              <span className="text-5xl">🔍</span>
              <p className="font-medium mt-3">Không tìm thấy thực phẩm nào</p>
              <p className="text-sm mt-1">Thử tìm kiếm khác hoặc thêm thực phẩm mới</p>
              <Button className="mt-4 bg-gradient-to-r from-[var(--success)] to-[#16A34A] text-white rounded-[var(--radius-btn)]" onClick={() => setShowAddItem(true)}>
                <Plus className="w-4 h-4 mr-2" />Thêm thực phẩm
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="border-none shadow-[var(--shadow-card)] hover:shadow-xl transition-all rounded-[var(--radius)] overflow-hidden group"
                >
                  <div className="aspect-video relative overflow-hidden bg-[var(--card-bg)]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Expiry Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className="font-semibold border-none shadow-lg"
                        style={{
                          backgroundColor: expiryColors[item.expiryStatus] || 'var(--success)',
                          color: 'white'
                        }}
                      >
                        {item.expiryStatus === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {expiryLabels[item.expiryStatus]}
                      </Badge>
                    </div>
                    {/* Hover Actions */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setViewItem(item)}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth shadow-md"
                      >
                        <Eye className="w-4 h-4 text-[var(--purple-deep)]" />
                      </button>
                      <button
                        onClick={() => handleAddToShoppingList(item)}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth shadow-md"
                      >
                        <ArrowRight className="w-4 h-4 text-[var(--gold)]" />
                      </button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-[var(--text-dark)] mb-3 truncate">{item.name}</h3>
                    <div className="space-y-1.5 text-sm text-[var(--text-muted)] mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--text-dark)]">{item.quantity} {item.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className={item.expiryStatus === 'critical' ? 'text-[var(--danger)] font-semibold' : item.expiryStatus === 'warning' ? 'text-[var(--warning)] font-semibold' : ''}>
                          Còn {item.expiry}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-[var(--radius-sm)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-smooth"
                        onClick={() => setViewItem(item)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Chi tiết
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-[var(--radius-sm)] text-[var(--success)] border-[var(--success)] hover:bg-[var(--success)] hover:text-white transition-smooth"
                        onClick={() => setUseItem(item)}
                      >
                        Dùng
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 hover:text-[var(--danger)] hover:bg-[var(--danger-light)] rounded-[var(--radius-sm)]"
                        onClick={() => setDeleteItem(item)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddInventoryItemModal
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
        onSubmit={handleAddItem}
      />

      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters: any) => {
          info("🔍 Bộ lọc áp dụng", "Đã lọc danh sách thực phẩm theo tiêu chí.");
          setShowFilter(false);
        }}
        type="inventory"
      />

      {viewItem && (
      <ViewInventoryDetailsModal
          isOpen={!!viewItem}
          onClose={() => setViewItem(null)}
          item={viewItem}
          onEdit={(item) => {
            setViewItem(null);
            setEditItem(item);
          }}
          onUse={(item) => {
            setViewItem(null);
            setUseItem(item);
          }}
        />
      )}

      {useItem && (
        <UseInventoryModal
          isOpen={!!useItem}
          onClose={() => setUseItem(null)}
          onSubmit={handleUseItem}
          item={useItem}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteItem}
        title="Xóa thực phẩm?"
        message={`Bạn có chắc muốn xóa "${deleteItem?.name}" khỏi kho không?`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}