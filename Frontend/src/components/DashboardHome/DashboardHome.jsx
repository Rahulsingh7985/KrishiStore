import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Phone, Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { key: "seed", label: "बीज" },
  { key: "pesticide", label: "कीटनाशक" },
  { key: "herbicide", label: "खरपतवार" },
  { key: "fertilizer", label: "खाद" },
  { key: "equipment", label: "उपकरण" },
];

export default function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("seed");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/posts`);
      setPosts(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 py-6 sm:py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-green-900">
          हमारे उत्पाद
        </h1>

        {/* Category Tabs - Horizontal Scroll on Mobile */}
        <div className="mb-8 sm:mb-10">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide sm:justify-center sm:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-6 py-2 rounded-full border-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.key
                    ? "bg-green-600 text-white border-green-600 shadow-lg scale-105"
                    : "bg-white text-gray-700 border-green-300 hover:border-green-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">कोई उत्पाद उपलब्ध नहीं</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all p-3 sm:p-5 flex flex-col"
              >
                {/* Product Image */}
                <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 h-28 sm:h-40 flex items-center justify-center overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {/* Quantity */}
                {post.quantity && (
                  <p className="text-xs text-gray-500 mb-1">
                    {post.quantity}
                  </p>
                )}

                {/* Price */}
                {post.price > 0 && (
                  <p className="text-sm sm:text-lg font-bold text-green-700 mb-3 sm:mb-4">
                    ₹{post.price}
                  </p>
                )}

                {/* View Product Button */}
                <Link
                  to={`/viewproduct/${post._id}`}
                  className="mt-auto px-4 py-2 bg-[#8B3E1F] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#733218] flex items-center justify-center gap-2 transition active:scale-95 w-full"
                >
                  <Eye size={16} />
                  <span>देखें</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}