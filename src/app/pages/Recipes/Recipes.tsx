import { useState, useMemo } from "react";
import { Plus, Search, Clock, Users, Star, Filter, Eye, ChefHat } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useToastContext } from "../../context/ToastContext";
import { AddRecipeModal, ViewRecipeModal, FilterModal } from "../../components/common";

type Recipe = {
  id: number;
  name: string;
  time: string;
  servings: number;
  image: string;
  difficulty: string;
  category: string;
  rating: number;
  description?: string;
  ingredients?: string[];
  steps?: string[];
};

const initialRecipes: Recipe[] = [
  {
    id: 1, name: "Phở bò Hà Nội", time: "45 phút", servings: 4,
    image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400",
    difficulty: "Trung bình", category: "Món nước", rating: 4.8,
    description: "Phở bò truyền thống Hà Nội với nước dùng thơm ngon.",
    ingredients: ["Xương bò 1kg", "Bánh phở 400g", "Thịt bò 300g", "Hành tây", "Gừng", "Gia vị"],
    steps: ["Ninh xương bò 4-6 tiếng", "Chuẩn bị topping", "Trần bánh phở", "Bày ra tô và chan nước dùng"]
  },
  {
    id: 2, name: "Cơm gà Hải Nam", time: "60 phút", servings: 4,
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400",
    difficulty: "Dễ", category: "Cơm", rating: 4.6,
    description: "Cơm gà mềm mại thơm ngon theo phong cách Hải Nam.",
    ingredients: ["Gà nguyên con 1.5kg", "Gạo 2 chén", "Nước luộc gà", "Gừng", "Hành lá"],
    steps: ["Luộc gà với gừng", "Nấu cơm bằng nước gà", "Xé thịt gà", "Trình bày và thưởng thức"]
  },
  {
    id: 3, name: "Bún chả Hà Nội", time: "30 phút", servings: 4,
    image: "https://images.unsplash.com/photo-1583819689892-b50b4b3c69d5?w=400",
    difficulty: "Dễ", category: "Món nước", rating: 4.7,
    description: "Bún chả đặc sản Hà Nội với thịt nướng thơm phức.",
    ingredients: ["Thịt ba chỉ 500g", "Bún tươi 400g", "Nước mắm", "Đường", "Tỏi ớt"],
    steps: ["Ướp thịt 30 phút", "Nướng thịt vàng đều", "Pha nước chấm", "Bày ra đĩa"]
  },
  {
    id: 4, name: "Lẩu thái", time: "40 phút", servings: 6,
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400",
    difficulty: "Trung bình", category: "Lẩu", rating: 4.5,
    description: "Lẩu thái chua cay đặc trưng với hải sản tươi ngon.",
    ingredients: ["Tôm sú 500g", "Mực 300g", "Sả", "Ớt", "Lá chanh", "Nước cốt dừa"],
    steps: ["Nấu nước lẩu", "Chuẩn bị rau ăn kèm", "Thêm hải sản", "Nêm nếm vừa miệng"]
  },
  {
    id: 5, name: "Cơm tấm sườn", time: "50 phút", servings: 4,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
    difficulty: "Khó", category: "Cơm", rating: 4.9,
    description: "Cơm tấm Sài Gòn với sườn nướng thơm ngon.",
    ingredients: ["Sườn non 600g", "Gạo tấm 2 chén", "Chả trứng", "Bì heo", "Đồ chua"],
    steps: ["Ướp sườn qua đêm", "Nướng sườn vàng", "Nấu cơm tấm", "Bày ra đĩa đẹp mắt"]
  },
  {
    id: 6, name: "Gỏi cuốn tôm thịt", time: "25 phút", servings: 4,
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400",
    difficulty: "Dễ", category: "Cuốn", rating: 4.4,
    description: "Gỏi cuốn tươi ngon với tôm và thịt heo.",
    ingredients: ["Tôm 300g", "Thịt heo 200g", "Bánh tráng", "Rau sống", "Nước chấm"],
    steps: ["Luộc tôm và thịt", "Chuẩn bị rau", "Cuốn bánh tráng", "Pha nước chấm tương hoisin"]
  },
];

const difficultyColors: Record<string, string> = {
  "Dễ": "var(--success)",
  "Trung bình": "var(--warning)",
  "Khó": "var(--danger)",
};

export function Recipes() {
  const { success, info } = useToastContext();
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);

  const categories = ["Tất cả", ...Array.from(new Set(recipes.map(r => r.category)))];

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Tất cả" || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const handleAddRecipe = (data: any) => {
    const newRecipe: Recipe = {
      id: Date.now(),
      name: data.name || "Công thức mới",
      time: `${data.cookingTime || 30} phút`,
      servings: parseInt(data.servings || 4),
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      difficulty: data.difficulty || "Dễ",
      category: data.category || "Khác",
      rating: 4.0,
      description: data.description || "Công thức ngon cho cả gia đình.",
      ingredients: [],
      steps: [],
    };
    setRecipes(prev => [newRecipe, ...prev]);
    success("✅ Thêm công thức thành công!", `"${newRecipe.name}" đã được lưu vào bộ sưu tập.`);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-dark)] mb-2">Món ăn</h1>
          <p className="text-[var(--text-muted)]">
            Khám phá và lưu công thức nấu ăn yêu thích 👨‍🍳 — {recipes.length} công thức
          </p>
        </div>
        <Button
          className="bg-gradient-gold text-white font-semibold shadow-[var(--shadow-btn)] hover-lift rounded-[var(--radius-btn)] px-6 py-6 self-start md:self-auto"
          onClick={() => setShowAddRecipe(true)}
        >
          <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
          Thêm công thức
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
        <CardContent className="p-4">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                placeholder="Tìm kiếm món ăn, danh mục..."
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
          </div>
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-smooth ${selectedCategory === cat
                    ? 'bg-gradient-gold text-white shadow-[var(--shadow-btn)]'
                    : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-dark)] hover:shadow-sm'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 mx-auto text-[var(--text-muted)] opacity-30 mb-4" />
          <p className="font-semibold text-[var(--text-muted)]">Không tìm thấy công thức</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Thử từ khóa khác hoặc thêm công thức mới</p>
          <Button className="mt-4 bg-gradient-gold text-white rounded-[var(--radius-btn)]" onClick={() => setShowAddRecipe(true)}>
            <Plus className="w-4 h-4 mr-2" />Thêm công thức mới
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="border-none shadow-[var(--shadow-card)] hover:shadow-xl transition-all rounded-[var(--radius)] overflow-hidden group cursor-pointer"
              onClick={() => setViewRecipe(recipe)}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <Badge
                    className="font-semibold border-none shadow-lg text-white"
                    style={{ backgroundColor: difficultyColors[recipe.difficulty] || 'var(--success)' }}
                  >
                    {recipe.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-[var(--text-dark)] border-none shadow-sm font-semibold">
                    {recipe.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4 text-[var(--purple-deep)]" />
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-[var(--text-dark)] mb-2 truncate">{recipe.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{recipe.servings} người</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-3.5 h-3.5 text-[var(--gold)] fill-[var(--gold)]" />
                    <span className="font-semibold text-[var(--gold)]">{recipe.rating}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-purple text-white rounded-[var(--radius-sm)] hover-lift font-semibold"
                  onClick={e => {
                    e.stopPropagation();
                    setViewRecipe(recipe);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      <AddRecipeModal
        isOpen={showAddRecipe}
        onClose={() => setShowAddRecipe(false)}
        onSubmit={handleAddRecipe}
      />

      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters: any) => {
          info("🔍 Bộ lọc áp dụng", "Đã lọc danh sách công thức.");
          setShowFilter(false);
        }}
        type="recipe"
      />

      {viewRecipe && (
        <ViewRecipeModal
          isOpen={!!viewRecipe}
          onClose={() => setViewRecipe(null)}
          recipe={viewRecipe}
        />
      )}
    </div>
  );
}
