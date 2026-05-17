import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck, ShieldCheck, Phone, Star, ArrowRight, Leaf, Zap, TrendingUp, Users } from "lucide-react";

export default function HomeBeforeLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .slide-up { animation: slideInUp 0.6s ease-out; }
        .float { animation: float 3s ease-in-out infinite; }
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: scale(1.05); }
        .btn-hover:active { transform: scale(0.95); }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 slide-up">
            <div className="inline-block">
              <span className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                🌾 Welcome to Krishi Store
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                Quality Seeds for a
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Better Harvest
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Krishi Store brings you trusted seeds, fertilizers, and agricultural solutions directly from verified suppliers. Thousands of farmers trust us for quality products and exceptional service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div>
                <p className="text-3xl font-bold text-green-400">5K+</p>
                <p className="text-sm text-gray-400">Happy Farmers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">50+</p>
                <p className="text-sm text-gray-400">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">10+</p>
                <p className="text-sm text-gray-400">Years Trust</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/register"
                className="group px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition duration-300 btn-hover shadow-lg hover:shadow-green-500/50 text-center"
              >
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border-2 border-green-400/50 text-green-400 hover:border-green-400 hover:bg-green-500/10 font-bold rounded-lg transition duration-300 btn-hover text-center"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative fade-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition"></div>
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="Premium Seeds"
              className="relative rounded-3xl shadow-2xl w-full object-cover float hover-lift"
            />
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Krishi Store?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're committed to providing farmers with the best quality products and support
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<ShieldCheck className="text-green-400" size={32} />}
              title="100% Authentic"
              desc="Certified & tested seeds from trusted suppliers"
            />
            <FeatureCard 
              icon={<Truck className="text-blue-400" size={32} />}
              title="Fast Delivery"
              desc="Quick delivery within 24 hours to your farm"
            />
            <FeatureCard 
              icon={<ShoppingBag className="text-purple-400" size={32} />}
              title="Wide Range"
              desc="Seeds, fertilizers, pesticides & equipment"
            />
            <FeatureCard 
              icon={<Phone className="text-yellow-400" size={32} />}
              title="24/7 Support"
              desc="Call & WhatsApp support for all your needs"
            />
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Popular Products
            </h2>
            <p className="text-gray-400 text-lg">
              Browse our most trusted and best-selling agricultural products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🌱", name: "Premium Seeds", },
              { emoji: "🥬", name: "Organic Fertilizer", },
              { emoji: "🔬", name: "Pesticides",},
              { emoji: "🔧", name: "Farm Tools", },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition hover-lift group"
              >
                <div className="text-5xl mb-4">{product.emoji}</div>
                <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold text-xl">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition btn-hover"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Transform Your Harvest?
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Join thousands of successful farmers using Krishi Store. Start your journey to better yields today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-green-600 hover:bg-gray-100 font-bold rounded-lg transition btn-hover"
              >
                Create Free Account
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition btn-hover"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800 transition hover-lift">
      <div className="mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}