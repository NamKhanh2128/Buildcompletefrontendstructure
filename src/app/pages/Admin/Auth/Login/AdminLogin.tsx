import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Shield } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7B5EA7] via-[#6A4C9C] to-[#593D85] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Admin Panel</h1>
          <p className="text-white/80">Đăng nhập để quản lý hệ thống</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-white">Email</Label>
              <Input id="admin-email" type="email" placeholder="admin@example.com" className="h-12 rounded-xl bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-white">Mật khẩu</Label>
              <Input id="admin-password" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50" />
            </div>

            <Link to="/admin/dashboard">
              <Button className="w-full h-12 bg-white text-[#6A4C9C] hover:bg-gray-100 rounded-xl text-base font-semibold">
                Đăng nhập
              </Button>
            </Link>
          </form>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          <Link to="/" className="hover:text-white underline">Quay lại trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
