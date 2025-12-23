import React from "react";
import { MapPin, User, Code, Github, Linkedin } from "lucide-react";


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About Anjali Beej Bhandar
          </h1>
          <p className="mt-4 text-lg text-green-100">
            Trusted agricultural seeds & farming solutions for farmers
          </p>
        </div>
      </section>

      {/* Shop Info Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://res.cloudinary.com/decqt0izm/image/upload/v1766120122/bj0pinonuybkjuawbwpu.jpg"
            alt="Anjali Beej Bhandar Shop"
            className="rounded-2xl shadow-lg w-full h-80 object-cover"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Shop</h2>
            <p className="text-gray-700 leading-relaxed">
              Anjali Beej Bhandar is a trusted agricultural store providing
              high-quality seeds, fertilizers, pesticides, and farming
              solutions. Our mission is to support farmers with genuine
              products at affordable prices.
            </p>

            <div className="flex items-center mt-4 text-gray-600">
              <MapPin className="mr-2 text-green-700" />
              <span>
               Isanagar, Village: katare ka purpa , Dist: Chhatarpur, Madhay pradesh, India 
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Meet the Owner
          </h2>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://res.cloudinary.com/decqt0izm/image/upload/v1766130405/aif6p54qc7kotdhodosz.png"
              alt="Shop Owner"
              className="w-40 h-40 rounded-3xl object-cover border-4 border-gray-500"
            />

            <div>
              <h3 className="text-2xl font-bold flex justify-center items-center gap-2">
                <User className="text-green-700" />
                Suneel Patel
              </h3>
              <p className="text-gray-600 mt-3">
                Founder & Owner of Anjali Beej Bhandar. With years of experience
                in agriculture, the focus is to guide farmers and provide
                reliable products for better crop yield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
     {/* Developer Section */}
<section className="bg-gray-100 py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-semibold mb-10">
      Website Developer
    </h2>

    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold flex justify-center items-center gap-2">
        <Code className="text-green-700" />
        Rahul Singh Patel
      </h3>

      <p className="text-gray-600 mt-4">
        MERN Stack Developer who designed and developed this website using
        React, Tailwind CSS, Node.js, and MongoDB to deliver a modern and
        user-friendly experience.
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <Github />
          <span className="font-medium">GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/your-linkedin-username/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
        >
          <Linkedin />
          <span className="font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default About;
