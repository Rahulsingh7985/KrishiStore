import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AIAgent.css";

const AIAgent = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          setProblem((prev) => prev + (prev ? " " : "") + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        showNotification("⚠️ कोई आवाज नहीं सुनी गई। कृपया फिर से कोशिश करें।");
      } else if (event.error === "network") {
        showNotification("🌐 नेटवर्क त्रुटि। अपना इंटरनेट कनेक्शन जांचें।");
      } else if (event.error === "not-allowed") {
        showNotification("🔒 माइक्रोफोन की अनुमति देनी होगी।");
      } else {
        showNotification(`⚠️ त्रुटि: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      showNotification("आपके ब्राउज़र में वॉइस सपोर्ट नहीं है");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setProblem("");
      recognitionRef.current.start();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!problem.trim()) {
      setError("कृपया अपनी समस्या का विवरण दें");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${API_BASE_URL}/api/v2/posts/ai-suggest`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "सुझाव प्राप्त करने में विफल");
      }

      setSuggestion(data.data);
      showNotification("✅ सुझाव सफलतापूर्वक प्राप्त हुआ!");
      setProblem("");
    } catch (err) {
      setError(err.message || "कुछ गलत हुआ");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setSuggestion(null);
    setProblem("");
    setError("");
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleViewProduct = (productId) => {
    navigate(`/viewproduct/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <style>{`
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse-btn { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); } 50% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); } }
        @keyframes wave { 0%, 100% { height: 10px; } 50% { height: 25px; } }
        .notify { animation: slideInDown 0.4s ease-out; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); }
        .btn-scale { transition: all 0.2s ease; }
        .btn-scale:active { transform: scale(0.95); }
        @media (hover: hover) {
          .btn-scale:hover { transform: scale(1.05); }
        }
        .voice-btn.listening { animation: pulse-btn 1s infinite; }
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
            🤖 AI कृषि सहायक
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition btn-scale flex items-center gap-2 text-sm sm:text-base border border-green-500/20"
          >
            ← वापस
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section - Form */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 p-4 sm:p-6 space-y-4 sm:space-y-6 sticky top-24">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  🌾 अपनी समस्या बताएं
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  अपनी कृषि समस्या का विवरण दें या माइक्रोफोन का उपयोग करें
                </p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="problem" className="text-white font-semibold text-sm">
                      समस्या का विवरण
                    </label>
                    {voiceSupported && (
                      <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold transition btn-scale ${
                          isListening
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        }`}
                      >
                        {isListening ? "🎤 सुन रहे हैं..." : "🎤 बोलें"}
                      </button>
                    )}
                  </div>

                  <textarea
                    id="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="जैसे: 'मेरी गेहूँ की फसल पीली पड़ गई है और पत्तियाँ गिर रही हैं'"
                    disabled={loading}
                    className="w-full min-h-[120px] sm:min-h-[140px] px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-700/50 border border-green-500/30 rounded-lg sm:rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition text-sm sm:text-base resize-none"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{problem.length}/500</span>
                    {problem && (
                      <button
                        type="button"
                        onClick={() => setProblem("")}
                        className="text-xs text-gray-400 hover:text-red-400 transition"
                      >
                        साफ करें ✕
                      </button>
                    )}
                  </div>
                </div>

                {isListening && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-orange-400 text-xs sm:text-sm">
                    <div className="flex gap-2 items-center mb-2">
                      <span className="text-lg">🎤</span>
                      <span className="font-semibold">सुनाई दे रहा है...</span>
                    </div>
                    <p>अपने माइक्रोफोन में स्पष्ट रूप से बोलें</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs sm:text-sm">
                    ❌ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !problem.trim()}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg sm:rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition btn-scale disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin">⟳</span>
                      सुझाव ढूंढ रहे हैं...
                    </span>
                  ) : (
                    "✨ AI सुझाव पाएं"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Result */}
          <div className="lg:col-span-2">
            {!suggestion && !loading && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 p-6 sm:p-8 text-center py-12 sm:py-16 fade-in">
                <div className="text-4xl sm:text-6xl mb-4">🌾</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                   अपनी कृषि समस्या का विवरण दें और हमारा AI आपको सर्वोत्तम उत्पाद की सिफारिश देगा।
                </p>
                {voiceSupported && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-4">
                    💡 टाइप करने के बजाय 🎤 बोलें बटन का उपयोग करें
                  </p>
                )}
              </div>
            )}

            {loading && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 p-6 sm:p-8 text-center py-12 sm:py-16">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-green-500 border-t-transparent"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-4">
                  सर्वोत्तम उत्पाद खोज रहे हैं...
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  हमारा AI आपकी समस्या का विश्लेषण कर रहा है
                </p>
              </div>
            )}

            {suggestion && (
              <div className="space-y-4 sm:space-y-6 fade-in">
                {/* Product Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 overflow-hidden hover:border-green-500/50 transition hover-lift">
                  {/* Product Image */}
                  

                  {/* Product Details */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        ✅ {suggestion.suggestion}
                      </h3>
                      {suggestion.product?.description && (
                        <p className="text-gray-400 text-sm sm:text-base">
                          {suggestion.product.description}
                        </p>
                      )}
                    </div>

                    {/* Product Meta */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3">
                        <p className="text-gray-400 text-xs">श्रेणी</p>
                        <p className="text-green-400 font-semibold text-sm capitalize">
                          📦 {suggestion.product?.category}
                        </p>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3">
                        <p className="text-gray-400 text-xs">मूल्य</p>
                        <p className="text-green-400 font-bold text-lg sm:text-xl">
                          ₹{suggestion.product?.price?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Generated Info */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">📋 विस्तृत जानकारी</h3>

                  {suggestion.aiInfo?.benefits && (
                    <div className="bg-slate-800/50 rounded-lg border border-green-500/20 p-3 sm:p-4">
                      <h4 className="text-green-400 font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        💪 लाभ
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {suggestion.aiInfo.benefits}
                      </p>
                    </div>
                  )}

                  {suggestion.aiInfo?.usage && (
                    <div className="bg-slate-800/50 rounded-lg border border-green-500/20 p-3 sm:p-4">
                      <h4 className="text-green-400 font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        🔧 कैसे उपयोग करें
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {suggestion.aiInfo.usage}
                      </p>
                    </div>
                  )}

                  {suggestion.aiInfo?.dosage && (
                    <div className="bg-slate-800/50 rounded-lg border border-green-500/20 p-3 sm:p-4">
                      <h4 className="text-green-400 font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        📏 अनुशंसित खुराक
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {suggestion.aiInfo.dosage}
                      </p>
                    </div>
                  )}

                  {suggestion.aiInfo?.reason && (
                    <div className="bg-slate-800/50 rounded-lg border border-green-500/20 p-3 sm:p-4">
                      <h4 className="text-green-400 font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        ✨ यह उत्पाद क्यों?
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {suggestion.aiInfo.reason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={handleNewSearch}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-green-500/30 hover:border-green-500/50 transition btn-scale text-sm sm:text-base"
                  >
                    🔄 नई खोज
                  </button>
                  <button
                    onClick={() => handleViewProduct(suggestion.product?._id)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition btn-scale text-sm sm:text-base"
                  >
                    📖 पूरा उत्पाद देखें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;