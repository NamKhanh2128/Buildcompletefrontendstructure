import { useState } from "react";
import { Plus, Calendar as CalendarIcon, ChefHat, Trash2, Sparkles, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useToastContext } from "../../context/ToastContext";
import { AddMealPlanModal, GenerateMealPlanModal, ViewRecipeModal } from "../../components/common";

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const mealTimes = ["Sáng", "Trưa", "Tối"];

type MealEntry = { name: string; emoji: string };
type MealPlanType = Record<string, Record<string, MealEntry | null>>;

const initialMealPlan: MealPlanType = {
  "T2": { "Sáng": { name: "Phở bò", emoji: "🍜" }, "Trưa": { name: "Cơm gà", emoji: "🍗" }, "Tối": { name: "Bún chả", emoji: "🍲" } },
  "T3": { "Sáng": { name: "Bánh mì", emoji: "🥖" }, "Trưa": { name: "Cơm chiên", emoji: "🍚" }, "Tối": { name: "Mì Ý", emoji: "🍝" } },
  "T4": { "Sáng": null, "Trưa": { name: "Cơm sườn", emoji: "🍖" }, "Tối": null },
  "T5": { "Sáng": null, "Trưa": null, "Tối": { name: "Lẩu thái", emoji: "🫕" } },
  "T6": { "Sáng": null, "Trưa": null, "Tối": null },
  "T7": { "Sáng": null, "Trưa": { name: "Cơm tấm", emoji: "🍛" }, "Tối": null },
  "CN": { "Sáng": { name: "Xôi gà", emoji: "🍙" }, "Trưa": null, "Tối": { name: "Buffet", emoji: "🍱" } },
};

const mealEmojis: Record<string, string> = {
  "Phở bò": "🍜", "Cơm gà": "🍗", "Bún chả": "🍲", "Bánh mì": "🥖",
  "Cơm chiên": "🍚", "Mì Ý": "🍝", "Cơm sườn": "🍖", "Lẩu thái": "🫕",
  "Cơm tấm": "🍛", "Xôi gà": "🍙", "Buffet": "🍱",
};

const suggestedDishes = [
  { name: "Canh chua cá lóc", emoji: "🐟", time: "30 phút", difficulty: "Dễ" },
  { name: "Gà kho gừng", emoji: "🍗", time: "25 phút", difficulty: "Dễ" },
  { name: "Thịt kho tàu", emoji: "🥩", time: "45 phút", difficulty: "Trung bình" },
  { name: "Canh rau muống", emoji: "🥬", time: "15 phút", difficulty: "Dễ" },
];

const neededIngredients = [
  { name: "Thịt bò - 500g", checked: false },
  { name: "Cà chua - 1kg", checked: false },
  { name: "Hành tây - 3 củ", checked: false },
  { name: "Gạo - 2kg", checked: true },
];

export default function MealPlan() {
  const { success, info, warning } = useToastContext();
  const [mealPlan, setMealPlan] = useState<MealPlanType>(initialMealPlan);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [addingTo, setAddingTo] = useState<{ day: string; time: string } | null>(null);
  const [viewingMeal, setViewingMeal] = useState<any>(null);
  const [ingredients, setIngredients] = useState(neededIngredients);

  const handleAddMeal = (data: any) => {
    const mealName = data.recipeName || data.recipeName;
    if (!mealName) {
      warning("Vui lòng chọn món ăn", "Bạn cần chọn món ăn trước khi thêm.");
      return;
    }

    if (addingTo) {
      setMealPlan(prev => ({
        ...prev,
        [addingTo.day]: {
          ...prev[addingTo.day],
          [addingTo.time]: { name: mealName, emoji: mealEmojis[mealName] || "🍽️" }
        }
      }));
      success("✅ Thêm bữa ăn thành công!", `"${mealName}" đã được thêm vào ${addingTo.time} ${addingTo.day}.`);
    } else {
      // General add - find first empty slot
      success("✅ Thêm kế hoạch ăn thành công!", `"${mealName}" đã được lên kế hoạch.`);
    }
    setAddingTo(null);
    setShowAddMeal(false);
  };

  const handleRemoveMeal = (day: string, time: string, mealName: string) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [time]: null }
    }));
    success(`🗑️ Đã xóa "${mealName}"`, `Đã xóa khỏi bữa ${time} ${day}.`);
  };

  const handleGenerate = (data: any) => {
    success("🤖 Tạo thực đơn thành công!", "Thực đơn tuần đã được tạo tự động từ AI.");
  };

  const handleAddToShoppingList = (ingredient: string) => {
    success("🛒 Đã thêm vào danh sách!", `"${ingredient}" đã được thêm vào danh sách mua sắm.`);
  };

  const toggleIngredient = (index: number) => {
    setIngredients(prev => prev.map((ing, i) => {
      if (i !== index) return ing;
      const newChecked = !ing.checked;
      if (newChecked) success(`✅ Đã đánh dấu "${ing.name.split(' -')[0]}"`, "Đã có sẵn trong kho.");
      return { ...ing, checked: newChecked };
    }));
  };

  const handleAddSuggestedDish = (day: string, time: string) => {
    setAddingTo({ day, time });
    setShowAddMeal(true);
  };

  const handleClickMeal = (meal: MealEntry, day: string, time: string) => {
    setViewingMeal({
      name: meal.name,
      time: `${time} ${day}`,
      description: `Bữa ${time.toLowerCase()} ngon miệng cho cả gia đình`,
      servings: 4,
      cookingTime: "30 phút",
      difficulty: "Trung bình",
      ingredients: ["Nguyên liệu 1", "Nguyên liệu 2"],
      steps: ["Bước 1: Chuẩn bị nguyên liệu", "Bước 2: Chế biến", "Bước 3: Phục vụ"],
    });
    info(`${meal.emoji} ${meal.name}`, `Bữa ${time.toLowerCase()} ${day} — nhấn để xem chi tiết công thức`);
  };

  const totalMeals = Object.values(mealPlan).reduce((sum, day) =>
    sum + Object.values(day).filter(Boolean).length, 0
  );
  const totalSlots = weekDays.length * mealTimes.length;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-dark)] mb-2">
            Kế hoạch bữa ăn
          </h1>
          <p className="text-[var(--text-muted)]">
            Lên thực đơn cho cả tuần — {totalMeals}/{totalSlots} bữa đã lên kế hoạch 🗓️
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            variant="outline"
            className="border-[var(--purple-deep)] text-[var(--purple-deep)] hover:bg-[var(--purple-deep)] hover:text-white rounded-[var(--radius-btn)] font-semibold transition-smooth"
            onClick={() => setShowGenerate(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Tạo tự động
          </Button>
          <Button 
            className="bg-gradient-purple text-white font-semibold shadow-[var(--shadow-btn)] hover-lift rounded-[var(--radius-btn)] px-6 py-6"
            onClick={() => {
              setAddingTo(null);
              setShowAddMeal(true);
            }}
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Thêm bữa ăn
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] overflow-hidden">
        <CardHeader className="bg-gradient-purple text-white py-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <CalendarIcon className="w-5 h-5" />
            Tuần này (14/04 - 20/04/2026)
            <Badge className="ml-auto bg-white/20 text-white border-none">{totalMeals}/{totalSlots} bữa</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="p-4 text-left font-semibold text-[var(--text-muted)] w-20 text-sm">Buổi</th>
                  {weekDays.map((day) => (
                    <th key={day} className="p-3 text-center font-bold text-[var(--text-dark)] min-w-[130px] text-sm">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mealTimes.map((time) => (
                  <tr key={time} className="border-b border-[var(--border-light)] last:border-none">
                    <td className="p-4 font-semibold text-[var(--text-muted)] text-sm">{time}</td>
                    {weekDays.map((day) => {
                      const meal = mealPlan[day][time];
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {meal ? (
                            <div 
                              className="bg-[var(--card-bg)] p-3 rounded-[var(--radius-sm)] border-2 border-[var(--border-purple)] hover:border-[var(--gold)] hover:shadow-md transition-smooth cursor-pointer group relative"
                              onClick={() => handleClickMeal(meal, day, time)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{meal.emoji}</span>
                                <span className="text-sm font-semibold text-[var(--text-dark)] truncate">{meal.name}</span>
                              </div>
                              <button
                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveMeal(day, time, meal.name);
                                }}
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              className="w-full p-3 rounded-[var(--radius-sm)] border-2 border-dashed border-[var(--border-purple)] hover:border-[var(--purple-deep)] hover:bg-[var(--card-bg)] transition-smooth text-[var(--text-muted)] hover:text-[var(--purple-deep)] group"
                              onClick={() => handleAddSuggestedDish(day, time)}
                            >
                              <Plus className="w-4 h-4 mx-auto group-hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Suggested Dishes */}
        <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-[var(--text-dark)] flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[var(--food-orange)]" />
                Gợi ý món ăn
              </CardTitle>
              <Badge className="bg-[var(--gold-light)]/50 text-[var(--gold)] border-none font-semibold">AI</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestedDishes.map((dish, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[var(--card-bg)] hover:bg-white hover:shadow-md rounded-[var(--radius-sm)] transition-smooth group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dish.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-dark)]">{dish.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{dish.time} • {dish.difficulty}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-gold text-white rounded-[var(--radius-sm)] hover-lift font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setAddingTo(null);
                    setShowAddMeal(true);
                    success("💡 Đã chọn món!", `"${dish.name}" sẵn sàng để thêm vào kế hoạch.`);
                  }}
                >
                  Thêm
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Needed Ingredients */}
        <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-[var(--text-dark)] flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[var(--gold)]" />
                Nguyên liệu cần mua
              </CardTitle>
              <Badge className="bg-[var(--danger-light)] text-[var(--danger)] border-none font-semibold">
                {ingredients.filter(i => !i.checked).length} thiếu
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {ingredients.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 p-3 rounded-[var(--radius-sm)] transition-smooth cursor-pointer group ${item.checked ? 'bg-[var(--success-light)]/30 opacity-70' : 'bg-[var(--card-bg)] hover:bg-white hover:shadow-md'}`}
                onClick={() => toggleIngredient(i)}
              >
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${item.checked ? 'bg-[var(--success)] border-[var(--success)]' : 'border-[var(--border-purple)] group-hover:border-[var(--gold)]'}`}>
                  {item.checked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`flex-1 text-sm font-medium ${item.checked ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-dark)]'}`}>
                  {item.name}
                </span>
                {!item.checked && (
                  <button 
                    className="text-xs text-[var(--gold)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToShoppingList(item.name);
                    }}
                  >
                    + Mua
                  </button>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full rounded-[var(--radius-sm)] border-dashed border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white font-semibold transition-smooth"
              onClick={() => {
                const unchecked = ingredients.filter(i => !i.checked);
                if (unchecked.length > 0) {
                  success("🛒 Đã thêm tất cả vào danh sách!", `${unchecked.length} nguyên liệu đã được thêm vào danh sách mua sắm.`);
                } else {
                  info("✅ Đã đủ nguyên liệu!", "Tất cả nguyên liệu đã có sẵn trong kho.");
                }
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Thêm tất cả vào danh sách mua
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddMealPlanModal
        isOpen={showAddMeal}
        onClose={() => { setShowAddMeal(false); setAddingTo(null); }}
        onSubmit={handleAddMeal}
      />

      <GenerateMealPlanModal
        isOpen={showGenerate}
        onClose={() => setShowGenerate(false)}
        onGenerate={handleGenerate}
      />

      {viewingMeal && (
        <ViewRecipeModal
          isOpen={!!viewingMeal}
          onClose={() => setViewingMeal(null)}
          recipe={viewingMeal}
        />
      )}
    </div>
  );
}