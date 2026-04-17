import { TrendingUp, DollarSign, TrendingDown, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'T1', expense: 4200, waste: 350 },
  { month: 'T2', expense: 3800, waste: 280 },
  { month: 'T3', expense: 4500, waste: 320 },
  { month: 'T4', expense: 4850, waste: 285 },
];

const categoryData = [
  { name: 'Rau củ', value: 35, color: '#22C55E' },
  { name: 'Thịt cá', value: 30, color: '#EF4444' },
  { name: 'Trái cây', value: 20, color: '#F97316' },
  { name: 'Khác', value: 15, color: '#3B82F6' },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>Báo cáo chi tiêu</h1>
        <p className="text-gray-600 mt-1">Phân tích chi tiêu và tối ưu ngân sách gia đình</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-sm opacity-90">Tổng chi tháng này</span>
            </div>
            <p className="text-3xl font-bold">4,850,000₫</p>
            <Badge className="mt-2 bg-white/20 text-white">+12.5% so tháng trước</Badge>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <span className="text-sm opacity-90">Lãng phí tháng này</span>
            </div>
            <p className="text-3xl font-bold">285,000₫</p>
            <Badge className="mt-2 bg-white/20 text-white">-8.2% so tháng trước</Badge>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-sm opacity-90">Tiết kiệm được</span>
            </div>
            <p className="text-3xl font-bold">1,250,000₫</p>
            <Badge className="mt-2 bg-white/20 text-white">+18.3% so tháng trước</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Chi tiêu theo tháng</CardTitle>
            <CardDescription>So sánh chi tiêu và lãng phí (nghìn đồng)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="expense" stroke="#22C55E" strokeWidth={2} />
                <Line type="monotone" dataKey="waste" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Phân bổ chi tiêu</CardTitle>
            <CardDescription>Chi tiêu theo danh mục (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {categoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
