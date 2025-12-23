import React from "react";

export default function Contact() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-wide">
            Contact Information
          </h1>
          <p className="text-gray-500 mt-3">
            Feel free to reach us using the details below
          </p>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

          {/* Address */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full text-white text-xl">
                📍
              </div>
            </div>
            <h3 className="font-bold text-lg tracking-wide mb-3">
              ADDRESS
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Isanagar <br />
              Village: Katare ka Purpa <br />
              Dist: Chhatarpur <br />
              Madhya Pradesh, India
            </p>
          </div>

          {/* Phone */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full text-white text-xl">
                📞
              </div>
            </div>
            <h3 className="font-bold text-lg tracking-wide mb-3">
              MOBILE NUMBER
            </h3>
            <p className="text-gray-500 text-sm">
              +91 95892 59036
            </p>
          </div>

          {/* Email */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full text-white text-xl">
                ✉️
              </div>
            </div>
            <h3 className="font-bold text-lg tracking-wide mb-3">
              EMAIL ADDRESS
            </h3>
            <p className="text-gray-500 text-sm">
              rahulsingh835789@gmail.com
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
