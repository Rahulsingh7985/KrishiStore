import { useState } from "react";
import axios from "axios";

export default function AdminPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (!image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/posts/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Post created successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("CREATE POST ERROR =>", error);
      alert(error.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6 flex items-center justify-center">
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-container { animation: slideInUp 0.6s ease-out; }
      `}</style>

      <div className="form-container w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl lg:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            🌱 नया उत्पाद जोड़ें
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            अपने कृषि उत्पाद को बाज़ार में जोड़ें
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-7">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              उत्पाद का शीर्षक
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="जैसे: संकर टमाटर के बीज"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-700/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition text-sm sm:text-base"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              विवरण
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="उत्पाद के विवरण, उपयोग, लाभ..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-700/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition resize-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              श्रेणी
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-700/50 border border-green-500/20 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition text-sm sm:text-base cursor-pointer"
              required
            >
              <option value="" disabled className="bg-slate-900 text-gray-300">
                -- श्रेणी चुनें --
              </option>
              <option value="seed" className="bg-slate-900 text-white">🌾 बीज (Seed)</option>
              <option value="pesticide" className="bg-slate-900 text-white">⚡ कीटनाशक (Pesticide)</option>
              <option value="herbicide" className="bg-slate-900 text-white">🍃 खरपतवार (Herbicide)</option>
              <option value="fertilizer" className="bg-slate-900 text-white">🌱 खाद (Fertilizer)</option>
              <option value="equipment" className="bg-slate-900 text-white">🔧 उपकरण (Equipment)</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              कीमत (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="वैकल्पिक"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-700/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition text-sm sm:text-base"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              उत्पाद की छवि
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-400 file:bg-gradient-to-r file:from-green-500 file:to-emerald-500 file:text-white file:font-bold file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer hover:file:from-green-600 hover:file:to-emerald-600 transition"
              required
            />

            {preview && (
              <div className="mt-4 sm:mt-6 rounded-xl overflow-hidden border border-green-500/30 shadow-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !category}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold tracking-wide transition-all text-base sm:text-lg flex items-center justify-center gap-2 ${
              loading || !category
                ? "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50"
            }`}
          >
            {loading ? "⏳ उत्पाद बनाया जा रहा है..." : "✅ उत्पाद बनाएँ"}
          </button>
        </form>
      </div>
    </div>
  );
}