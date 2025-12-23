import React from 'react'
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t-2 border-gray-200">
            <div className="mx-auto w-full max-w-screen-xl px-4 py-8">
                
                <hr className="mb-6 border-gray-200" />

                {/* Footer Content */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    
                    {/* Copyright */}
                    <span className="text-sm text-gray-600 text-center md:text-left">
                        © 2025
                        <a href="#" className="text-green-600 hover:text-green-700 font-semibold ml-1">
                            Anjali Beej Bhandar
                        </a>
                        . All Rights Reserved.
                    </span>

                    {/* Social Media Icons */}
                    <div className="flex justify-center gap-4">
                        

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/9589259036"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-300 transform hover:scale-110 shadow-md"
                            title="Message us on WhatsApp"
                        >
                            <MessageCircle size={20} />
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:suneelpatel409@gmail.com"
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition duration-300 transform hover:scale-110 shadow-md"
                            title="Email us"
                        >
                            <Mail size={20} />
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
}