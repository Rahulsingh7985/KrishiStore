
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck, ShieldCheck, Phone } from "lucide-react";

export default function HomeBeforeLogin() {
  return (
    <div className="bg-green-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
            Quality Seeds for a <span className="text-orange-600">Better Harvest</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            ANJALI BEEJBHANDAR brings you trusted seeds, fertilizers and agri solutions
            directly from verified suppliers.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="px-8 py-3 rounded-xl bg-orange-700 text-white font-semibold hover:bg-orange-800 transition"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-xl border border-green-700 text-green-700 font-semibold hover:bg-green-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Farming"
            className="rounded-3xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Why Choose BeejBhandar?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Feature icon={<ShieldCheck />} title="Trusted Quality" desc="Certified & tested seeds" />
            <Feature icon={<Truck />} title="Fast Delivery" desc="Quick delivery to your farm" />
            <Feature icon={<ShoppingBag />} title="Wide Range" desc="Seeds, tools & medicines" />
            <Feature icon={<Phone />} title="Farmer Support" desc="Call & WhatsApp support" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-800 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Start Your Farming Journey Today</h2>
        <p className="mt-4 text-green-100">Join thousands of farmers using BeejBhandar</p>
        <Link
          to="/register"
          className="inline-block mt-8 px-10 py-3 bg-orange-600 rounded-xl font-semibold hover:bg-orange-700 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-green-50 rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
      <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-700 text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-green-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{desc}</p>
    </div>
  );
}
