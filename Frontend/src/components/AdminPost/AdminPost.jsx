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

      // 🔐 Get JWT token
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

      // Reset form
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
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-green-700">
            🌱 Add New Product
          </h2>
          <p className="text-sm text-gray-500">
            Admin panel – BeejBhandar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Eg. Hybrid Tomato Seeds"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product details, usage, benefits..."
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:outline-none ${
                category
                  ? "focus:ring-green-500"
                  : "border-red-300 focus:ring-red-400"
              }`}
              required
            >
              <option value="" disabled>
                -- Choose Category --
              </option>
              <option value="seed">🌾 बीज (Seed)</option>
              <option value="pesticide">🧪 कीटनाशक (Pesticide)</option>
              <option value="herbicide">🧪 खरपतवार  (herbicide)</option>
              <option value="fertilizer">🌱 उर्वरक (Fertilizer)</option>
              <option value="equipment">🔧 उपकरण (Equipment)</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Optional"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />

            {preview && (
              <div className="mt-4 rounded-xl overflow-hidden border shadow-sm">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !category}
            className={`w-full py-3 rounded-xl text-white font-bold tracking-wide transition-all ${
              loading || !category
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
            }`}
          >
            {loading ? "⏳ Creating Product..." : "✅ Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
