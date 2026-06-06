import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Check,
  X,
  Calendar,
  ShoppingCart,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Share2,
  Download,
  Eye,
  Pencil
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useToastContext } from "../../context/ToastContext";
import {
  AddShoppingListModal,
  AddShoppingItemModal,
  EditShoppingItemModal,
  ViewShoppingItemModal,
  ShareShoppingListModal,
  FilterModal,
  ConfirmDialog,
} from "../../components/common";

type ShoppingItem = {
  id: number;
  name: string;
  quantity: string;
  price: string;
  assignee: string;
  emoji: string;
  done: boolean;
  category: string;
};

type ShoppingList = {
  id: number;
  name: string;
  date: string;
  status: string;
  emoji: string;
  items: ShoppingItem[];
};

const initialLists: ShoppingList[] = [
  {
    id: 1,
    name: "Danh sách tuần này",
    date: "14/04/2026",
    status: "active",
    emoji: "🛒",
    items: [
      { id: 1, name: "Thịt bò Úc cao cấp", quantity: "500g", price: "225,000₫", assignee: "Mẹ", emoji: "🥩", done: true, category: "Thịt" },
      { id: 2, name: "Cà chua bi hữu cơ", quantity: "1kg", price: "45,000₫", assignee: "Bố", emoji: "🍅", done: true, category: "Rau củ" },
      { id: 3, name: "Sữa tươi Vinamilk", quantity: "2 hộp", price: "52,000₫", assignee: "Con", emoji: "🥛", done: false, category: "Sữa" },
      { id: 4, name: "Trứng gà ta", quantity: "1 vỉ", price: "38,000₫", assignee: "Mẹ", emoji: "🥚", done: false, category: "Trứng" },
      { id: 5, name: "Cải xanh tươi", quantity: "2 bó", price: "25,000₫", assignee: "Bố", emoji: "🥬", done: false, category: "Rau củ" },
    ],
  },
  {
    id: 2,
    name: "Mua sắm cuối tuần",
    date: "13/04/2026",
    status: "completed",
    emoji: "✅",
    items: [
      { id: 6, name: "Rau muống", quantity: "1 bó", price: "15,000₫", assignee: "Mẹ", emoji: "🥬", done: true, category: "Rau củ" },
      { id: 7, name: "Thịt heo nạc", quantity: "1kg", price: "140,000₫", assignee: "Bố", emoji: "🥓", done: true, category: "Thịt" },
      { id: 8, name: "Gạo ST25", quantity: "5kg", price: "185,000₫", assignee: "Con", emoji: "🌾", done: true, category: "Gạo" },
    ],
  },
  {
    id: 3,
    name: "Tiệc cuối tuần",
    date: "20/04/2026",
    status: "pending",
    emoji: "🎉",
    items: [
      { id: 9, name: "Tôm sú", quantity: "1kg", price: "320,000₫", assignee: "Mẹ", emoji: "🦐", done: false, category: "Hải sản" },
      { id: 10, name: "Rượu vang", quantity: "2 chai", price: "450,000₫", assignee: "Bố", emoji: "🍷", done: false, category: "Đồ uống" },
    ],
  },
];

export function ShoppingList() {
  const { success, error, info } = useToastContext();
  const [lists, setLists] = useState<ShoppingList[]>(initialLists);
  const [selectedListId, setSelectedListId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showAddList, setShowAddList] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [editItem, setEditItem] = useState<ShoppingItem | null>(null);
  const [viewItem, setViewItem] = useState<ShoppingItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<ShoppingItem | null>(null);
  const [deleteList, setDeleteList] = useState<boolean>(false);

  const selectedList = lists.find(l => l.id === selectedListId)!;

  const filteredItems = useMemo(() => {
    if (!selectedList) return [];
    return selectedList.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedList, searchQuery]);

  const completedItems = filteredItems.filter(item => item.done).length;
  const totalItems = filteredItems.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const totalCost = selectedList?.items.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + price;
  }, 0) || 0;

  const completedCost = selectedList?.items
    .filter(item => item.done)
    .reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return sum + price;
    }, 0) || 0;

  const toggleItem = (itemId: number) => {
    setLists(prev => prev.map(list => {
      if (list.id !== selectedListId) return list;
      return {
        ...list,
        items: list.items.map(item => {
          if (item.id !== itemId) return item;
          const newDone = !item.done;
          if (newDone) success(`✅ Đã mua "${item.name}"`, "Món đã được đánh dấu hoàn thành");
          else info(`↩️ Bỏ đánh dấu "${item.name}"`, "Đã chuyển về chưa mua");
          return { ...item, done: newDone };
        }),
      };
    }));
  };

  const handleDeleteItem = () => {
    if (!deleteItem) return;
    setLists(prev => prev.map(list => {
      if (list.id !== selectedListId) return list;
      return { ...list, items: list.items.filter(item => item.id !== deleteItem.id) };
    }));
    success(`🗑️ Đã xóa "${deleteItem.name}"`, "Món đã được xóa khỏi danh sách");
    setDeleteItem(null);
  };

  const handleAddList = (data: any) => {
    const newList: ShoppingList = {
      id: Date.now(),
      name: data.name || "Danh sách mới",
      date: new Date().toLocaleDateString('vi-VN'),
      status: "active",
      emoji: "🛒",
      items: [],
    };
    setLists(prev => [...prev, newList]);
    setSelectedListId(newList.id);
    success("✅ Tạo danh sách thành công!", `"${newList.name}" đã được tạo.`);
  };

  const handleAddItem = (data: any) => {
    const newItem: ShoppingItem = {
      id: Date.now(),
      name: data.name,
      quantity: `${data.quantity} ${data.unit}`,
      price: `${parseInt(data.price || 0).toLocaleString()}₫`,
      assignee: data.assignee || "Tôi",
      emoji: "🛍️",
      done: false,
      category: data.category || "Khác",
    };
    setLists(prev => prev.map(list => {
      if (list.id !== selectedListId) return list;
      return { ...list, items: [...list.items, newItem] };
    }));
    success("✅ Thêm món thành công!", `"${newItem.name}" đã được thêm vào danh sách.`);
    setShowAddItem(false);
  };

  const handleEditItem = (data: any) => {
    setLists(prev => prev.map(list => {
      if (list.id !== selectedListId) return list;
      return {
        ...list,
        items: list.items.map(item => {
          if (item.id !== editItem?.id) return item;
          return { ...item, name: data.name, quantity: `${data.quantity} ${data.unit}`, price: `${parseInt(data.price || 0).toLocaleString()}₫`, category: data.category };
        }),
      };
    }));
    success("✅ Cập nhật thành công!", `Thông tin món đã được cập nhật.`);
    setEditItem(null);
  };

  const handleDeleteList = () => {
    const listName = selectedList?.name;
    setLists(prev => {
      const newLists = prev.filter(l => l.id !== selectedListId);
      if (newLists.length > 0) setSelectedListId(newLists[0].id);
      return newLists;
    });
    success("🗑️ Đã xóa danh sách!", `"${listName}" đã được xóa.`);
    setDeleteList(false);
  };

  const handleShare = (data: any) => {
    success("📤 Chia sẻ thành công!", `Đã chia sẻ danh sách tới ${data.email || "thành viên"}.`);
  };

  const handleExportPDF = () => {
    info("📄 Xuất PDF", "Đang tạo file PDF cho danh sách mua sắm...");
    setTimeout(() => success("✅ Xuất PDF thành công!", "File đã được tải xuống."), 1500);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-dark)] mb-2">
            Danh sách mua sắm
          </h1>
          <p className="text-[var(--text-muted)]">
            Quản lý và phân công nhiệm vụ mua sắm cho cả gia đình 🛒
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            variant="outline"
            className="border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white rounded-[var(--radius-btn)] font-semibold transition-smooth"
            onClick={() => setShowShare(true)}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Chia sẻ
          </Button>
          <Button
            className="
              bg-gradient-gold text-white font-semibold px-6 py-6
              rounded-[var(--radius-btn)] shadow-[var(--shadow-btn)]
              hover-lift transition-smooth
            "
            onClick={() => setShowAddList(true)}
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Tạo danh sách
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lists Sidebar */}
        <div className="space-y-4">
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[var(--text-dark)] flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[var(--gold)]" />
                Danh sách của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lists.map((list) => {
                const listCompleted = list.items.filter(i => i.done).length;
                const listTotal = list.items.length;
                const listProgress = listTotal > 0 ? (listCompleted / listTotal) * 100 : 0;

                return (
                  <button
                    key={list.id}
                    onClick={() => {
                      setSelectedListId(list.id);
                      setSearchQuery("");
                    }}
                    className={`
                      w-full text-left p-4 rounded-[var(--radius-sm)] transition-smooth
                      ${selectedListId === list.id
                        ? 'bg-gradient-gold text-white shadow-[var(--shadow-btn)]'
                        : 'bg-[var(--card-bg)] hover:bg-white hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xl">{list.emoji}</span>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm mb-0.5 ${selectedListId === list.id ? 'text-white' : 'text-[var(--text-dark)]'}`}>
                            {list.name}
                          </p>
                          <p className={`text-xs flex items-center gap-1 ${selectedListId === list.id ? 'text-white/90' : 'text-[var(--text-muted)]'}`}>
                            <Calendar size={12} />
                            {list.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`
                          border-none font-semibold shrink-0
                          ${list.status === 'active'
                            ? selectedListId === list.id
                              ? 'bg-white/20 text-white'
                              : 'bg-[var(--success-light)] text-[var(--success)]'
                            : list.status === 'completed'
                              ? selectedListId === list.id
                                ? 'bg-white/20 text-white'
                                : 'bg-[var(--info-light)] text-[var(--info)]'
                              : selectedListId === list.id
                                ? 'bg-white/20 text-white'
                                : 'bg-[var(--warning-light)] text-[var(--warning)]'
                          }
                        `}
                      >
                        {list.status === 'active' ? 'Đang mua' : list.status === 'completed' ? 'Hoàn thành' : 'Sắp tới'}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className={selectedListId === list.id ? 'text-white/90' : 'text-[var(--text-muted)]'}>
                          {listCompleted}/{listTotal} món
                        </span>
                        <span className={`font-semibold ${selectedListId === list.id ? 'text-white' : 'text-[var(--text-dark)]'}`}>
                          {Math.round(listProgress)}%
                        </span>
                      </div>
                      <Progress
                        value={listProgress}
                        className={`h-1.5 ${selectedListId === list.id ? 'bg-white/20' : ''}`}
                      />
                    </div>
                  </button>
                );
              })}

              <Button
                variant="outline"
                className="w-full border-dashed border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white rounded-[var(--radius-sm)] font-semibold transition-smooth mt-2"
                onClick={() => setShowAddList(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo danh sách mới
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] bg-gradient-purple text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-white/80 text-xs font-medium mb-1 uppercase tracking-wide">
                  Tổng chi tiêu
                </p>
                <p className="text-3xl font-black">
                  {totalCost.toLocaleString()}₫
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Đã mua:</span>
                  <span className="font-semibold">{completedCost.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Còn lại:</span>
                  <span className="font-semibold">{(totalCost - completedCost).toLocaleString()}₫</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Actions */}
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <Input
                    placeholder="Tìm kiếm món..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-[var(--radius-sm)] border-[var(--border-light)] focus-visible:ring-[var(--gold)] focus-visible:border-[var(--gold)]"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-[var(--radius-sm)] border-[var(--border-light)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-smooth"
                  onClick={() => setShowFilter(true)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-[var(--radius-sm)] border-[var(--border-light)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-smooth"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Xuất PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowShare(true)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Chia sẻ
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[var(--danger)]" onClick={() => setDeleteList(true)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa danh sách
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] overflow-hidden bg-gradient-gold">
            <CardContent className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black mb-1">
                    {selectedList?.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {completedItems} / {totalItems} món đã hoàn thành
                    {searchQuery && <span className="ml-2">(lọc theo "{searchQuery}")</span>}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black">{Math.round(progress)}%</div>
                  <p className="text-xs text-white/90">Tiến độ</p>
                </div>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Shopping Items */}
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-black text-[var(--text-dark)]">
                  Danh sách mua ({totalItems})
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                  {completedItems} hoàn thành
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)]">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Không tìm thấy món nào</p>
                  <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      flex items-center gap-4 p-4 rounded-[var(--radius-sm)] transition-smooth
                      ${item.done
                        ? 'bg-[var(--card-bg)] opacity-70'
                        : 'bg-white border border-[var(--border-light)] hover:border-[var(--gold)] hover:shadow-md'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`
                        flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-smooth
                        ${item.done
                          ? 'bg-[var(--success)] border-[var(--success)] shadow-md'
                          : 'border-[var(--border-purple)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/5'
                        }
                      `}
                    >
                      {item.done && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </button>

                    <span className="text-2xl">{item.emoji}</span>

                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm mb-0.5 ${item.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-dark)]'}`}>
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span>{item.quantity}</span>
                        <span>•</span>
                        <span className="font-semibold text-[var(--gold)]">{item.price}</span>
                        <span>•</span>
                        <Badge className="bg-[var(--card-bg)] text-[var(--text-muted)] border-none text-[10px] px-1.5 py-0 font-medium">
                          {item.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-gradient-purple text-white text-xs font-bold">
                          {item.assignee.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-[var(--text-muted)] hidden sm:inline font-medium">
                        {item.assignee}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[var(--text-muted)] hover:text-[var(--info)] hover:bg-[var(--info-light)] transition-smooth rounded-[10px] w-8 h-8"
                        onClick={() => setViewItem(item)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[var(--text-muted)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-smooth rounded-[10px] w-8 h-8"
                        onClick={() => setEditItem(item)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger-light)] transition-smooth rounded-[10px] w-8 h-8"
                        onClick={() => setDeleteItem(item)}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}

              <Button
                variant="outline"
                className="w-full rounded-[var(--radius-sm)] border-dashed border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white font-semibold transition-smooth mt-2"
                onClick={() => setShowAddItem(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm món mới
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ---- Modals ---- */}
      <AddShoppingListModal
        isOpen={showAddList}
        onClose={() => setShowAddList(false)}
        onSubmit={handleAddList}
      />

      <AddShoppingItemModal
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
        onSave={handleAddItem}
        mode="add"
      />

      {editItem && (
        <EditShoppingItemModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onSubmit={handleEditItem}
          item={editItem}
        />
      )}

      {viewItem && (
        <ViewShoppingItemModal
          isOpen={!!viewItem}
          onClose={() => setViewItem(null)}
          item={viewItem}
        />
      )}

      <ShareShoppingListModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        listName={selectedList?.name}
      />

      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters: any) => {
          info("🔍 Bộ lọc đã áp dụng", `Đã lọc theo: ${Object.values(filters).filter(Boolean).join(", ") || "Tất cả"}`);
          setShowFilter(false);
        }}
      />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteItem}
        title="Xóa món này?"
        message={`Bạn có chắc muốn xóa "${deleteItem?.name}" khỏi danh sách không?`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      <ConfirmDialog
        isOpen={deleteList}
        onClose={() => setDeleteList(false)}
        onConfirm={handleDeleteList}
        title="Xóa danh sách?"
        message={`Bạn có chắc muốn xóa danh sách "${selectedList?.name}" không? Tất cả món trong danh sách cũng sẽ bị xóa.`}
        confirmText="Xóa danh sách"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}