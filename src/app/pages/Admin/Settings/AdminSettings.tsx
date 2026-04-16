import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Cài đặt hệ thống</h1>
        <p className="text-gray-400 mt-1">Cấu hình và tùy chỉnh hệ thống</p>
      </div>
      <Card className="border-white/10 bg-[#1E293B] shadow-lg rounded-2xl">
        <CardHeader><CardTitle className="text-white">Cấu hình chung</CardTitle></CardHeader>
        <CardContent><p className="text-gray-400">Các cài đặt hệ thống...</p></CardContent>
      </Card>
    </div>
  );
}
