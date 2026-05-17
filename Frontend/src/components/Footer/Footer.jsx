import React from 'react';
import { MessageCircle, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-green-500/20">
            <style>{`
                .social-icon { transition: all 0.3s ease; }
                .social-icon:hover { transform: translateY(-3px) scale(1.1); }
            `}</style>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
                
                {/* Main Content */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                    
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">🌾 𝘒𝘳𝘪𝘴𝘩𝘪 𝘚𝘵𝘰𝘳𝘦</h3>
                        <p className="text-gray-400 text-sm">Quality seeds for better harvest</p>
                    </div>

                    {/* Links */}
                    <div className="flex justify-center gap-6">
                        <a href="/" className="text-gray-400 hover:text-green-400 text-sm transition">Home</a>
                        <a href="/about" className="text-gray-400 hover:text-green-400 text-sm transition">About</a>
                        <a href="/contact" className="text-gray-400 hover:text-green-400 text-sm transition">Contact</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center sm:justify-end gap-3">
                        <a
                            href="https://wa.me/9589259036"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                        >
                            <MessageCircle size={18} />
                        </a>
                        <a
                            href="mailto:suneelpatel409@gmail.com"
                            className="social-icon bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                        >
                            <Mail size={18} />
                        </a>
                        <a href="#" className="social-icon bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="social-icon bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition">
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-700 mb-6" />

                {/* Copyright */}
                <p className="text-center text-gray-400 text-sm">
                    © {currentYear} <span className="text-green-400 font-semibold">𝘒𝘳𝘪𝘴𝘩𝘪 𝘚𝘵𝘰𝘳𝘦</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}