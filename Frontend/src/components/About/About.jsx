import React from "react";
import { MapPin, User, Code, Github, Linkedin, Leaf, ShoppingCart, Target, Award } from "lucide-react";

const About = () => {
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        .slide-up { animation: slideInUp 0.6s ease-out; }
        .scale-in { animation: scaleIn 0.6s ease-out; }
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-4 slide-up">
             About Anjali Beej Bhandar 
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto slide-up">
            Providing trusted agricultural seeds and farming solutions for farmers
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap slide-up">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
              <span className="text-green-400 font-semibold">🌾 10+ Years Experience</span>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
              <span className="text-green-400 font-semibold">✓ 100% Authentic Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image */}
          <div className="fade-in">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <img
                src="https://res.cloudinary.com/decqt0izm/image/upload/v1766120122/bj0pinonuybkjuawbwpu.jpg"
                alt="Anjali Beej Bhandar Shop"
                className="relative rounded-2xl shadow-2xl w-full h-80 sm:h-96 object-cover hover-lift"
              />
            </div>
          </div>

          {/* Content */}
          <div className="slide-up space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Leaf className="text-green-400" size={32} />
                About Our Shop
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Anjali Beej Bhandar is a trusted agricultural store providing high-quality seeds, fertilizers, pesticides, and farming solutions. Our mission is to support farmers with genuine products at affordable prices and help them achieve better crop yields.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <Target className="text-green-400 mb-2" size={24} />
                <h3 className="text-white font-semibold text-sm sm:text-base">100% Authentic</h3>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <Award className="text-green-400 mb-2" size={24} />
                <h3 className="text-white font-semibold text-sm sm:text-base">Best Quality</h3>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex gap-3">
                <MapPin className="text-green-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-green-400 font-semibold mb-1">Our Location</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Isanagar, Village: Katare Ka Purpa, Dist: Chhatarpur, Madhya Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Meet the Owner
          </h2>

          <div className="max-w-3xl mx-auto fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/30 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-6 sm:p-10">
                
                {/* Image */}
                <div className="sm:col-span-2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                    <img
                      src="https://res.cloudinary.com/decqt0izm/image/upload/v1766130405/aif6p54qc7kotdhodosz.png"
                      alt="Shop Owner"
                      className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-3xl object-cover hover-lift"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="sm:col-span-3 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 mb-2">
                      <User className="text-green-400" size={28} />
                      Suneel Patel
                    </h3>
                    <p className="text-green-400 text-sm sm:text-base font-semibold">Founder & Owner</p>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    With over 20 years of experience in agriculture, Suneel Patel founded Anjali Beej Bhandar with a mission to provide farmers with the finest quality seeds, fertilizers, and farming solutions. He is deeply committed to helping farmers achieve better crop yields and sustainable farming practices.
                  </p>

                  <div className="flex gap-3 pt-4">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2 text-xs sm:text-sm">
                      <span className="text-green-400 font-semibold">📞9589259036</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Website Developer
          </h2>

          <div className="max-w-3xl mx-auto scale-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500/30 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-6 sm:p-10">
                
                {/* Icon/Avatar */}
                <div className="sm:col-span-2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center hover-lift">
                      <Code className="text-white" size={80} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="sm:col-span-3 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 mb-2">
                      <Code className="text-blue-400" size={28} />
                      Rahul Singh Patel
                    </h3>
                    <p className="text-blue-400 text-sm sm:text-base font-semibold">MERN Stack Developer</p>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    A passionate MERN Stack developer who designed and developed this modern, user-friendly website using React, Tailwind CSS, Node.js, and MongoDB. Committed to delivering high-quality web solutions that enhance user experience and drive business growth.
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4 pt-4 flex-wrap">
                    <a
                      href="https://github.com/your-github-username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base font-medium"
                    >
                      <Github size={18} />
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/your-linkedin-username/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base font-medium"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🌾", label: "Years of Experience", value: "10+" },
              { icon: "👨‍🌾", label: "Happy Farmers", value: "2000+" },
              { icon: "📦", label: "Product Categories", value: "50+" },
              { icon: "🚚", label: "Fast Delivery", value: "24 hrs" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center hover-lift"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-gray-300 text-sm sm:text-base mb-2">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Get Started Today
            </h3>
            <p className="text-lg text-green-100">
              Join us and take your farming to the next level
            </p>
            <div className="flex justify-center gap-4 pt-4 flex-wrap">
              <a
                href="/"
                className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition duration-300"
              >
                Browse Products
              </a>
              <a
                href="https://wa.me/9589259036"
                target="_blank"
                rel="noreferrer"
                className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-lg transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;