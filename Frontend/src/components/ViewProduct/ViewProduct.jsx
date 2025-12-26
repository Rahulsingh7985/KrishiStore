import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { ArrowLeft, ShoppingCart, Phone, MessageCircle, Edit2, Trash2, X } from "lucide-react";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch Single Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/posts/${id}`);
        const data = await response.json();
        setProduct(data?.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        showNotification("उत्पाद लोड करने में विफल");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  // Open Edit Modal
  const handleEditClick = () => {
    setEditData({
      title: product.title,
      description: product.description,
      price: product.price || "",
      category: product.category || "",
      image: null,
    });
    setImagePreview(product.image);
    setIsEditModalOpen(true);
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Update Product
  const handleUpdate = async () => {
    if (!editData.title || !editData.description) {
      showNotification("शीर्षक और विवरण आवश्यक हैं");
      return;
    }

    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("description", editData.description);
      formData.append("price", editData.price);
      formData.append("category", editData.category);
      if (editData.image) {
        formData.append("image", editData.image);
      }

      const apiUrl = "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v2/posts/update/${id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      setProduct(data.data);
      setIsEditModalOpen(false);
      showNotification("उत्पाद सफलतापूर्वक अपडेट किया गया");
    } catch (error) {
      showNotification("अपडेट विफल रहा");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async () => {
    if (!window.confirm("क्या आप इस उत्पाद को हटाना चाहते हैं?")) return;

    try {
      const apiUrl = "http://localhost:5000";
      await fetch(`${apiUrl}/api/v2/posts/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      showNotification("उत्पाद सफलतापूर्वक हटा दिया गया");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      showNotification("हटाना विफल रहा");
    }
  };

  // Generate WhatsApp Message
  const generateWhatsAppMessage = () => {
    const totalPrice = product.price * quantity;
    const message = `🎉 *नया ऑर्डर - किसान बाज़ार*\n\n━━━━━━━━━━━━━━━━━━━\n*📦 उत्पाद विवरण:*\n━━━━━━━━━━━━━━━━━━━\n\n*${product.title}*\n💰 कीमत: ₹${product.price?.toLocaleString("en-IN")}\n📊 मात्रा: ${quantity}\n🔢 कुल: ₹${totalPrice?.toLocaleString("en-IN")}\n📌 श्रेणी: ${product.category}\n\n━━━━━━━━━━━━━━━━━━━\n📋 ऑर्डर सारांश:\n━━━━━━━━━━━━━━━━━━━\n\nकुल मूल्य: *₹${totalPrice?.toLocaleString("en-IN")}*\n\nकृपया अपना संपूर्ण पता और संपर्क नंबर साझा करें।\nहम जल्द ही आपसे संपर्क करेंगे! 🚚\n\n#किसानबाज़ार #कृषि #ऑनलाइनऑर्डर`;
    return encodeURIComponent(message);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mb-4"></div>
          <p className="text-gray-300 font-medium">उत्पाद विवरण लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-2">उत्पाद नहीं मिला</p>
          <button
            onClick={() => navigate(-1)}
            className="text-green-400 hover:text-green-300 font-medium mt-4"
          >
            ← वापस जाएं
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 py-6 sm:py-10 lg:py-16 px-3 sm:px-4 lg:px-6">
      <style>{`
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .notify { animation: slideInDown 0.4s ease-out; }
        .content-fade { animation: slideInUp 0.5s ease-out; }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: translateY(-2px); }
        .btn-hover:active { transform: scale(0.95); }
      `}</style>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold notify">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold text-sm sm:text-base mb-6 transition duration-200 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          वापस जाएं
        </button>

        {/* Main Container */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl lg:rounded-3xl border border-green-500/20 shadow-2xl overflow-hidden content-fade">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-6 lg:p-10">

            {/* Image Section */}
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 min-h-72 sm:min-h-96 border border-green-500/10">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
              
              {/* Product Info */}
              <div className="space-y-4">
                {/* Category Badge */}
                <div>
                  <span className="inline-block text-xs sm:text-sm font-semibold text-green-400 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full capitalize mb-3">
                    📦 {product.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {product.title}
                </h1>

                {/* Price Section */}
                {product.price && (
                  <div className="pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">कीमत</p>
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                {/* Stock Section */}
                {product.quantity && (
                  <div className="pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">उपलब्ध स्टॉक</p>
                    <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-500/30 px-4 py-3 rounded-lg">
                      <span className="text-2xl font-bold text-blue-400">{product.quantity}</span>
                      <span className="text-sm text-gray-300">यूनिट उपलब्ध</span>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-green-500/20 pt-6"></div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">📝 विवरण</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {product.description || "इस उत्पाद के लिए कोई विवरण उपलब्ध नहीं है।"}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <p className="text-sm text-gray-400 font-semibold">मात्रा चुनें</p>
                <div className="flex items-center gap-4 bg-slate-800/50 border border-green-500/20 rounded-lg p-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-xl text-gray-400 hover:text-green-400 transition btn-hover"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-lg min-w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-xl text-gray-400 hover:text-green-400 transition btn-hover"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                
                {/* Add to Cart Button */}
                <button className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg text-center transition duration-200 btn-hover shadow-lg hover:shadow-green-500/50 text-sm sm:text-base flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  कार्ट में जोड़ें
                </button>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:9936927006"
                    className="px-4 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition duration-200 btn-hover shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    <span className="hidden sm:inline">कॉल</span>
                  </a>

                  <a
                    href={`https://wa.me/9936927006?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-center transition duration-200 btn-hover shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>

                {/* Admin Buttons */}
                {user?.role === "admin" && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleEditClick}
                      className="px-4 py-3 sm:py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition duration-200 btn-hover shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      <span className="hidden sm:inline">संपादित</span>
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-4 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 btn-hover shadow-md text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">हटाएं</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/20 shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-600 to-yellow-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">उत्पाद संपादित करें</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-white hover:bg-yellow-700 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              
              {/* Title Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  उत्पाद का शीर्षक
                </label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="उत्पाद का शीर्षक दर्ज करें"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  विवरण
                </label>
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none"
                  placeholder="उत्पाद का विवरण दर्ज करें"
                  rows="4"
                />
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  मूल्य (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="उत्पाद की कीमत दर्ज करें"
                />
              </div>

              {/* Category Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  श्रेणी: बीज | कीटनाशक | खाद | उपकरण | खरपतवार
                </label>
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="उत्पाद की श्रेणी दर्ज करें"
                />
              </div>

              {/* Image Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  उत्पाद की छवि
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-green-500/30 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />
                {imagePreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 max-w-xs object-contain rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-800/50 px-6 py-4 flex gap-3 justify-end border-t border-green-500/20">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 font-semibold rounded-lg transition"
              >
                रद्द करें
              </button>
              <button
                onClick={handleUpdate}
                disabled={editLoading}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {editLoading ? (
                  <>
                    <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    अपडेट हो रहा है...
                  </>
                ) : (
                  "✓ उत्पाद अपडेट करें"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}