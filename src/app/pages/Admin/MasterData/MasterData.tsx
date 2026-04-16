import { useState } from "react";
import { Database, Plus, MoreVertical, Edit, Trash2, Eye, Package, Utensils, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddEditItemModal } from "../../../components/common/AddEditItemModal";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";
import { toast } from "../../../components/common/Toast";

const initialIngredients = [
  { id: "1", name: "Cà chua", category: "Rau củ", price: "15000", unit: "kg", description: "Cà chua tươi" },
  { id: "2", name: "Thịt heo", category: "Thịt", price: "120000", unit: "kg", description: "Thịt heo ba chỉ" },
  { id: "3", name: "Cá hồi", category: "Cá", price: "250000", unit: "kg", description: "Cá hồi Na Uy" },
];

const initialRecipes = [
  { id: "1", name: "Canh chua cá", category: "Món chính", price: "80000", unit: "phần", description: "Canh chua cá lóc miền Nam" },
  { id: "2", name: "Gà xào sả ớt", category: "Món chính", price: "120000", unit: "phần", description: "Gà xào sả ớt đậm đà" },
];

const initialCategories = [
  { id: "1", name: "Rau củ", type: "Nguyên liệu", count: 45 },
  { id: "2", name: "Thịt", type: "Nguyên liệu", count: 23 },
  { id: "3", name: "Món chính", type: "Công thức", count: 67 },
];

export default function MasterData() {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [activeTab, setActiveTab] = useState("ingredients");

  const handleAdd = (type: string) => {
    setSelectedItem(null);
    setModalMode("add");
    setActiveTab(type);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = (itemData: any) => {
    if (modalMode === "add") {
      const newItem = { ...itemData, id: Date.now().toString() };
      if (activeTab === "ingredients") {
        setIngredients([...ingredients, newItem]);
      } else {
        setRecipes([...recipes, newItem]);
      }
      toast.success("Đã thêm mới thành công!");
    } else {
      if (activeTab === "ingredients") {
        setIngredients(ingredients.map((i) => (i.id === selectedItem.id ? { ...i, ...itemData } : i)));
      } else {
        setRecipes(recipes.map((r) => (r.id === selectedItem.id ? { ...r, ...itemData } : r)));
      }
      toast.success("Đã cập nhật thành công!");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (activeTab === "ingredients") {
      setIngredients(ingredients.filter((i) => i.id !== selectedItem.id));
    } else {
      setRecipes(recipes.filter((r) => r.id !== selectedItem.id));
    }
    toast.success("Đã xóa thành công!");
    setIsDeleteDialogOpen(false);
  };

  const renderTable = (data: any[], type: string) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[var(--border-light)] hover:bg-transparent">
            <TableHead className="text-[var(--text-dark)] font-bold">Tên</TableHead>
            <TableHead className="text-[var(--text-dark)] font-bold">Danh mục</TableHead>
            <TableHead className="text-[var(--text-dark)] font-bold">Giá</TableHead>
            <TableHead className="text-[var(--text-dark)] font-bold">Đơn vị</TableHead>
            <TableHead className="text-[var(--text-dark)] font-bold">Mô tả</TableHead>
            <TableHead className="text-[var(--text-dark)] font-bold text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-[var(--border-light)] hover:bg-[var(--card-bg)] transition-smooth">
              <TableCell className="font-bold text-[var(--text-dark)]">{item.name}</TableCell>
              <TableCell>
                <Badge className="bg-purple-100 text-[var(--purple-deep)] border-purple-200 rounded-full px-3 py-1 font-semibold">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-[var(--gold)]">{parseInt(item.price).toLocaleString()} đ</TableCell>
              <TableCell className="text-[var(--text-muted)] font-medium">{item.unit}</TableCell>
              <TableCell className="text-[var(--text-muted)] max-w-xs truncate">{item.description}</TableCell>
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
                      onClick={() => handleEdit(item)}
                      className="cursor-pointer rounded-[8px] font-medium focus:bg-[var(--card-bg)] focus:text-[var(--purple-deep)]"
                    >
                      <Edit className="w-4 h-4 mr-2" strokeWidth={2.5} />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item)}
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
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dữ liệu gốc"
        description="Quản lý nguyên liệu, công thức và danh mục"
        icon={Database}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white border border-[var(--border-light)] shadow-sm rounded-[var(--radius-sm)] p-1.5">
            <TabsTrigger
              value="ingredients"
              className="rounded-[8px] data-[state=active]:bg-gradient-purple data-[state=active]:text-white data-[state=active]:shadow-md font-semibold"
            >
              <Package className="w-4 h-4 mr-2" strokeWidth={2.5} />
              Nguyên liệu
            </TabsTrigger>
            <TabsTrigger
              value="recipes"
              className="rounded-[8px] data-[state=active]:bg-gradient-purple data-[state=active]:text-white data-[state=active]:shadow-md font-semibold"
            >
              <Utensils className="w-4 h-4 mr-2" strokeWidth={2.5} />
              Công thức
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="rounded-[8px] data-[state=active]:bg-gradient-purple data-[state=active]:text-white data-[state=active]:shadow-md font-semibold"
            >
              <Tag className="w-4 h-4 mr-2" strokeWidth={2.5} />
              Danh mục
            </TabsTrigger>
          </TabsList>

          <Button
            onClick={() => handleAdd(activeTab)}
            className="bg-gradient-purple text-white rounded-[var(--radius-sm)] shadow-[var(--shadow-btn)] hover-lift font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Thêm mới
          </Button>
        </div>

        <TabsContent value="ingredients" className="space-y-6">
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-black text-[var(--text-dark)] mb-4">Danh sách nguyên liệu</h3>
              {renderTable(ingredients, "ingredients")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-black text-[var(--text-dark)] mb-4">Danh sách công thức</h3>
              {renderTable(recipes, "recipes")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {initialCategories.map((category) => (
              <Card
                key={category.id}
                className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-purple rounded-[14px] flex items-center justify-center shadow-md">
                      <Tag className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
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
                      <DropdownMenuContent align="end" className="rounded-[var(--radius-sm)]">
                        <DropdownMenuItem className="cursor-pointer rounded-[8px]">
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-[8px] text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-dark)] mb-2">{category.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">{category.type}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
                    <span className="text-sm font-semibold text-[var(--text-muted)]">Tổng số</span>
                    <span className="text-2xl font-black text-[var(--purple-deep)]">{category.count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Modal */}
      <AddEditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        item={selectedItem}
        mode={modalMode}
        title={
          modalMode === "add"
            ? activeTab === "ingredients"
              ? "Thêm nguyên liệu mới"
              : "Thêm công thức mới"
            : activeTab === "ingredients"
            ? "Chỉnh sửa nguyên liệu"
            : "Chỉnh sửa công thức"
        }
        type={activeTab === "ingredients" ? "ingredient" : "recipe"}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa "${selectedItem?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        variant="danger"
      />
    </div>
  );
}
