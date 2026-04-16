import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Báo cáo hệ thống</h1>
        <p className="text-gray-400 mt-1">Phân tích và thống kê tổng quan</p>
      </div>
      <Card className="border-white/10 bg-[#1E293B] shadow-lg rounded-2xl">
        <CardHeader><CardTitle className="text-white">Báo cáo tổng quan</CardTitle></CardHeader>
        <CardContent><p className="text-gray-400">Hiển thị báo cáo...</p></CardContent>
      </Card>
    </div>
  );
}
