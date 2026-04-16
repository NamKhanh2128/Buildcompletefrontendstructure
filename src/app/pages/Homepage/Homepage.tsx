import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { 
  ShoppingCart, 
  Calendar, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Search,
  BarChart3,
  Sparkles,
  Package,
  ChefHat,
  Shield,
  Zap,
  Heart
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

const features = [
  {
    icon: Calendar,
    title: "Kế hoạch bữa ăn",
    description: "Lên thực đơn tuần, tự động tạo danh sách mua sắm thông minh",
    gradient: "from-[var(--gold)] to-[var(--gold-light)]",
  },
  {
    icon: ShoppingCart,
    title: "Danh sách mua sắm",
    description: "Phân công nhiệm vụ, theo dõi tiến độ cho cả gia đình",
    gradient: "from-[var(--purple-deep)] to-[var(--purple-light)]",
  },
  {
    icon: Package,
    title: "Quản lý kho",
    description: "Theo dõi hạn sử dụng, cảnh báo sắp hết, giảm lãng phí",
    gradient: "from-[var(--success)] to-[#10B981]",
  },
  {
    icon: TrendingUp,
    title: "Báo cáo chi tiêu",
    description: "Phân tích chi tiêu, tối ưu ngân sách gia đình hiệu quả",
    gradient: "from-[var(--food-orange)] to-[#FB923C]",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Tiết kiệm thời gian",
    description: "Giảm 70% thời gian lập kế hoạch mua sắm",
  },
  {
    icon: TrendingUp,
    title: "Giảm chi phí",
    description: "Tiết kiệm tối đa 30% chi phí thực phẩm hàng tháng",
  },
  {
    icon: Heart,
    title: "Giảm lãng phí",
    description: "Giảm 80% lượng thực phẩm bị hỏng và lãng phí",
  },
  {
    icon: Shield,
    title: "An toàn tuyệt đối",
    description: "Dữ liệu được mã hóa và bảo mật an toàn",
  },
];

const testimonials = [
  {
    name: "Chị Nguyễn Mai",
    role: "Mẹ của 2 con",
    content: "Ứng dụng giúp tôi tiết kiệm được 30% chi phí mua sắm hàng tháng. Không còn mua thừa thực phẩm nữa!",
    rating: 5,
    avatar: "NM",
  },
  {
    name: "Anh Trần Minh",
    role: "Trưởng nhóm gia đình",
    content: "Rất tiện lợi khi cả gia đình cùng quản lý danh sách mua sắm. Không còn quên mua gì nữa.",
    rating: 5,
    avatar: "TM",
  },
  {
    name: "Chị Lê Hương",
    role: "Người nội trợ",
    content: "Chức năng lên kế hoạch bữa ăn và theo dõi hạn sử dụng thực phẩm rất hữu ích!",
    rating: 5,
    avatar: "LH",
  },
];

const stats = [
  { value: "10K+", label: "Gia đình" },
  { value: "50K+", label: "Công thức" },
  { value: "1M+", label: "Danh sách" },
  { value: "30%", label: "Tiết kiệm" },
];

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[var(--border-light)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 hover-lift-sm transition-smooth">
              <div className="w-11 h-11 bg-gradient-purple rounded-[14px] flex items-center justify-center shadow-[var(--shadow-btn)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-xl text-[var(--text-dark)]">
                Đi Chợ Tiện Lợi
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button 
                  variant="ghost" 
                  className="font-semibold text-[var(--text-dark)] hover:text-[var(--gold)] hover:bg-[var(--card-bg)] rounded-[var(--radius-sm)] transition-smooth"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-gradient-gold text-white font-semibold px-6 rounded-[var(--radius-btn)] shadow-[var(--shadow-btn)] hover-lift transition-smooth">
                  Đăng ký miễn phí
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-purple text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--gold)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20 glass hover-lift-sm transition-smooth">
                <Star className="w-4 h-4 text-[var(--gold)]" fill="currentColor" />
                <span className="text-sm font-medium">Được hơn 10,000 gia đình tin dùng</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Đi chợ thông minh cho cả gia đình 🛒
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Quản lý mua sắm, kế hoạch bữa ăn, và kho thực phẩm trong một ứng dụng. 
                Tiết kiệm thời gian, tiền bạc và giảm lãng phí thực phẩm.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <Input 
                    placeholder="Hôm nay ăn gì?" 
                    className="pl-12 h-14 text-base bg-white border-white text-[var(--text-dark)] placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--gold)] rounded-[var(--radius-btn)]"
                  />
                </div>
                <Link to="/auth/register">
                  <Button 
                    size="lg"
                    className="h-14 px-8 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white rounded-[var(--radius-btn)] shadow-[var(--shadow-btn)] font-bold text-base hover-lift transition-smooth"
                  >
                    Bắt đầu ngay
                    <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" strokeWidth={2.5} />
                  <span>Miễn phí mãi mãi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" strokeWidth={2.5} />
                  <span>Không cần thẻ</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1753354868431-a5317771a3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzaG9wcGluZyUyMGdyb2NlcmllcyUyMGhhcHB5fGVufDF8fHx8MTc3NjMzMDQ1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Family Shopping"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] hover-lift transition-smooth animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--success)] to-[#10B981] rounded-[14px] flex items-center justify-center shadow-md">
                    <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[var(--text-dark)]">30%</p>
                    <p className="text-sm text-[var(--text-muted)] font-medium">Tiết kiệm</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] hover-lift transition-smooth animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-gold rounded-[14px] flex items-center justify-center shadow-md">
                    <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[var(--text-dark)]">10K+</p>
                    <p className="text-sm text-[var(--text-muted)] font-medium">Gia đình</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="text-4xl lg:text-5xl font-black text-gradient-purple mb-2">
                  {stat.value}
                </p>
                <p className="text-[var(--text-muted)] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[var(--text-dark)] mb-4">
              Tính năng nổi bật ✨
            </h2>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              Mọi thứ bạn cần để quản lý mua sắm và bữa ăn gia đình thông minh
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth bg-white animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-[16px] flex items-center justify-center mb-4 shadow-md`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-[var(--text-dark)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-[var(--text-dark)] mb-6">
                Lợi ích vượt trội 🚀
              </h2>
              <p className="text-xl text-[var(--text-muted)] mb-8">
                Thiết kế hiện đại, trực quan giúp cả gia đình dễ dàng sử dụng. 
                Từ người cao tuổi đến trẻ em đều tham gia được.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-[var(--radius-sm)] hover:bg-[var(--card-bg)] transition-smooth group">
                      <div className="w-12 h-12 bg-gradient-gold rounded-[12px] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--text-dark)] mb-1">{benefit.title}</h4>
                        <p className="text-[var(--text-muted)]">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1552825896-8059df63a1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzYyOTg5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Dashboard Preview"
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[var(--text-dark)] mb-4">
              Người dùng nói gì 💬
            </h2>
            <p className="text-xl text-[var(--text-muted)]">
              Hàng ngàn gia đình đã tin dùng và yêu thích
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-none shadow-[var(--shadow-card)] rounded-[var(--radius)] hover-lift transition-smooth bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--gold)]" fill="var(--gold)" />
                    ))}
                  </div>
                  <p className="text-[var(--text-dark)] mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-dark)]">{testimonial.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-gold text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Sẵn sàng bắt đầu quản lý thông minh? 🎉
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Tham gia cùng hàng ngàn gia đình đang sử dụng Đi Chợ Tiện Lợi
          </p>
          <Link to="/auth/register">
            <Button 
              size="lg"
              className="h-14 px-8 bg-white text-[var(--gold)] hover:bg-white/90 rounded-[var(--radius-btn)] text-lg font-black shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover-lift transition-smooth"
            >
              Đăng ký miễn phí ngay
              <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--dark-sidebar)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-gold rounded-[14px] flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-lg">Đi Chợ Tiện Lợi</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Quản lý mua sắm thông minh cho gia đình Việt
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Tính năng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bảng giá</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Công ty</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Pháp lý</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bảo mật</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
            <p>© 2026 Đi Chợ Tiện Lợi. Made with ❤️ in Vietnam</p>
          </div>
        </div>
      </footer>
    </div>
  );
}