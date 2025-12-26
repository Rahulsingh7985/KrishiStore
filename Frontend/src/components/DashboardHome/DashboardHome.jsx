// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Phone, Eye, MessageCircle } from "lucide-react";
// import { Link } from "react-router-dom";

// const CATEGORIES = [
//   { key: "seed", label: "बीज" },
//   { key: "pesticide", label: "कीटनाशक" },
//   { key: "herbicide", label: "खरपतवार" },
//   { key: "fertilizer", label: "खाद" },
//   { key: "equipment", label: "उपकरण" },
// ];

// export default function CategoryPosts() {
//   const [posts, setPosts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("seed");
//   const [loading, setLoading] = useState(false);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/posts`);
//       setPosts(res.data?.data || []);
//     } catch (error) {
//       console.error("Failed to fetch posts", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const filteredPosts = posts.filter((post) => post.category === activeCategory);

//   return (
//     <div className="bg-gradient-to-b from-green-50 to-green-100 py-6 sm:py-10 min-h-screen">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4">
//         {/* Heading */}
//         <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-green-900">
//           हमारे उत्पाद
//         </h1>

//         {/* Category Tabs - Horizontal Scroll on Mobile */}
//         <div className="mb-8 sm:mb-10">
//           <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide sm:justify-center sm:flex-wrap">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat.key}
//                 onClick={() => setActiveCategory(cat.key)}
//                 className={`px-4 sm:px-6 py-2 rounded-full border-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap flex-shrink-0 ${
//                   activeCategory === cat.key
//                     ? "bg-green-600 text-white border-green-600 shadow-lg scale-105"
//                     : "bg-white text-gray-700 border-green-300 hover:border-green-500"
//                 }`}
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && filteredPosts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">कोई उत्पाद उपलब्ध नहीं</p>
//           </div>
//         )}

//         {/* Products Grid */}
//         {!loading && filteredPosts.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
//             {filteredPosts.map((post) => (
//               <motion.div
//                 key={post._id}
//                 whileHover={{ y: -5 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all p-3 sm:p-5 flex flex-col"
//               >
//                 {/* Product Image */}
//                 <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 h-28 sm:h-40 flex items-center justify-center overflow-hidden">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2 mb-2">
//                   {post.title}
//                 </h3>

//                 {/* Quantity */}
//                 {post.quantity && (
//                   <p className="text-xs text-gray-500 mb-1">
//                     {post.quantity}
//                   </p>
//                 )}

//                 {/* Price */}
//                 {post.price > 0 && (
//                   <p className="text-sm sm:text-lg font-bold text-green-700 mb-3 sm:mb-4">
//                     ₹{post.price}
//                   </p>
//                 )}

//                 {/* View Product Button */}
//                 <Link
//                   to={`/viewproduct/${post._id}`}
//                   className="mt-auto px-4 py-2 bg-[#8B3E1F] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#733218] flex items-center justify-center gap-2 transition active:scale-95 w-full"
//                 >
//                   <Eye size={16} />
//                   <span>देखें</span>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { key: "seed", label: "बीज", emoji: "🌱" },
  { key: "pesticide", label: "कीटनाशक", emoji: "⚡" },
  { key: "herbicide", label: "खरपतवार", emoji: "🍃" },
  { key: "fertilizer", label: "खाद", emoji: "🌾" },
  { key: "equipment", label: "उपकरण", emoji: "🔧" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("seed");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(false);

  // Fetch Products from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/posts`);
        const data = await response.json();
        setPosts(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        showNotification("उत्पाद लोड करने में विफल");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = posts.filter(
      (p) =>
        p.category === activeCategory &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [posts, activeCategory, searchTerm, sortBy]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    showNotification(`${product.title} कार्ट में जोड़ा गया!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
    showNotification("कार्ट से हटाया गया");
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === productId ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const handleToggleWishlist = (product) => {
    if (wishlist.find((item) => item._id === product._id)) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
      showNotification("विशलिस्ट से हटाया गया");
    } else {
      setWishlist([...wishlist, product]);
      showNotification("विशलिस्ट में जोड़ा गया! ❤️");
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  // Generate WhatsApp Order Message
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      showNotification("कार्ट खाली है");
      return "";
    }

    let message = "🎉 *नया ऑर्डर - अंजलि बीज भंडार*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━\n";
    message += "*📦 ऑर्डर विवरण:*\n";
    message += "━━━━━━━━━━━━━━━━━━━\n\n";

    // Add each cart item
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `   💰 कीमत: ₹${item.price?.toLocaleString("en-IN") || "N/A"}\n`;
      message += `   📊 मात्रा: ${item.qty}\n`;
      message += `   🔢 कुल: ₹${(item.price * item.qty).toLocaleString("en-IN")}\n`;
      message += `   📌 श्रेणी: ${item.category}\n\n`;
    });

    // Add summary
    message += "━━━━━━━━━━━━━━━━━━━\n";
    message += "*📋 ऑर्डर सारांश:*\n";
    message += "━━━━━━━━━━━━━━━━━━━\n";
    message += `कुल आइटम: ${cartCount}\n`;
    message += `कुल मूल्य: *₹${cartTotal.toLocaleString("en-IN")}*\n\n`;
    message += "कृपया अपना संपूर्ण पता और संपर्क नंबर साझा करें।\n";
    message += "हम जल्द ही आपसे संपर्क करेंगे! 🚚\n\n";
    message += "#किसानबाज़ार #कृषि #ऑनलाइनऑर्डर";

    return encodeURIComponent(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <style>{`
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .notify { animation: slideInDown 0.4s ease-out; }
        .cart-slide { animation: slideInRight 0.4s ease-out; }
        .fade-bg { animation: fadeIn 0.3s ease-out; }
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); }
        .hover-lift:hover img { transform: scale(1.1); }
        .btn-scale { transition: all 0.2s ease; }
        .btn-scale:active { transform: scale(0.9); }
        .img-scale { transition: transform 0.3s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media (hover: hover) {
          .btn-scale:hover { transform: scale(1.1); }
        }
      `}</style>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg font-semibold notify text-sm sm:text-base">
          {notification}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
           अंजलि बीज भंडार
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-3 sm:px-4 py-2 bg-green-600 hover:active:bg-green-700 text-white rounded-lg font-semibold transition btn-scale flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            🛒 <span className="hidden sm:inline">कार्ट</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="🔍 उत्पाद खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-4 bg-slate-800/50 border border-green-500/30 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base"
          />
        </div>

        {/* Categories */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">📂 श्रेणियाँ</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 p-2 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all btn-scale whitespace-nowrap text-xs sm:text-sm ${
                  activeCategory === cat.key
                    ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg scale-100 sm:scale-105"
                    : "bg-slate-800/50 border border-green-500/20 text-gray-200 hover:border-green-500/50"
                }`}
              >
                <div className="text-xl sm:text-3xl mb-0.5 sm:mb-1">{cat.emoji}</div>
                <div className="text-xs sm:text-sm leading-tight">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6 sm:mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 sm:px-4 py-2 bg-slate-800/50 border border-green-500/30 rounded-lg text-white cursor-pointer focus:outline-none focus:border-green-500 text-sm sm:text-base"
          >
            <option value="featured">📌 विशेष</option>
            <option value="price-low">💰 कम कीमत</option>
            <option value="price-high">💎 अधिक कीमत</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-16">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-green-600 border-t-transparent"></div>
          </div>
        )}

        {/* Products Grid - More Mobile Responsive */}
        {!loading && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.find((item) => item._id === product._id);
              return (
                <div
                  key={product._id}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 overflow-hidden hover:border-green-500/50 transition-all hover-lift flex flex-col"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-1.5 sm:p-2 bg-slate-900/80 rounded-full hover:bg-red-500 transition text-base sm:text-xl btn-scale"
                  >
                    {isInWishlist ? "❤️" : "🤍"}
                  </button>

                  {/* Stock Badge */}
                  {product.quantity && parseInt(product.quantity) <= 20 && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-orange-500/80 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                      ⚠️ सीमित
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-32 sm:h-40 lg:h-48 bg-slate-700/50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover img-scale"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                    <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-2">
                      {product.title}
                    </h4>

                    {/* Category */}
                    <div className="text-xs text-gray-400 capitalize bg-slate-700/50 px-2 py-0.5 rounded w-fit">
                      📦 {product.category}
                    </div>

                    {/* Quantity */}
                    {product.quantity && (
                      <p className="text-xs text-gray-400">
                        स्टॉक: {product.quantity}
                      </p>
                    )}

                    {/* Price & Buttons */}
                    <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-green-500/20 mt-auto">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400 truncate">
                        ₹{product.price?.toLocaleString("en-IN") || "N/A"}
                      </span>
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => navigate(`/viewproduct/${product._id}`)}
                          className="p-1.5 sm:p-2 bg-blue-500 hover:active:bg-blue-600 text-white rounded-lg transition text-base sm:text-lg btn-scale"
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition text-base sm:text-lg btn-scale"
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !loading && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-400 text-base sm:text-lg">❌ कोई उत्पाद नहीं मिला</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar - Mobile Optimized */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black/50 z-40 fade-bg"
          />
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900 border-l border-green-500/20 z-50 flex flex-col overflow-y-auto cart-slide">
            <div className="p-4 sm:p-6 border-b border-green-500/20 flex items-center justify-between sticky top-0 bg-slate-900/95 z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCart(false)}
                  className="sm:hidden p-2 hover:bg-slate-800 rounded-lg transition text-lg"
                  title="Back"
                >
                  ←
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-white">🛒 आपकी कार्ट</h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition text-xl btn-scale"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto scrollbar-hide">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">कार्ट खाली है 📭</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-green-500/20"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-green-400 font-bold mt-1 text-sm">
                          ₹{item.price?.toLocaleString("en-IN") || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                          className="px-2 sm:px-3 py-1 bg-slate-700 hover:active:bg-slate-600 text-white rounded transition btn-scale text-sm"
                        >
                          −
                        </button>
                        <span className="text-white font-semibold min-w-6 text-center text-sm">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                          className="px-2 sm:px-3 py-1 bg-slate-700 hover:active:bg-slate-600 text-white rounded transition btn-scale text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="px-2 sm:px-3 py-1 bg-red-500/20 hover:active:bg-red-500 text-red-400 hover:text-white rounded transition btn-scale text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-green-500/20 space-y-3 sm:space-y-4 bg-slate-800/50 sticky bottom-0">
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold text-sm sm:text-base">कुल:</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-400">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <a
                  href={`https://wa.me/9936927006?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowCart(false)}
                  className="block w-full py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition btn-scale text-center text-sm sm:text-base"
                >
                  💬 WhatsApp पर ऑर्डर करें
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}