import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Calendar, 
  ChefHat, 
  TrendingUp, 
  Users, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useToastContext } from "../../context/ToastContext";

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Mua sắm', href: '/app/shopping-list', icon: ShoppingCart, badge: 5 },
  { name: 'Kho', href: '/app/inventory', icon: Package },
  { name: 'Bữa ăn', href: '/app/meal-plan', icon: Calendar },
  { name: 'Món ăn', href: '/app/recipes', icon: ChefHat },
  { name: 'Báo cáo', href: '/app/reports', icon: TrendingUp },
  { name: 'Gia đình', href: '/app/family', icon: Users },
  { name: 'Cài đặt', href: '/app/settings', icon: Settings },
];

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, info } = useToastContext();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const isActive = (href: string) => location.pathname === href || (href === '/app/dashboard' && location.pathname === '/app');

  const handleLogout = () => {
    success("Đã đăng xuất", "Hẹn gặp lại bạn!");
    setTimeout(() => navigate("/auth/login"), 800);
  };

  const handleGoToSettings = () => {
    navigate("/app/settings");
  };

  const handleGoToFamily = () => {
    navigate("/app/family");
  };

  const sidebarWidth = sidebarExpanded ? "240px" : "64px";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside 
        className="fixed left-0 top-0 h-screen bg-white border-r border-[var(--border-light)] z-50 shadow-[var(--shadow-sm)] transition-all duration-300 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <div className="flex flex-col h-full py-4 overflow-hidden">
          {/* Logo + Toggle */}
          <div className={`flex items-center mb-6 px-2 ${sidebarExpanded ? 'justify-between' : 'justify-center'}`}>
            <Link 
              to="/app/dashboard" 
              className="flex items-center gap-3 hover-lift-sm flex-shrink-0"
            >
              <div className="w-11 h-11 bg-gradient-purple rounded-[14px] flex items-center justify-center shadow-[var(--shadow-btn)] flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              {sidebarExpanded && (
                <div className="overflow-hidden">
                  <p className="font-black text-[var(--text-dark)] whitespace-nowrap text-base">NATEAT</p>
                  <p className="text-xs text-[var(--text-muted)] whitespace-nowrap">Quản lý gia đình</p>
                </div>
              )}
            </Link>
            {sidebarExpanded && (
              <button
                onClick={() => setSidebarExpanded(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--card-bg)] transition-smooth flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            )}
          </div>

          {/* Collapse toggle when collapsed */}
          {!sidebarExpanded && (
            <button
              onClick={() => setSidebarExpanded(true)}
              className="mx-auto mb-2 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--card-bg)] transition-smooth"
            >
              <Menu className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    relative flex items-center gap-3
                    h-[44px] px-2.5
                    rounded-[var(--radius-sm)] transition-smooth
                    group
                    ${active 
                      ? 'bg-[#F0EEF8]' 
                      : 'hover:bg-[var(--card-bg)]'
                    }
                  `}
                  title={!sidebarExpanded ? item.name : undefined}
                >
                  {/* Active indicator bar */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[var(--gold)] rounded-r-full" />
                  )}
                  
                  <div className="relative flex-shrink-0">
                    <Icon 
                      className={`w-5 h-5 ${active ? 'text-[var(--gold)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-dark)]'} transition-colors`}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--danger)] rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-[9px] font-bold text-white">{item.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Label when expanded */}
                  {sidebarExpanded && (
                    <span className={`text-sm font-semibold whitespace-nowrap transition-colors ${active ? 'text-[var(--purple-deep)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-dark)]'}`}>
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip when collapsed */}
                  {!sidebarExpanded && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[var(--text-dark)] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="px-2 pt-4 border-t border-[var(--border-light)]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`w-full flex items-center gap-3 rounded-[var(--radius-sm)] hover:bg-[var(--card-bg)] transition-smooth group p-1.5 ${sidebarExpanded ? 'justify-start' : 'justify-center'}`}>
                  <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-[var(--gold)] transition-all flex-shrink-0">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-gold text-white font-bold text-sm">
                      NA
                    </AvatarFallback>
                  </Avatar>
                  {sidebarExpanded && (
                    <div className="text-left overflow-hidden">
                      <p className="text-sm font-semibold text-[var(--text-dark)] whitespace-nowrap truncate">Nguyễn Văn A</p>
                      <p className="text-xs text-[var(--text-muted)] whitespace-nowrap truncate">Trưởng nhóm</p>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56 ml-2">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">Nguyễn Văn A</p>
                    <p className="text-xs text-[var(--text-muted)] font-normal">admin@nateat.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGoToFamily}>
                  <Users className="w-4 h-4 mr-2" />
                  Gia đình Nguyễn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleGoToSettings}>
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt tài khoản
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--danger)]" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-[var(--border-light)] shadow-sm">
          <div className="h-full px-6 flex items-center justify-between gap-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--gold)] transition-colors" />
                <input
                  type="search"
                  placeholder="Tìm kiếm thực phẩm, công thức..."
                  className="
                    w-full pl-11 pr-4 py-2.5
                    bg-[var(--card-bg)] 
                    border border-transparent
                    rounded-[var(--radius-sm)]
                    text-sm text-[var(--text-dark)]
                    placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-[var(--gold)]
                    focus:shadow-[var(--shadow-input-focus)]
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center hover:bg-[var(--card-bg)] transition-smooth">
                    <Bell className="w-5 h-5 text-[var(--text-muted)]" />
                    <div className="absolute top-1.5 right-1.5 w-[var(--badge-size)] h-[var(--badge-size)] bg-[var(--danger)] rounded-full border-2 border-white" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Thông báo</span>
                    <span className="text-xs font-normal text-[var(--text-muted)]">3 mới</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    <DropdownMenuItem className="flex-col items-start gap-1 py-3">
                      <p className="text-sm font-medium">🥬 Rau sắp hết hạn</p>
                      <p className="text-xs text-[var(--text-muted)]">Cải xanh sẽ hết hạn trong 2 ngày</p>
                      <span className="text-xs text-[var(--text-muted)]">10 phút trước</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start gap-1 py-3">
                      <p className="text-sm font-medium">🛒 Danh sách mới</p>
                      <p className="text-xs text-[var(--text-muted)]">Mẹ đã thêm 5 món vào danh sách</p>
                      <span className="text-xs text-[var(--text-muted)]">1 giờ trước</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start gap-1 py-3">
                      <p className="text-sm font-medium">📊 Báo cáo tuần</p>
                      <p className="text-xs text-[var(--text-muted)]">Chi tiêu tuần này: 2,350,000đ</p>
                      <span className="text-xs text-[var(--text-muted)]">2 giờ trước</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--card-bg)] transition-smooth group">
                    <Avatar className="w-8 h-8 border-2 border-transparent group-hover:border-[var(--gold)] transition-all">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-gold text-white text-sm font-bold">
                        NA
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden md:block">
                      <p className="text-sm font-semibold text-[var(--text-dark)]">Nguyễn Văn A</p>
                      <p className="text-xs text-[var(--text-muted)]">Gia đình Nguyễn</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-semibold">Nguyễn Văn A</p>
                      <p className="text-xs text-[var(--text-muted)] font-normal">admin@nateat.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleGoToFamily}>
                    <Users className="w-4 h-4 mr-2" />
                    Gia đình Nguyễn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGoToSettings}>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt tài khoản
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-[var(--danger)]" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
