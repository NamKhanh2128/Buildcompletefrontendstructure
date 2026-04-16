import { Users, Database, Activity, AlertCircle, TrendingUp, ShoppingBag, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from "../../../components/common/PageHeader";
import { StatCard } from "../../../components/common/StatCard";

const stats = [
  { title: "Tổng người dùng", value: "2,847", change: "+12%", trend: "up", icon: Users, gradient: "from-[var(--purple-deep)] to-[var(--purple-light)]" },
  { title: "Nhóm hoạt động", value: "1,234", change: "+8%", trend: "up", icon: Database, gradient: "from-[var(--success)] to-[#10B981]" },
  { title: "Giao dịch hôm nay", value: "567", change: "+23%", trend: "up", icon: Activity, gradient: "from-[var(--gold)] to-[var(--gold-light)]" },
  { title: "Lỗi hệ thống", value: "3", change: "-50%", trend: "down", icon: AlertCircle, gradient: "from-red-500 to-red-600" },
];

const userData = [
  { month: 'T1', users: 1200, groups: 450 },
  { month: 'T2', users: 1800, groups: 680 },
  { month: 'T3', users: 2100, groups: 890 },
  { month: 'T4', users: 2847, groups: 1234 },
  { month: 'T5', users: 3200, groups: 1450 },
  { month: 'T6', users: 3850, groups: 1680 },
];

const activityData = [
  { name: "Đăng nhập", value: 450, color: "var(--purple-deep)" },
  { name: "Mua sắm", value: 320, color: "var(--gold)" },
  { name: "Công thức", value: 180, color: "var(--success)" },
  { name: "Báo cáo", value: 120, color: "var(--food-orange)" },
];

const recentActivities = [
  { user: "Nguyễn Văn A", action: "Tạo danh sách mua sắm mới", time: "2 phút trước", icon: ShoppingBag, color: "bg-purple-100 text-[var(--purple-deep)]" },
  { user: "Trần Thị B", action: "Đăng ký tài khoản", time: "15 phút trước", icon: Users, color: "bg-green-100 text-green-600" },
  { user: "Lê Văn C", action: "Cập nhật kho thực phẩm", time: "1 giờ trước", icon: Database, color: "bg-blue-100 text-blue-600" },
  { user: "Phạm Thị D", action: "Thêm công thức mới", time: "2 giờ trước", icon: Activity, color: "bg-orange-100 text-orange-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Tổng quan và quản lý hệ thống"
        icon={Shield}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend as "up" | "down"}
            icon={stat.icon}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <Card className="lg:col-span-2 border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-[var(--text-dark)]">Tăng trưởng người dùng</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">6 tháng gần nhất</p>
              </div>
              <Badge className="bg-gradient-purple text-white rounded-full px-4 py-1.5 font-semibold shadow-md">
                <TrendingUp className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
                +35%
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" style={{ fontSize: '12px', fontWeight: 600 }} />
                <YAxis stroke="var(--text-muted)" style={{ fontSize: '12px', fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-card)',
                    fontWeight: 600,
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="var(--purple-deep)" strokeWidth={3} dot={{ fill: "var(--purple-deep)", r: 5 }} name="Người dùng" />
                <Line type="monotone" dataKey="groups" stroke="var(--gold)" strokeWidth={3} dot={{ fill: "var(--gold)", r: 5 }} name="Nhóm" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Distribution */}
        <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-[var(--text-dark)] mb-6">Phân bổ hoạt động</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {activityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-dark)]">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth animate-slide-up bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-[var(--text-dark)]">Hoạt động gần đây</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">Theo dõi hoạt động người dùng</p>
            </div>
            <Badge className="bg-[var(--card-bg)] text-[var(--purple-deep)] rounded-full px-4 py-1.5 font-semibold border border-[var(--border-light)]">
              <Clock className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
              Trực tiếp
            </Badge>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-[var(--radius-sm)] bg-[var(--card-bg)] hover:bg-gray-50 transition-smooth group"
                >
                  <div className={`w-11 h-11 ${activity.color} rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[var(--text-dark)]">{activity.user}</p>
                    <p className="text-sm text-[var(--text-muted)]">{activity.action}</p>
                  </div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activity.time}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}